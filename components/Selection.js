import React from 'react';
import { connect } from 'react-redux';
import StopChooser from './StopChooser';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Radio from 'react-bootstrap/lib/Radio';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
  stops: state.stops,
});

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pickedDay: 'weekday' };
    this.executeFilter = this.executeFilter.bind(this);
    this.handlePickDay = this.handlePickDay.bind(this);
  }

  executeFilter() {
    const { arrival, departure, stopsById, stops } = this.props.stops;
    const { fetchStopFilter } = this.props;
    const { pickedDay } = this.state
    if (!arrival || !departure) return;
    let arrivalDetail = stops.filter(stop => stop.stop_name === arrival);
    let departureDetail = stops.filter(stop => stop.stop_name === departure);
    if (arrivalDetail.length === 0 || departureDetail === 0) return;
    let arrivalId = arrivalDetail[0].stop_id;
    let departureId = departureDetail[0].stop_id;
    if (departureId && arrivalId) {
      fetchStopFilter(
        departureId,
        arrivalId,
        stopsById,
        pickedDay
      );
    }
  }

  handlePickDay(e) {
    this.setState({ pickedDay: e.target.value });
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup controlId="dayPick">
            <ControlLabel>Pick a Day</ControlLabel>
            {' '}
            <Radio
              inline
              name="day"
              defaultChecked
              value="weekday"
              onChange = {this.handlePickDay}
            >
              Weekdays
            </Radio>
            {' '}
            <Radio
              inline
              name="day"
              value="saturday"
              onChange = {this.handlePickDay}
            >
            Saturday
            </Radio>
            {' '}
            <Radio
              inline
              name="day"
              value="sunday"
              onChange = {this.handlePickDay}
            >
            Sunday
            </Radio>
          </FormGroup>
        </Form>
        <Form inline>
          <FormGroup>
            <StopChooser label="Departure" listId="departure"/>
            {' '}
            <StopChooser label="Arrival" listId="arrival"/>
            <Button bsStyle="primary" onClick={this.executeFilter}>Search</Button>
          </FormGroup>
          </Form>

      </div>
    );
  }
}

Selection = connect(mapStateToProps, actions)(Selection);
export default Selection;
