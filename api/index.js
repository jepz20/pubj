export const fetchStops = () => fetch('./data/stops.json')
  .then(res => res.json())
  .then(data => {
    let sa = Object.keys(data).map(stop =>
      data[stop]
    );
    sa = sa.filter(s => s.parent_station === '')
    return { lookupTableStops: data, stops: sa }
  })

export const fetchStopTimes = () => fetch('./data/stop_times.json')
.then(res => res.json())

export const fetchTrip = (arrival='1093', destination='1084') => fetch('./data/stop_times.json')
.then(res => res.json())
.then(data => {
  let possible_trips = data.filter(strip =>
    strip.parent_station == arrival || strip.parent_station == destination
  )
  let trip_match = possible_trips.reduce((valAnte, valActual, indice) => {
    let stop_id_key = valActual.parent_station == arrival ? 'arrival_stop' :
    'dest_stop';
    let stop_sequence_key = valActual.parent_station == arrival ? 'arrival_sequence' :
    'dest_sequence';

    if (!valAnte[valActual.trip_id]) {
      valAnte[valActual.trip_id] = {}
    }
    valAnte[valActual.trip_id][stop_id_key] = valActual.stop_id
    valAnte[valActual.trip_id][stop_sequence_key] = valActual.stop_sequence

    return valAnte
  },{});
  let full_trips = []

  Object.keys(trip_match).forEach(tm => {
    if (!trip_match[tm].arrival_stop || !trip_match[tm].dest_sequence) {
      delete trip_match[tm];
      return;
    }
    if (+trip_match[tm].arrival_sequence > +trip_match[tm].dest_sequence) {
      delete trip_match[tm];
      return
    }

    full_trips.push(data.filter(trip => {
      return trip.trip_id == tm &&
      +trip.stop_sequence >= +trip_match[tm].arrival_sequence &&
      +trip.stop_sequence <= +trip_match[tm].dest_sequence
    }))
  })
  let count = 0;
  return full_trips;
})
