import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import { getSortTimeFromEvent } from "./utils";
import StreamPopup from "./StreamPopup";
import ScheduleEvents from "./ScheduleEvents";
import ScheduleInfo from "./ScheduleInfo";
import ScheduleHeader from "./ScheduleHeader";
import EventInfo from "./EventInfo";

const Wrapper = styled.div`
  position: relative;
  padding-top: 30px;
  box-sizing: border-box;
`;

const Content = styled.div`
  position: relative;
  display: flex;
`;

const InViewHelper = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  top: 0px;
  visibility: hidden;
  pointer-events: none;
`;

const Schedule = ({ data, timezone }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [selectedStream, setSelectedStream] = useState(); // data[0]
  const [sorted, sortOn] = useState("dx");
  const [ref, inView, entry] = useInView();

  const sortedData = data.concat().sort((a, b) => {
    if (sorted === "dx") {
      return a.name.substr(2) - b.name.substr(2);
    }
    if (sorted === "start") {
      return (
        getSortTimeFromEvent(a, "start") - getSortTimeFromEvent(b, "start")
      );
    }
    if (sorted === "end") {
      return getSortTimeFromEvent(a, "end") - getSortTimeFromEvent(b, "end");
    }
    return b.name.localeCompare(a.name);
  });

  return (
    <Wrapper>
      <InViewHelper ref={ref} />
      <ScheduleHeader sorted={sorted} sortOn={sortOn} fixed={!inView} />
      <Content>
        <ScheduleInfo
          data={data}
          activeRow={activeRow}
          setActiveRow={setActiveRow}
          setSelectedStream={setSelectedStream}
        />
        <ScheduleEvents
          data={sortedData}
          activeRow={activeRow}
          setActiveRow={setActiveRow}
        />
      </Content>
      <StreamPopup
        stream={selectedStream}
        onClose={() => setSelectedStream(null)}
      />
      <EventInfo />
    </Wrapper>
  );
};

export default Schedule;
