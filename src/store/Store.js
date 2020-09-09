import { createContext } from "react";
import { observable, action, decorate, runInAction } from "mobx";
import moment from "moment";
import { schedule } from "../data";
import Stream from "./Stream";
import Event from "./Event";
import { debounce } from "lodash";

class Store {
  currentTime = moment.tz("2019-04-30 10:21", "Asia/Tokyo");
  timezone = "Asia/Tokyo";
  eventScroll = 0;
  groupEventsInRow = false;

  streams = [];

  selectedEvent = null;
  selectedEventElement = null;

  clearSelectedEvent = debounce(() => {
    runInAction("clearSelectedEvent", () => {
      this.selectedEvent = null;
      this.selectedEventElement = null;
    });
  }, 400);
  updateSelectedEvent = debounce((event, element) => {
    runInAction("updateSelectedEvent", () => {
      this.selectedEvent = event;
      this.selectedEventElement = element;
    });
  }, 1000);

  setSelectedEvent(event, element) {
    if (event === null) {
      // CLEAR EVENT
      this.updateSelectedEvent.cancel();
      this.clearSelectedEvent();
    } else {
      // SHOW EVENT
      if (this.selectedEvent === event) {
        this.clearSelectedEvent.cancel();
      }
      this.updateSelectedEvent(event, element);
    }
  }

  setCurrentTime(time) {
    this.currentTime = time.clone();
  }

  setTimezone(timezoneName) {
    this.timezone = timezoneName;
  }

  setStreams(streams) {
    this.streams = streams;
  }

  setEventScroll(value) {
    this.eventScroll = value;
  }

  setGroupEventsInRow(value) {
    this.groupEventsInRow = value;
  }
}

decorate(Store, {
  eventScroll: observable,
  currentTime: observable,
  timezone: observable,
  selectedEvent: observable,
  groupEventsInRow: observable,
  selectedEventElement: observable,
  setSelectedEvent: action.bound,
  setCurrentTime: action.bound,
  setTimezone: action.bound,
  setStreams: action.bound,
  setEventScroll: action.bound,
  setGroupEventsInRow: action.bound
});

export const store = new Store();
store.setStreams(
  schedule.map(s => new Stream(s.name, s.events.map(e => new Event(e))))
);

export const StoreContext = createContext(store);
