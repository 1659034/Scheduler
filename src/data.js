import moment from "moment";

export const pixelsPerHour = 100;

export const startOfDay = moment.tz("2019-04-30 08:00:00", "Asia/Tokyo");

export const measure = {
  row: {
    height: 34,
    padding: 4
  }
};

export const schedule = [
  {
    name: "dx1",
    events: [
      {
        start: moment.tz("2019-04-30 10:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        name: "BMX round 1"
      },
      {
        start: moment.tz("2019-04-30 12:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 13:15:00", "Asia/Tokyo"),
        name: "Karate"
      },
      {
        start: moment.tz("2019-04-30 14:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 15:30:00", "Asia/Tokyo"),
        name: "BMX round 2"
      }
    ]
  },
  {
    name: "dx2",
    events: [
      {
        start: moment.tz("2019-04-30 09:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        name: "Basketball - Quarter Finals"
      },
      {
        start: moment.tz("2019-04-30 11:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 13:00:00", "Asia/Tokyo"),
        name: "Basketball - Half Finals"
      }
    ]
  },
  {
    name: "dx3",
    events: [
      {
        start: moment.tz("2019-04-30 09:45:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:30:00", "Asia/Tokyo"),
        name: "Swimming - 100m men"
      },
      {
        start: moment.tz("2019-04-30 12:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 13:30:00", "Asia/Tokyo"),
        name: "Swimming - 200m women"
      }
    ]
  },
  {
    name: "dx4",
    events: [
      {
        start: moment.tz("2019-04-30 12:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 13:30:00", "Asia/Tokyo"),
        name: "Swimming - 100m men"
      },
      {
        start: moment.tz("2019-04-30 14:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 16:30:00", "Asia/Tokyo"),
        name: "Swimming - 200m women"
      }
    ]
  },
  {
    name: "dx5",
    events: []
  },
  {
    name: "dx6",
    events: [
      {
        start: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 12:30:00", "Asia/Tokyo"),
        name: "Tennis"
      }
    ]
  },
  {
    name: "dx7",
    events: [
      {
        start: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 12:00:00", "Asia/Tokyo"),
        name: "Karate"
      }
    ]
  },
  {
    name: "dx8",
    events: [
      {
        start: moment.tz("2019-04-30 10:15:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:45:00", "Asia/Tokyo"),
        name: "BMX"
      }
    ]
  },
  {
    name: "dx9",
    events: [
      {
        start: moment.tz("2019-04-30 09:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        name: "Sailing"
      }
    ]
  },
  {
    name: "dx10",
    events: [
      {
        start: moment.tz("2019-04-30 09:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        name: "Diving"
      }
    ]
  },
  {
    name: "dx11",
    events: [
      {
        start: moment.tz("2019-04-30 08:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:00:00", "Asia/Tokyo"),
        name: "Golf"
      }
    ]
  },
  {
    name: "dx12",
    events: []
  },
  {
    name: "dx13",
    events: [
      {
        start: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 12:30:00", "Asia/Tokyo"),
        name: "Tennis",
        startTime: moment.tz("2019-04-30 10:05:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx14",
    events: [
      {
        start: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 12:00:00", "Asia/Tokyo"),
        name: "Karate",
        startTime: moment.tz("2019-04-30 10:01:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx15",
    events: [
      {
        start: moment.tz("2019-04-30 10:15:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:45:00", "Asia/Tokyo"),
        name: "BMX",
        startTime: moment.tz("2019-04-30 09:55:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx16",
    events: [
      {
        start: moment.tz("2019-04-30 09:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        name: "Sailing",
        startTime: moment.tz("2019-04-30 09:25:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx17",
    events: [
      {
        start: moment.tz("2019-04-30 09:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        name: "Diving",
        startTime: moment.tz("2019-04-30 09:03:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx18",
    events: [
      {
        start: moment.tz("2019-04-30 08:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:00:00", "Asia/Tokyo"),
        name: "Golf",
        startTime: moment.tz("2019-04-30 08:40:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx19",
    events: []
  },
  {
    name: "dx20",
    events: [
      {
        start: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 12:30:00", "Asia/Tokyo"),
        name: "Tennis",
        startTime: moment.tz("2019-04-30 09:10:00", "Asia/Tokyo"),
        endTime: moment.tz("2019-04-30 10:10:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx21",
    events: [
      {
        start: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 12:00:00", "Asia/Tokyo"),
        name: "Karate",
        startTime: moment.tz("2019-04-30 09:10:00", "Asia/Tokyo"),
        endTime: moment.tz("2019-04-30 10:10:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx22",
    events: [
      {
        start: moment.tz("2019-04-30 10:15:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:45:00", "Asia/Tokyo"),
        name: "BMX",
        startTime: moment.tz("2019-04-30 09:10:00", "Asia/Tokyo"),
        endTime: moment.tz("2019-04-30 10:10:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx23",
    events: [
      {
        start: moment.tz("2019-04-30 09:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 11:00:00", "Asia/Tokyo"),
        name: "Sailing",
        startTime: moment.tz("2019-04-30 09:10:00", "Asia/Tokyo"),
        endTime: moment.tz("2019-04-30 10:10:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx24",
    events: [
      {
        start: moment.tz("2019-04-30 09:00:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:30:00", "Asia/Tokyo"),
        name: "Diving",
        startTime: moment.tz("2019-04-30 09:05:00", "Asia/Tokyo"),
        endTime: moment.tz("2019-04-30 10:18:00", "Asia/Tokyo")
      }
    ]
  },
  {
    name: "dx25",
    events: [
      {
        start: moment.tz("2019-04-30 08:30:00", "Asia/Tokyo"),
        end: moment.tz("2019-04-30 10:00:00", "Asia/Tokyo"),
        name: "Golf",
        startTime: moment.tz("2019-04-30 08:30:00", "Asia/Tokyo"),
        endTime: moment.tz("2019-04-30 10:00:00", "Asia/Tokyo")
      }
    ]
  }
];
