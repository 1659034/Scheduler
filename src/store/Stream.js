import { observable, action, decorate } from "mobx";

class Stream {
  name = null;
  events = [];
  isStarted = false;

  constructor(name, events) {
    this.name = name;
    this.events = events;
  }

  setIsStarted(value, event) {
    this.isStarted = value;
    if (!event) {
      event = this.findRelatedEvent();
    }

    if (!event) {
      console.log("[Stream] start/stop cannot find a matching event");
      return;
    }

    if (value) {
      event.startEvent();
    } else {
      event.stopEvent();
    }
  }

  reset() {
    this.isStarted = false;
    this.events.forEach(e => e.reset());
  }

  findRelatedEvent() {}
}

decorate(Stream, {
  name: observable,
  events: observable,
  isStarted: observable,
  setIsStarted: action.bound,
  reset: action.bound
});

export default Stream;
