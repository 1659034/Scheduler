import React, { useContext, useCallback } from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react-lite";

import { StoreContext } from "./store/Store";
import { pixelsPerHour, startOfDay } from "./data";
import { getStatus } from "./utils";

const Wrapper = styled.div`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: 500px;
  max-height: 80vh;
  overflow-y: scroll;
  border: 1px solid lightgrey;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  z-index: 100;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
`;

const TopWrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  & > * {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  & > * {
    flex: 0 0 100px;
  }
`;

const Thumbnail = styled.div`
  flex: 0 0 212px;
  height: 120px;
  background-color: #111;
  margin: 0 15px 20px 0;
  color: #ddd;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLabelValue = styled.div``;
const Label = styled.p`
  font-size: 12px;
  line-height: 10px;
  color: #666;
  margin: 0 0 5px;
`;
const Value = styled.p`
  font-size: 12px;
  line-height: 12px;
  color: black;
  margin: 0;
  font-weight: bold;
`;

const EventStatus = styled.span`
  color: ${props => props.color};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
`;

const LabelValue = ({ label, children }) => (
  <StyledLabelValue>
    <Label>{label}</Label>
    <Value>{children}</Value>
  </StyledLabelValue>
);

const EventInfo = observer(() => {
  const {
    currentTime,
    timezone,
    selectedEvent,
    selectedEventElement,
    setSelectedEvent
  } = useContext(StoreContext);

  const hoverEvent = useCallback(() => {
    setSelectedEvent(selectedEvent, selectedEventElement);
  }, [selectedEvent]);
  const stopHoverEvent = useCallback(() => {
    setSelectedEvent(null, null);
  }, []);

  if (!selectedEvent) {
    return null;
  }
  const rect = selectedEventElement.getBoundingClientRect();
  const left = Math.max(20, Math.min(rect.left, window.innerWidth - 500 - 20));
  const top =
    rect.bottom + 200 > window.innerHeight
      ? rect.top - 200 - 10
      : rect.top + 40;

  const eventStatus = getStatus(selectedEvent, currentTime);

  return (
    <Wrapper
      left={left}
      top={top}
      onMouseEnter={hoverEvent}
      onMouseLeave={stopHoverEvent}
    >
      <TopWrapper>
        <Thumbnail>
          <span>Event Thumbnail</span>
        </Thumbnail>
        <InfoWrapper>
          <LabelValue label={"Football"}>{selectedEvent.name}</LabelValue>
          <TimeWrapper>
            <LabelValue label={"Start time"}>
              {selectedEvent.start
                .clone()
                .tz(timezone)
                .format("H:mm")}
            </LabelValue>
            <LabelValue label={"End time"}>
              {selectedEvent.end
                .clone()
                .tz(timezone)
                .format("H:mm")}
            </LabelValue>
          </TimeWrapper>
          <TimeWrapper>
            <LabelValue label={"Status"}>
              <EventStatus {...eventStatus}>{eventStatus.label}</EventStatus>
            </LabelValue>
            <LabelValue label={"Commentary"}>Dutch, English</LabelValue>
          </TimeWrapper>
        </InfoWrapper>
      </TopWrapper>
    </Wrapper>
  );
});

export default EventInfo;
