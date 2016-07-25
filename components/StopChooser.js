import React from 'react';
import { connect } from 'react-redux'
import * as actions  from '../actions';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const mapStateToProps = (state) => {
  return {
    stops: state.stops
  }
}

class StopChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { fetchStops } = this.props;
    fetchStops();
  }
  handleChange(e) {
    const { changeStopTimes } = this.props
    changeStopTimes(this.props.list_id, e.target.value);
  }
  render() {

    const { list_id, stops, label } = this.props;
    let input;
    return (
      <FormGroup controlId={list_id}>
        <ControlLabel>{label}</ControlLabel>
        {' '}
        <FormControl
        list={list_id}
        componentClass="select"
        name="browser"
        onChange={this.handleChange}
        ref={node => {
          input = node;
        }}
        >
        <option value=""></option>
        {stops.stops.map(stop =>
          <option key={stop.stop_id} value={stop.stop_id }>
          {stop.stop_name}
          </option>
        )}
        </FormControl>
      </FormGroup>
    )
  }
}

StopChooser = connect(mapStateToProps, actions)(StopChooser)
export default StopChooser;
