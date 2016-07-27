import React from 'react';
import { connect } from 'react-redux';
import StopChooser from './StopChooser';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
  stops: state.stops,
});

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.executeFilter = this.executeFilter.bind(this);
  }

  executeFilter() {
    const { arrival, departure, stopsById, stops } = this.props.stops;
    const { fetchStopFilter } = this.props;
    let arrivalDetail = stops.filter(stop => stop.stop_name === arrival);
    let departureDetail = stops.filter(stop => stop.stop_name === departure);
    let arrivalId = arrivalDetail[0].stop_id;
    let departureId = departureDetail[0].stop_id;
    if (departureId && arrivalId) {
      fetchStopFilter(
        departureId,
        arrivalId,
        stopsById
      );
    }
  }

  render() {
    return (
      <Form inline>
      <StopChooser label="From" listId="departure"/>
      {' '}
      <StopChooser label="To" listId="arrival"/>
      <Button bsStyle="primary" onClick={this.executeFilter}>Search</Button>
    </Form>
    );
  }
}

Selection = connect(mapStateToProps, actions)(Selection);
export default Selection;
