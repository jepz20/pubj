// GET STOP TIMES
Papa.parse('../data/stop_times.txt', {
  download: true,
  header: true,
  complete: function (results) {
    fetch('../data/stops.json')
    .then(res => res.json())
    .then(response => {
      results.data.forEach(dt => {
        if (dt.stop_id) {
          dt.parent_station = response[dt.stop_id].parent_station;
        }
      });
      console.log('st', results.data);
    });
  },
});

// GET STOP TIMES
Papa.parse('../data/stops.txt', {
  download: true,
  header: true,
  complete: function (results) {
    console.log('stop', results.data);
  },
});

Papa.parse('../rawData/trips.txt', {
  download: true,
  header: true,
  complete: function (results) {
    let trips = results.data;
    Papa.parse('../rawData/calendar.txt', {
      download: true,
      header: true,
      complete: function (results) {
        let calendarData = results.data;

        let tripsWithCalendar = trips.map(t => {
          t.weekday = false;
          t.sunday = false;
          t.saturday = false;
          let calendarMatch = calendarData.filter(
            f => f.service_id === t.service_id
          );
          let calendar = calendarMatch[0];
          console.log(calendar);
          if (calendar) {
            if (calendar.saturday === '1') {
              t.saturday = true;
            };

            if (calendar.sunday === '1') {
              t.sunday = true;
            };

            if (calendar.monday === '1') {
              t.weekday = true;
            };

            return t;
          } else {
            console.log('tuu', calendarMatch, t);
            return 'nada';
          }
        });
        console.log('tripsWithCalendar', tripsWithCalendar);
      },
    });
  },
});
