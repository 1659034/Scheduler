import React, { useContext, useCallback, useRef } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

import { pixelsPerHour, startOfDay, measure } from "./data";
import { getTimeFromEvent, isEventActive, getStatus } from "./utils";
import { StoreContext } from "./store/Store";
import { recordedRed, liveRed } from "./colors";

const Wrapper = styled.div`
  background: ${props => props.status.background};
  border-radius: 1px;
  width: calc(${props => (props.duration / 60) * pixelsPerHour}px - 5px);
  left: calc(${props => (props.start / 60) * pixelsPerHour}px + 2px);
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
  position: absolute;
  height: ${measure.row.height}px;
  line-height: ${measure.row.height + 2}px;
  color: ${props => props.status.font};
  font-size: 11px;
  cursor: pointer;
`;

const ScheduleItemInfo = styled.span`
  text-align: center;
  padding: 0 5px;
  display: inline-block;
  color: ${props => (props.past ? "grey" : "inherit")};
`;

const StyledLabel = styled(ScheduleItemInfo)`
  font-weight: bold;
  flex: 0 0 50px;
`;

const StyledStarts = styled(ScheduleItemInfo)`
  flex: 0 0 50px;
`;

const StyledStatus = styled(ScheduleItemInfo)`
  flex: 0 0 100px;
  color: ${props => props.font};
  font-weight: ${props => (props.bold ? "bold" : "none")};
  font-size: 10px;

  > span {
    display: inline-block;
    padding: 5px 7px;
    border-radius: 3px;
    background: ${props => props.background};
  }
`;

const Live = styled.span`
  color: ${liveRed};
  margin-right: 2px;
`;

export const ScheduleItemLabel = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

export const ScheduleItemStarts = observer(({ event }) => {
  const { currentTime, timezone } = useContext(StoreContext);
  const info = getTimeFromEvent(event, "start", currentTime, timezone);
  return <StyledStarts past={info.past}>{info.label}</StyledStarts>;
});

const StyledEnds = styled(ScheduleItemInfo)`
  flex: 0 0 50px;
`;

export const ScheduleItemEnds = observer(({ event }) => {
  const { currentTime, timezone } = useContext(StoreContext);
  const info = getTimeFromEvent(event, "end", currentTime, timezone);
  return <StyledEnds past={info.past}>{info.label}</StyledEnds>;
});

export const ScheduleItemStatus = observer(({ event }) => {
  const { currentTime } = useContext(StoreContext);
  const status = getStatus(event, currentTime);
  return (
    <StyledStatus {...status}>
      <span>
        {event.isStarted ? <Live>● </Live> : ""}
        {status.label}
      </span>
    </StyledStatus>
  );
});

const Time = styled.span`
  position: absolute;
  display: block;
  top: 0;
  color: #888;
  width: 35px;
`;

const StartTime = styled(Time)`
  left: -40px;
  text-align: right;
`;

const EndTime = styled(Time)`
  right: -40px;
`;

const Label = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: block;
  padding-right: 3px;
  box-sizing: border-box;
`;

const Recorded = styled.div`
  z-index: 1;
  position: absolute;
  height: 2px;
  background-color: ${recordedRed};
  color: ${recordedRed};
  bottom: 4px;
  left: calc(${props => (props.left / 60) * pixelsPerHour}px + 2px);
  width: calc(${props => (props.width / 60) * pixelsPerHour}px - 5px);

  &::before,
  &::after {
    content: "●";
    position: absolute;
    top: 0px;
    line-height: 0;
    font-size: 14px;
  }
  &::before {
    left: -1px;
  }
  &::after {
    right: -1px;
    ${props => (props.completed ? "" : "display: none;")}
  }
`;

const SchedulItem = observer(({ event, hideTimes }) => {
  const { start, end, name } = event;
  const { currentTime, timezone, setSelectedEvent } = useContext(StoreContext);
  const durationInMinutes = end.diff(start, "minutes");
  const startOffset = start.diff(startOfDay, "minutes");
  const status = getStatus(event, currentTime);
  const ref = useRef();

  const hoverEvent = useCallback(() => {
    setSelectedEvent(event, ref.current);
  }, []);
  const stopHoverEvent = useCallback(() => {
    setSelectedEvent(null, null);
  }, []);

  const recordedProps = {
    left: -event.start.diff(event.started, "minutes"),
    width:
      !event.isClean &&
      -event.started.diff(
        event.isCompleted ? event.stopped : currentTime,
        "minutes"
      ),
    completed: event.isCompleted
  };

  return (
    <Wrapper
      ref={ref}
      duration={durationInMinutes}
      start={startOffset}
      status={status}
      event={event}
      title={name}
      onMouseEnter={hoverEvent}
      onMouseLeave={stopHoverEvent}
    >
      {!hideTimes && (
        <StartTime>
          {event.start
            .clone()
            .tz(timezone)
            .format("H:mm")}
        </StartTime>
      )}
      <Label>
        {event.isStarted ? <Live>● </Live> : ""}
        {name}
      </Label>
      {!hideTimes && (
        <EndTime>
          {event.end
            .clone()
            .tz(timezone)
            .format("H:mm")}
        </EndTime>
      )}
      {!event.isClean && <Recorded {...recordedProps} />}
    </Wrapper>
  );
});

export default SchedulItem;
