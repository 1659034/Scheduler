import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import moment from "moment-timezone";
import styled, { css } from "styled-components";

import "./styles.css";
import Schedule from "./Schedule";
import { StoreContext } from "./store/Store";

const timezoneList = [
  "Pacific/Auckland",
  "Australia/Tasmania",
  "Australia/Sydney",
  "Australia/Adelaide",
  "Australia/Eucla",
  "Asia/Tokyo",
  "Asia/Hong_Kong",
  "Asia/Bangkok",
  "Europe/Kiev",
  "Africa/Johannesburg",
  "Europe/Athens",
  "Europe/Amsterdam",
  "Europe/London",
  "America/Argentina/Buenos_Aires",
  "America/New_York",
  "America/Denver",
  "America/Los_Angeles"
];

const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
const Select = styled.select``;

const uniqueZones = timezoneList
  .map(n => ({
    name: n,
    offset: moment.tz.zone(n).utcOffset(0),
    abbr: moment.tz.zone(n).abbr(0)
  }))
  .sort((a, b) => a.offset - b.offset);

const resetStreamActions = streams => {
  streams.forEach(s => {
    s.reset();
  });
};

const Test = styled.div`
  ${() =>
    css`
      margin: 0;
    `}
  ${() =>
    css`
      padding: 0;
    `}
  ${() =>
    css`
      color: 0;
    `}
  ${() =>
    css`
      border: 0;
    `}
  ${() =>
    css`
      width: 0;
    `}
  ${() =>
    css`
      height: 0;
    `}`;

const App = observer(() => {
  const {
    timezone,
    setTimezone,
    streams,
    setGroupEventsInRow,
    groupEventsInRow
  } = useContext(StoreContext);

  return (
    <div className="App">
      <Test />
      <h1>Schedule</h1>
      <h2>This is just a prototype!</h2>
      <Options>
        <label style={{ fontSize: 12, marginRight: 10 }}>
          <input
            type="checkbox"
            onChange={() => setGroupEventsInRow(!groupEventsInRow)}
            checked={groupEventsInRow}
          />{" "}
          Group events in row
        </label>
        <button onClick={() => resetStreamActions(streams)}>
          Reset all start/stop
        </button>
        <Select
          onChange={e => setTimezone(e.currentTarget.value)}
          value={timezone}
        >
          {uniqueZones.map(o => (
            <option value={o.name} key={o.name}>{`${o.name} (${moment()
              .tz(o.name)
              .format("Z z")})`}</option>
          ))}
        </Select>
      </Options>
      <Schedule data={streams} timezone={timezone} />
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
