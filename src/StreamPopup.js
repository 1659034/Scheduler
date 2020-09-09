import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react-lite";

import { StoreContext } from "./store/Store";
import { pixelsPerHour, startOfDay } from "./data";
import { getStatus } from "./utils";

const Wrapper = styled.div`
  position: fixed;
  width: 500px;
  max-height: 90vh;
  overflow-y: scroll;
  border: 1px solid lightgrey;
  background-color: white;
  top: 60px;
  left: 300px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 10;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
`;

const DXTitle = styled.p`
  font-size: 12px;
  margin: 0;
  margin-bottom: 12px;
`;

const Live = styled.span`
  color: red;
  margin-right: 2px;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
  cursor: pointer;
  padding: 10px;
`;

const Player = styled.div`
  width: ${500 - 40}px;
  height: ${((500 - 40) / 16) * 9}px;
  background-color: #111;
  margin: 0 auto;
  margin-bottom: 20px;
  color: #ddd;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DXPlaylistTitle = styled.h4`
  margin: 0;
  margin-bottom: 25px;
`;

const Day = styled.p`
  font-size: 12px;
`;

const EventList = styled.ul`
  padding-left: 0;
  margin: 0;
`;

const EventRow = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background-color: #f6f6f6;
  padding: 20px;
  margin-bottom: 8px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EventRowLabel = styled.span`
  position: absolute;
  left: 20px;
  top: 15px;
  color: #555;
  font-size: 10px;
`;

const EventRowName = styled.span`
  font-size: 15px;
  flex: 1 1 40px;
`;

const EventRowTime = styled.span`
  font-size: 10px;
  color: #555;
  flex: 0 0 90px;
`;

const EventStatus = styled.span`
  color: ${props => props.color};
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  font-size: 10px;
  flex: 0 0 70px;
`;

const StreamButton = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  display: inline-block;
  height: 29px;
  flex: 0 0 112px;
  color: white;
  font-weight: bold;
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
`;

const StreamLabel = styled.span`
  display: inline-block;
  flex: 0 0 112px;
  height: 29px;
  line-height: 29px;
`;

const RecordedStreamLabel = styled(StreamLabel)`
  color: #333;
  text-align: center;
  font-weight: bold;
`;

const SkippedStreamLabel = styled(StreamLabel)`
  color: #4a4a4a;
  opacity: 0.3;
`;

const StartStreamButton = styled(StreamButton)`
  ${props =>
    props.disabled
      ? css`
          background: #4a4a4a;
          opacity: 0.3;
        `
      : css`
          background: #36b37e;
        `}
`;

const StopStreamButton = styled(StreamButton)`
  background: #de350b;
`;

const ResumeStreamButton = styled(StreamButton)`
  color: #2684ff;
  border: 2px solid #2684ff;
`;

const EventProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: ${props => props.progress * 100}%;
  background-color: #bbb;
`;

const getStartableEvent = stream => {
  if (stream.isStarted) {
    return null;
  }

  return stream.events.find(e => {
    if (e.isCompleted) {
      return false;
    }
    return true;
  });
};

const getCorrectButton = (stream, event, startableEvent) => {
  // TODO: skipped

  if (event.isStarted) {
    return (
      <StopStreamButton onClick={() => stream.setIsStarted(false, event)}>
        Stop Broadcast
      </StopStreamButton>
    );
  } else if (event.isCompleted) {
    const haveLaterEventsFinished =
      stream.events
        .slice(stream.events.indexOf(event) + 1)
        .filter(e => e.isCompleted).length > 0;
    if (!stream.isStarted && !haveLaterEventsFinished) {
      return (
        <ResumeStreamButton onClick={() => stream.setIsStarted(true, event)}>
          Resume
        </ResumeStreamButton>
      );
    } else {
      return <RecordedStreamLabel>Recorded</RecordedStreamLabel>;
    }
  } else {
    // event not started

    return (
      <StartStreamButton
        disabled={stream.isStarted || event !== startableEvent}
        onClick={() => stream.setIsStarted(true, event)}
      >
        Start Broadcast
      </StartStreamButton>
    );
  }
};

const StreamPopup = observer(({ stream, onClose }) => {
  const { currentTime, timezone } = useContext(StoreContext);
  if (!stream) return null;

  const startableEvent = getStartableEvent(stream);

  return (
    <Wrapper>
      <CloseButton onClick={onClose}>✕</CloseButton>
      <DXTitle>
        {stream.name.toUpperCase()}
        {stream.isStarted ? <Live> ●</Live> : ""}
      </DXTitle>
      <Player>
        <span>Live Preview</span>
      </Player>
      <DXPlaylistTitle>{stream.name.toUpperCase()} Playlist</DXPlaylistTitle>
      <Day>Day 8</Day>
      <EventList>
        {stream.events.map(e => {
          const status = getStatus(e, currentTime);
          return (
            <EventRow key={e.name}>
              <EventRowLabel>Football</EventRowLabel>
              <EventRowName>{e.name}</EventRowName>
              <EventRowTime>
                {e.start
                  .clone()
                  .tz(timezone)
                  .format("H:mm")}{" "}
                -{" "}
                {e.end
                  .clone()
                  .tz(timezone)
                  .format("H:mm")}
              </EventRowTime>
              <EventStatus {...status}>
                {e.isStarted ? <Live>● </Live> : ""}
                {status.label}
              </EventStatus>
              {getCorrectButton(stream, e, startableEvent)}
              {currentTime.isSameOrAfter(e.start) && (
                <EventProgress
                  progress={
                    currentTime.diff(e.start, "minutes") /
                    e.end.diff(e.start, "minutes")
                  }
                />
              )}
            </EventRow>
          );
        })}
      </EventList>
    </Wrapper>
  );
});

export default StreamPopup;
