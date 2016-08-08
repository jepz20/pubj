import { combineReducers }  from 'redux';

export default function trips(state = [], action) {
  switch (action.type) {
    case 'LOAD_STOP_TIMES':
      return action.response[0];
    case 'UPDATE_TRIPS':
      let trips = [];
      console.log(action.response, 'lol');
      if (action.response.length > 0) {
        trips = action.response[0].stops;
      } else {
        trips = action.response;
      }

      trips.forEach(stop => {
        stop.stop_detail = action.stopsById[stop.stop_id];
      });

      return trips;
    default:
      return state;
  }
}
