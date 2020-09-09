import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef
} from "react";
import styled, { css } from "styled-components";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import moment from "moment";

import { pixelsPerHour, startOfDay } from "./data";
import { StoreContext } from "./store/Store";
import useReelativeMouseDrag from "./useRelativeMouseDrag";
import CurrentTimeLine from "./CurrentTimeLine";
import { useEventScroll } from "./ScheduleEvents";
import useClickWithoutDrag from "./useClickWIthoutDrag";

const Wrapper = styled.div`
  display: flex;
  top: 0;
  z-index: 10;
  background-color: white;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  height: 30px;

  ${({ fixed }) =>
    fixed
      ? css`
          position: fixed;
          box-shadow: 0px 10px 6px -8px rgba(0, 0, 0, 0.2);
        `
      : css`
          position: absolute;
          box-shadow: 0px 5px 6px -8px rgba(0, 0, 0, 0.2);
        `}
`;

const InfoWrapper = styled.div`
  flex: 0 0 300px;
  box-shadow: ${({ scrollOffset }) => Math.min(scrollOffset / 100, 1) * 5 + 5}px
    0px 6px -8px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const InfoWrapperScroll = observer(({ children }) => {
  const { eventScroll } = useContext(StoreContext);
  return <InfoWrapper scrollOffset={eventScroll}>{children}</InfoWrapper>;
});

const InfoHeading = styled.div`
  height: 100%;
  font-size: 10px;
  line-height: 30px;
  display: flex;
  cursor: pointer;
`;

const InfoHeadingItem = styled.span`
  font-weight: ${props => (props.sorted ? "bold" : "normal")};
  text-align: center;
  padding: 0 5px;
  display: inline-block;
`;

const EventWrapper = styled.div`
  flex: 1 0 400px;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
`;

const EventHeading = styled.div`
  background-size: 100px 1px;
  background-image: linear-gradient(to right, #eee 1px, transparent 1px);
  display: flex;
  align-items: center;
  width: calc(100px * 14);
  height: 100%;
`;

const EventHeadingUnit = styled.span`
  display: inline-block;
  cursor: pointer;
  width: 100px;
  flex: 0 0 100px;
  font-size: 10px;
  text-align: left;
  left: 4px;
  position: relative;
`;

const getEventHours = timezone => {
  const endOfDay = moment(startOfDay).hours(23);

  const time = moment(startOfDay);
  const items = [];
  let prevDate = "0";
  while (time.isBefore(endOfDay)) {
    const localTime = time.clone().tz(timezone);
    const date = localTime.format("D");
    const dateLabel = date !== prevDate ? localTime.format("MMM Do") : "";
    prevDate = date;
    items.push(
      <EventHeadingUnit key={time.hours()}>
        {dateLabel}
        <br />
        {localTime.format("H:mm")}
      </EventHeadingUnit>
    );
    time.add(1, "hour");
  }

  return items;
};

const ScheduleHeader = observer(({ sorted, sortOn, fixed }) => {
  const store = useContext(StoreContext);
  const { setCurrentTime, timezone } = store;

  const updateTime = useCallback(event => {
    const click =
      event.clientX -
      eventElementRef.current.getBoundingClientRect().left +
      eventElementRef.current.scrollLeft;
    const timeOffset = Math.round((click / pixelsPerHour) * 60);
    setCurrentTime(startOfDay.clone().add(timeOffset, "minutes"));
  });

  const [setRef] = useClickWithoutDrag(updateTime);

  const [setEventElement, eventElementRef] = useEventScroll(store);

  return (
    <Wrapper fixed={fixed}>
      <InfoWrapperScroll>
        <InfoHeading>
          <InfoHeadingItem
            sorted={sorted === "dx"}
            style={{
              flex: "0 0 50px"
            }}
          >
            DX
          </InfoHeadingItem>
          <InfoHeadingItem
            sorted={sorted === "start"}
            style={{
              flex: "0 0 50px"
            }}
          >
            Starts
          </InfoHeadingItem>
          <InfoHeadingItem
            sorted={sorted === "end"}
            style={{
              flex: "0 0 50px"
            }}
          >
            Ends
          </InfoHeadingItem>
          <InfoHeadingItem
            sorted={sorted === "status"}
            style={{
              flex: "0 0 100px"
            }}
          >
            Status
          </InfoHeadingItem>
        </InfoHeading>
      </InfoWrapperScroll>
      <EventWrapper ref={setEventElement}>
        <EventHeading ref={setRef}>{getEventHours(timezone)}</EventHeading>
        <CurrentTimeLine />
      </EventWrapper>
    </Wrapper>
  );
});

export default ScheduleHeader;
