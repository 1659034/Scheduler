const striped = (color1, color2) => `repeating-linear-gradient(
  135deg,
  ${color1},
  ${color1} 4px,
  ${color2} 4px,
  ${color2} 8px
)`;

// background - for event blocks
// font - for event blocks
// color - text color when just displaying text
// bold - when displaying text or status

export const colors = {
  // not actioned
  scheduled: {
    background: "#42526E",
    font: "white",
    color: "#434E70"
  },
  upcoming: {
    background: "#FFEBE5",
    font: "#BF2600",
    color: "#BF2600"
  },
  progress: {
    background: "#BF2600",
    font: "white",
    color: "#BF2600"
  },
  overdue: {
    background: "#BF2600",
    font: "white",
    color: "#BF2600"
  },
  missed: {
    background: "#999",
    font: "white",
    color: "#999"
  },

  // started
  live: {
    background: striped("#d3fbe0", "#ccf5da"),
    font: "#006900",
    color: "#006900",
    bold: true
  },
  endingSoon: {
    background: striped("#FFEBE5", "#FEE7E0"),
    font: "#bb0000",
    color: "#bb0000"
  },
  overrun: {
    background: striped("#BF2600", "#B62400"),
    font: "white",
    color: "#BF2600"
  },

  // started & stopped
  recorded: {
    background: "#DEEBFF",
    font: "#0747A6",
    color: "#0747A6"
  },

  // skipped / ignored
  skipped: {
    background: "#bbb",
    font: "white",
    color: "#999"
  }
};

// the recorded start/stop lines below events
export const recordedRed = "#FF8F73";

// any live red indicator, either the red dot, or the timeline
export const liveRed = "#FF8F73";
