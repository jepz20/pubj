import React from 'react';
import  { connect } from 'react-redux';
import * as actions from '../actions';
import { v4 } from 'node-uuid';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

const mapStateToProps = (state) => ({
    trip: state.trip,
  });

class StopTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { trip } = this.props;
    if (Object.keys(trip).length === 0) {
      return (
          <div></div>
      );
    };

    if (trip.stops) {
      const { stops, detail } = trip;
      const getDuration = (departure, arrival) => {
        if (!departure || !arrival) {
          return ' -- ';
        };

        let setDate = t => (
          new Date(

            //Default date, only used to properly substract dates
            1985, 10, 22,
            t.substring(0, 2),
            t.substring(3, 5),
            t.substring(6)
          )
        );

        const leftPadWithZeros = (str, len) => {
          str = str.toString();
          while (str.length < len) {
            str = '0' + str;
          };

          return str;
        };

        let diffMS = Math.abs(setDate(arrival) - setDate(departure));
        let difM = Math.floor(diffMS / 60 / 1000);
        let difS = Math.floor(diffMS / 1000) - (difM * 60);

        return `${leftPadWithZeros(difM, 2)}:${leftPadWithZeros(difS, 2)}`;
      };

      return (
        <Panel bsStyle="primary" header={`${detail.trip_id} - ${detail.trip_headsign}
          - Trip Duration: ${getDuration(detail.initialTime, detail.endTime)} Minutes`}>
          <Table responsive striped bordered condensed hover>
          <thead>
          <tr>
            <th>Stop Id</th>
            <th>Name</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Duration</th>
            <th>In Map</th>
          </tr>
          </thead>
          <tbody>
          {
            stops.map(st =>
              <tr key={v4()}>
                <td>{st.stop_id}</td>
                <td>{st.stop_detail ? st.stop_detail.stop_name : ''}</td>
                <td>{st.arrival_time}</td>
                <td>{st.departure_time}</td>
                <td>{getDuration(st.departure_time, st.arrival_time)}</td>
                <td>
                  <a
                    target="_blank"
                    href={`http://maps.google.com/?q=@${st.stop_detail.stop_lat},
                    ${st.stop_detail.stop_lon}`}>
                  View
                  </a>
                </td>
              </tr>
            )}
            </tbody>
            </Table>
        </Panel>
      );
    } else if (trip.error) {
      return (
        <h1>{trip.error}</h1>
      );
    }
  }
}

StopTime = connect(mapStateToProps, actions)(StopTime);
export default StopTime;
