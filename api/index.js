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

export const fetchTrip = (arrival='1093', destination='1084') => fetch('./data/stop_times.json')
.then(res => res.json())
.then(data => {
  let possibleTrips = data.filter(
    strip => strip.parent_station == arrival || strip.parent_station == destination
  );
  let tripMatch = possibleTrips.reduce((valAnte, valActual, indice) => {
    let stopIdKey = valActual.parent_station == arrival ? 'arrival_stop' :
    'dest_stop';
    let stopSequenceKey = valActual.parent_station == arrival ? 'arrival_sequence' :
    'dest_sequence';

    if (!valAnte[valActual.trip_id]) {
      valAnte[valActual.trip_id] = {};
    };

    valAnte[valActual.trip_id][stopIdKey] = valActual.stop_id;
    valAnte[valActual.trip_id][stopSequenceKey] = valActual.stop_sequence;

    return valAnte;
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

    fullTrips.push(data.filter(trip =>
      trip.trip_id == tm &&
      +trip.stop_sequence >= +tripMatch[tm].arrival_sequence &&
      +trip.stop_sequence <= +tripMatch[tm].dest_sequence
    ));
  });
  let count = 0;
  return fullTrips;
});
