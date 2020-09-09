import { observable, decorate, action, computed } from "mobx";
import moment from "moment";
import { store } from "./Store";

class Event {
  name = null;
  start = null;
  end = null;

  constructor({ name, start, end, startTime, endTime }) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.started = startTime;
    this.stopped = endTime;
  }

  startEvent() {
    this.started = store.currentTime.clone();
    this.stopped = false;
  }

  stopEvent() {
    this.stopped = store.currentTime.clone();
  }

  get isClean() {
    return !this.started && !this.stopped;
  }

  get isStarted() {
    return this.started && !this.stopped;
  }

  get isCompleted() {
    return this.started && this.stopped;
  }

  reset() {
    this.started = false;
    this.stopped = false;
  }
}

decorate(Event, {
  name: observable,
  start: observable,
  end: observable,
  started: observable,
  stopped: observable,
  startEvent: action.bound,
  stopEvent: action.bound,
  reset: action.bound,
  isClean: computed,
  isStarted: computed,
  isCompleted: computed
});

export default Event;
