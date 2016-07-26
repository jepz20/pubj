import React from 'react';
import  { connect } from 'react-redux';
import * as actions from '../actions';
import { v4 } from 'node-uuid';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
const mapStateToProps = (state) => {
  return {
    trips: state.trips
  }
}

class StopTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { fetchStopTimes } = this.props;
    // fetchStopTimes();
  }
  render() {
    const { trips, updateTrips } = this.props;
    if (trips.length > 0) {
      return (
        <Table responsive striped bordered condensed hover>
        <thead>
        <tr>
        <th>Trip ID</th>
        <th>Stop ID</th>
        <th>Name</th>
        <th>Arrival</th>
        <th>Departure</th>
        <th>Latitud</th>
        <th>Longitud</th>
        </tr>
        </thead>
        <tbody>
        {
          trips.map(st =>
            <tr key={v4()}>
            <td>{st.trip_id}</td>
            <td>{st.stop_id}</td>
            <td>{st.stop_detail ? st.stop_detail.stop_name : ''}</td>
            <td>{st.arrival_time}</td>
            <td>{st.departure_time}</td>
            <td>{st.stop_detail ? st.stop_detail.stop_lat : ''}</td>
            <td>{st.stop_detail ? st.stop_detail.stop_lon : ''}</td>
            </tr>
          )}
          </tbody>
          </Table>
        )
    } else {
      return (
        <h1>No Results</h1>
      )
    }
  }
}

StopTime = connect(mapStateToProps, actions)(StopTime);
export default StopTime;
