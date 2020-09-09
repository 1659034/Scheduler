import { colors } from "./colors";

export const isEventActive = (event, currentTime) =>
  event.start.isBefore(currentTime) && event.end.isSameOrAfter(currentTime);

export const getCurrentEvent = (stream, currentTime) =>
  stream.events.find(
    e =>
      e.isStarted ||
      (currentTime.isSameOrAfter(e.start) && currentTime.isBefore(e.end))
  );

export const getNextEvent = (stream, currentTime) =>
  stream.events.find(e => currentTime.isSameOrBefore(e.start));

export const getPastEvent = (stream, currentTime) =>
  stream.events
    .concat()
    .reverse()
    .find(e => currentTime.isSameOrAfter(e.end));

export const getActiveEvent = (stream, currentTime) =>
  getCurrentEvent(stream, currentTime) ||
  getNextEvent(stream, currentTime) ||
  getPastEvent(stream, currentTime);

const getLabel = (time, currentTime, timezone) => {
  if (Math.abs(time.diff(currentTime, "minutes", true)) > 10) {
    return `${time
      .clone()
      .tz(timezone)
      .format("H:mm")}`;
  }
  return `${currentTime.to(time).replace(" minutes", "m")}`;
};

export const getTimeFromEvent = (event, type, currentTime, timezone) => {
  if (!event) {
    return { event, label: "nothing today" };
  } else {
    return { event, label: getLabel(event[type], currentTime, timezone) };
  }
};

export const getSortTimeFromEvent = (event, type, currentTime) => {
  if (!event) return Number.MAX_SAFE_INTEGER;
  const time = event[type];
  return time.diff(currentTime, "seconds", true);
};

export const getStatus = (event, currentTime) => {
  // if (!event) return {};

  const isBeforeEvent = currentTime.isBefore(event.start);
  const isDuringEvent =
    currentTime.isSameOrAfter(event.start) && currentTime.isBefore(event.end);
  const isAfterEvent = currentTime.isSameOrAfter(event.end);

  const result = {
    before: isBeforeEvent,
    during: isDuringEvent,
    after: isAfterEvent
  };

  if (isAfterEvent) {
    result.ended = true;
    result.label = event.isClean
      ? "Missed"
      : event.isStarted
      ? "Overrun"
      : "Recorded";
  }

  if (isBeforeEvent) {
    if (event.start.diff(currentTime, "minutes", true) < 10) {
      result.scheduled = true;
      result.soon = true;
      result.label = event.isClean
        ? "Upcoming"
        : event.isStarted
        ? "LIVE"
        : "Recorded";
    } else {
      result.scheduled = true;
      result.label = event.isClean
        ? "Scheduled"
        : event.isStarted
        ? "LIVE"
        : "Recorded";
    }
  }

  if (isDuringEvent) {
    result.late = !(currentTime.diff(event.start, "minutes", true) < 15);
    if (event.end.diff(currentTime, "minutes", true) < 10) {
      result.live = true;
      result.soon = true;
      result.label = event.isClean
        ? "Upcoming" // Overdue
        : event.isStarted
        ? "Ending soon"
        : "Recorded";
    } else {
      result.live = true;
      result.label = event.isClean
        ? !result.late
          ? "Upcoming" // In Progress
          : "Upcoming" // Overdue
        : event.isStarted
        ? "LIVE"
        : "Recorded";
    }
  }

  return { ...result, ...getColorStyle(result, event) };
};

const getColorStyle = (status, event) => {
  if (event.isCompleted) {
    return colors.recorded;
  }

  if (event.isStarted) {
    if (status.soon && status.during) {
      return colors.endingSoon;
    }
    if (status.after) {
      return colors.overrun;
    }
    return colors.live;
  }

  if (status.before) {
    if (status.soon) {
      return colors.upcoming;
    }

    return colors.scheduled;
  }

  if (status.during) {
    if (status.late) {
      return colors.overdue;
    }

    return colors.progress;
  }
  if (status.after) {
    return colors.missed;
  }

  // ugly backup
  return {
    background: "purple",
    font: "white",
    color: "purple"
  };
};
