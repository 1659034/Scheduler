import React from "react";
import styled from "styled-components";

import { measure } from "./data";

const Wrapper = styled.div`
  background-size: 100px 1px;
  background-image: linear-gradient(to right, #eee 1px, transparent 1px);
  height: ${measure.row.height}px;
  width: calc(100px * 14);
  position: relative;
  padding: ${measure.row.padding}px 0;
  background-color: ${props =>
    props.active ? "#eeeeee" : props.isEven ? "#f8f8f8" : "transparent"};
`;

const InfoRowDX = styled.div`
  height: ${props =>
    Math.max(1, props.count) *
    (measure.row.height + measure.row.padding * 2)}px;
  font-size: 10px;
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.active ? "#eeeeee" : props.isEven ? "#f8f8f8" : "transparent"};
  cursor: pointer;
`;

const InfoRow = styled.div`
  height: ${measure.row.height}px;
  font-size: 10px;
  padding: ${measure.row.padding}px 0;
  display: flex;
  align-items: center;
`;

export const ScheduleRowInfoDX = ({ children, ...props }) => {
  return <InfoRowDX {...props}>{children}</InfoRowDX>;
};

export const ScheduleRowInfo = ({ children, active }) => {
  return <InfoRow active={active}>{children}</InfoRow>;
};

export const ScheduleRowInfoGroup = styled.div`
  flex: 1 0 200px;
`;

const ScheduleRow = ({ children, onMouseOver, onMouseOut, active, isEven }) => {
  return (
    <Wrapper
      active={active}
      isEven={isEven}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </Wrapper>
  );
};

export default ScheduleRow;
