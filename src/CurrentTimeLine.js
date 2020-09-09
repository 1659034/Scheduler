import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styled, { css } from "styled-components";

import { pixelsPerHour, startOfDay } from "./data";
import { StoreContext } from "./store/Store";
import { liveRed } from "./colors";

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 1px;
  background-color: ${liveRed};
  color: ${liveRed};
  top: ${props => (props.type === "content" ? 0 : 4)}px;
  left: ${props => (props.offset / 60) * pixelsPerHour}px;
  overflow: visible;
  pointer-events: none;

  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    left: -1px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  ${({ type }) =>
    type !== "content" &&
    css`
      &:after {
        content: "●";
        font-size: 20px;
        position: absolute;
        left: -5px;
        top: -9px;
      }
    `}
`;

const Time = styled.div`
  position: absolute;
  left: 5px;
  top: -4px;
  font-size: 10px;
  background-color: white;
  color: grey;
  padding: 1px 3px;
`;

const CurrentTimeLine = observer(({ type }) => {
  const { currentTime, timezone } = useContext(StoreContext);
  const offset = currentTime.diff(startOfDay, "minutes");

  const localTime = currentTime.clone().tz(timezone);

  return (
    <Wrapper offset={offset} type={type}>
      {type !== "content" && <Time>{localTime.format("H:mm")}</Time>}
    </Wrapper>
  );
});

export default CurrentTimeLine;
