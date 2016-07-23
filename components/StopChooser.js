import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  console.log('ownProps', ownProps);
  return {
    stops: state.stops
  }
}

const StopChooser = ({
  stops
}) => (
  <select>
    {stops.map(stop =>
      <option key={stop.stop_id}>{stop.stop_name}</option>
    )}
  </select>
)
export default connect(mapStateToProps)(StopChooser);
