let defaultState = {
  stops: [],
  trips: [],
  stopsById: {}
}
export default function stops(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_STOPS':
      return {
        ...state,
        stops: action.response.stops,
        stopsById: action.response.lookupTableStops
      };
    case 'UPDATE_CHOOSER':
      let newState = { ...state }
      newState[action.id] = action.info
      return newState;
    default:
      return state;
  }
}
