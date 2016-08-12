export const fetchStops = () => fetch('./data/stops.json')
  .then(res => res.json())
  .then(data => {
    let sa = Object.keys(data).map(stop =>
      data[stop]
    );
    sa = sa.filter(s => s.parent_station === '');
    return { lookupTableStops: data, stops: sa };
  });

export const fetchStopTimes = () => fetch('./data/stop_times.json')
.then(res => res.json());

export const fetchTrip = (arrival, destination, pickedDay='weekday') =>
fetch('./data/stop_times.json')
.then(res => res.json())
.then(data => {
  let possibleTrips = data.filter(
    strip => strip.parent_station == arrival || strip.parent_station == destination
  );
  let tripMatch = possibleTrips.reduce((prev, current, index) => {
    let stopIdKey = current.parent_station == arrival ? 'arrival_stop' :
    'dest_stop';
    let stopSequenceKey = current.parent_station == arrival ? 'arrival_sequence' :
    'dest_sequence';

    if (!prev[current.trip_id]) {
      prev[current.trip_id] = {};
    };

    prev[current.trip_id][stopIdKey] = current.stop_id;
    prev[current.trip_id][stopSequenceKey] = current.stop_sequence;

    return prev;
  }, {});

  let fullTrips = [];

  Object.keys(tripMatch).forEach(tm => {
    if (!tripMatch[tm].arrival_stop || !tripMatch[tm].dest_sequence) {
      delete tripMatch[tm];
      return;
    };

    if (+tripMatch[tm].arrival_sequence > +tripMatch[tm].dest_sequence) {
      delete tripMatch[tm];
      return;
    };

    fullTrips.push({
      tripId: tm,
      stops: data.filter(trip =>
        trip.trip_id == tm &&
        +trip.stop_sequence >= +tripMatch[tm].arrival_sequence &&
        +trip.stop_sequence <= +tripMatch[tm].dest_sequence
      ),
    });
  });
  if (fullTrips.length === 0) {
    return [];
  }

  return fetch('./data/trips.json')
  .then(res => res.json())
  .then(data => {
    let trips = data;
    let returnTrips = fullTrips.reduce((prev, current, index) => {
      let tripDetail = trips.filter(t=> t.trip_id === fullTrips[index].tripId)[0];
      if (tripDetail[pickedDay]) {
        fullTrips[index].detail = tripDetail;
        fullTrips[index].detail.initialTime = fullTrips[index].stops[0].arrival_time;
        fullTrips[index].detail.endTime = fullTrips[index]
          .stops[fullTrips[index].stops.length - 1]
          .arrival_time;
        fullTrips[index].stops[fullTrips[index].stops.length - 1].departure_time = null;
        prev.push(fullTrips[index]);
      };

      return prev;
    }, []);

    return returnTrips;
  });
});
