import { combineReducers } from 'redux';

export default function stops(state = [], action) {
  switch (action.type) {
    case 'INITIALIZE_STOPS':
      return state
      break;
    default:
      return state;

  }
}
