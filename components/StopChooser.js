import React from 'react';
import { connect } from 'react-redux'
import * as actions  from '../actions';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Autocomplete from 'react-autocomplete';

let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

const mapStateToProps = (state) => {
  return {
    stops: state.stops
  }
}

class StopChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    const { fetchStops } = this.props;
    fetchStops();
  }
  handleChange(e, value) {
    this.setState({ value })
    const { changeStopTimes } = this.props
    changeStopTimes(this.props.list_id, e.target.value);
  }
  handleSelect(value) {
    this.setState({ value })
    const { changeStopTimes } = this.props
    changeStopTimes(this.props.list_id, value);
  }
  render() {

    const { list_id, stops, label } = this.props;
    const matchStop = (state, value) =>
      state.stop_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
        <Autocomplete
          value={this.state.value}
          inputProps={{name: "Stop", id: "stops-autocomplete"}}
          items={stops.stops}
          getItemValue={(item) => item.stop_name}
          shouldItemRender={matchStop}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.stop_id}
            >{item.stop_name}</div>
          )}
        />
      </FormGroup>
    )
  }
}

StopChooser = connect(mapStateToProps, actions)(StopChooser)
export default StopChooser;
