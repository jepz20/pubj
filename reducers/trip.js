import { combineReducers }  from 'redux';

export default function trip(state = {}, action) {
  switch (action.type) {
    case 'LOAD_STOP_TIMES':
      return action.response[0];
    case 'UPDATE_TRIPS':
      let trip = {};
      if (action.response.length > 0) {
        trip = action.response[0];
        trip.stops.forEach(stop => {
          stop.stop_detail = action.stopsById[stop.stop_id];
        });
      } else {
        trip.error = 'No Results';
      };

      return trip;
    default:
      return state;
  }
}
