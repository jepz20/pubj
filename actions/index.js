import * as api from '../api';

const receiveStops = response => ({
  type: 'RECEIVE_STOPS',
  response,
});

const receiveStopTimes = (response=[]) => ({
  type: 'LOAD_STOP_TIMES',
  response,
});

const updateTrips = (response=[], stopsById={}) => ({
  type: 'UPDATE_TRIPS',
  response,
  stopsById,
});

export const changeStopTimes = (id, info) => ({
  type: 'UPDATE_CHOOSER',
  id,
  info,
});

export const fetchStopFilter = (arrival, departure, stopsById) =>
  api.fetchTrip(arrival, departure)
  .then(response =>
    updateTrips(response, stopsById)
  );

export const fetchStops = () =>
  api.fetchStops().then(response =>
    receiveStops(response)
  );

export const fetchStopTimes = () =>
  api.fetchTrip().then(response =>
    receiveStopTimes(response)
);
