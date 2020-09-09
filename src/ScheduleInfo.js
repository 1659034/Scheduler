import React, { useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import {
  ScheduleItemLabel,
  ScheduleItemStarts,
  ScheduleItemEnds,
  ScheduleItemStatus
} from "./ScheduleItem";
import {
  ScheduleRowInfo,
  ScheduleRowInfoDX,
  ScheduleRowInfoGroup
} from "./ScheduleRow";
import { StoreContext } from "./store/Store";
import { getActiveEvent } from "./utils";

const Wrapper = styled.div`
  flex: 0 0 300px;
  box-shadow: ${({ scrollOffset }) => Math.min(scrollOffset / 100, 1) * 5 + 5}px
    0px 6px -8px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ScheduleInfoWrapper = observer(({ children }) => {
  const { eventScroll } = useContext(StoreContext);
  return <Wrapper scrollOffset={eventScroll}>{children}</Wrapper>;
});

const EventList = observer(({ stream }) => {
  const { groupEventsInRow, currentTime } = useContext(StoreContext);

  if (groupEventsInRow && stream.events.length) {
    const event = getActiveEvent(stream, currentTime);
    return (
      event && (
        <ScheduleRowInfo key={stream.name + event.name}>
          <ScheduleItemStarts event={event} />
          <ScheduleItemEnds event={event} />
          <ScheduleItemStatus event={event} />
        </ScheduleRowInfo>
      )
    );
  }

  return stream.events.map(e => (
    <ScheduleRowInfo key={stream.name + e.name}>
      <ScheduleItemStarts event={e} />
      <ScheduleItemEnds event={e} />
      <ScheduleItemStatus event={e} />
    </ScheduleRowInfo>
  ));
});

const ScheduleInfo = observer(
  ({ data, activeRow, setActiveRow, setSelectedStream }) => {
    const { groupEventsInRow } = useContext(StoreContext);

    return (
      <ScheduleInfoWrapper>
        <>
          {data.map((s, streamIndex) => (
            <>
              <ScheduleRowInfoDX
                key={s.name}
                count={groupEventsInRow ? 1 : s.events.length}
                isEven={!(streamIndex % 2)}
                active={activeRow === s.name}
                onMouseOver={() => setActiveRow(s.name)}
                onMouseOut={() => setActiveRow(null)}
                onClick={() => setSelectedStream(s)}
              >
                <ScheduleItemLabel>{s.name}</ScheduleItemLabel>
                <ScheduleRowInfoGroup>
                  {s.events && <EventList stream={s} />}
                </ScheduleRowInfoGroup>
              </ScheduleRowInfoDX>
            </>
          ))}
        </>
      </ScheduleInfoWrapper>
    );
  }
);

export default ScheduleInfo;
