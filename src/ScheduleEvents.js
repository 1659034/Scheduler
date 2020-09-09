import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState
} from "react";
import styled from "styled-components";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";

import SchedulItem from "./ScheduleItem";
import ScheduleRow from "./ScheduleRow";
import CurrentTimeLine from "./CurrentTimeLine";
import { StoreContext } from "./store/Store";
import useReelativeMouseDrag from "./useRelativeMouseDrag";

const Wrapper = styled.div`
  flex: 1 0 400px;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
`;

export const useEventScroll = store => {
  const eventElementRef = useRef();

  const onBeforeRelativeMove = useCallback(
    () => ({
      x: -eventElementRef.current.scrollLeft
    }),
    []
  );
  const onRelativeMove = useCallback(
    value => {
      store.setEventScroll(-value.x);
    },
    [store]
  );

  const [setEventElement, eventElement] = useReelativeMouseDrag(
    onBeforeRelativeMove,
    onRelativeMove
  );
  eventElementRef.current = eventElement;

  useEffect(() => {
    const r = reaction(
      () => store.eventScroll,
      scroll => {
        if (eventElementRef.current) {
          eventElementRef.current.scrollTo(scroll, 0);
        }
      }
    );
    return () => {
      r.dispose();
    };
  }, []);

  return [setEventElement, eventElementRef];
};

const Events = observer(({ stream, streamIndex, setActiveRow, activeRow }) => {
  const { groupEventsInRow } = useContext(StoreContext);

  if (groupEventsInRow || !stream.events || !stream.events.length) {
    return (
      <ScheduleRow
        key={stream.name}
        active={activeRow === stream.name}
        onMouseOver={() => setActiveRow(stream.name)}
        onMouseOut={() => setActiveRow(null)}
        isEven={!(streamIndex % 2)}
      >
        {stream.events.map(e => (
          <SchedulItem key={e.name} event={e} hideTimes={true} />
        ))}
      </ScheduleRow>
    );
  }

  return stream.events.map(e => (
    <ScheduleRow
      key={stream.name + e.name}
      active={activeRow === stream.name}
      onMouseOver={() => setActiveRow(stream.name)}
      onMouseOut={() => setActiveRow(null)}
      isEven={!(streamIndex % 2)}
    >
      <SchedulItem key={e.name} event={e} />
    </ScheduleRow>
  ));
});

const ScheduleEvents = observer(({ data, activeRow, setActiveRow }) => {
  const store = useContext(StoreContext);

  const [setEventElement] = useEventScroll(store);

  return (
    <Wrapper ref={setEventElement}>
      <>
        {data.map((s, streamIndex) => (
          <>
            <Events
              key={s.name}
              stream={s}
              streamIndex={streamIndex}
              setActiveRow={setActiveRow}
              activeRow={activeRow}
            />
          </>
        ))}
      </>
      <CurrentTimeLine type="content" />
    </Wrapper>
  );
});

export default ScheduleEvents;
