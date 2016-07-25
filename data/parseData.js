// GET STOP TIMES
Papa.parse('../data/stop_times.txt', {
  download: true,
  header: true,
  complete: function(results) {
    // let stops = {}
    // results.data.forEach((stop) => {
    //   stops[stop.stop_id] = stop;
    // })
    fetch('../data/stops.json')
    .then(res => res.json())
    .then(response => {
      results.data.forEach(dt => {
        if (dt.stop_id) {
          dt['parent_station'] = response[dt.stop_id].parent_station;
        }
      })
      console.log('st', results.data);
    })
    // console.log('st', stops);
  }
})
// GET STOP TIMES
Papa.parse('../data/stops.txt', {
  download: true,
  header: true,
  complete: function(results) {
    // let stops = {}
    // results.data.forEach((stop) => {
    //   stops[stop.stop_id] = stop;
    // })
    console.log('stop', results.data);
    // console.log('st', stops);
  }
})
