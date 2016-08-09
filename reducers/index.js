import  { combineReducers } from 'redux';
import stops from './stops';
import trip from './trip';

export default combineReducers({
  stops,
  trip,
});
