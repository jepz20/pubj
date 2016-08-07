import  { combineReducers } from 'redux';
import stops from './stops';
import trips from './trips';

export default combineReducers({
  stops,
  trips,
});
