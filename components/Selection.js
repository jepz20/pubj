import React from 'react';
import { connect } from 'react-redux';
import StopChooser from './StopChooser';
import Form from 'react-bootstrap/lib/Form'
import Button from 'react-bootstrap/lib/Button'
import * as actions from '../actions';

const mapStateToProps = (state) => {
  return {
    stops: state.stops
  }
}

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.executeFilter = this.executeFilter.bind(this);
  }
  executeFilter() {
    const { arrival, departure, stopsById } = this.props.stops
    const { fetchStopFilter } = this.props
    if (arrival && departure) {
      fetchStopFilter(
        departure.split('-')[0].trim(),
        arrival.split('-')[0].trim(),
        stopsById
      );
    }
  }
  render() {
    return (
      <Form inline>
      <StopChooser label="From" list_id="departure"/>
      {' '}
      <StopChooser label="To" list_id="arrival"/>
      <Button bsStyle="primary" onClick={this.executeFilter}>Search</Button>
    </Form>
    )
  }
}
Selection = connect(mapStateToProps, actions)(Selection)
export default Selection;
