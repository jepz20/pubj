 import React from 'react';
import ReactDom from 'react-dom'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0
    }
    this.update = this.update.bind(this);
  }
  update(e) {
    this.setState( {
      red: ReactDom.findDOMNode(this.refs.red.refs.inp).value
    })
  }
  render() {
    return (
      <div>
        <NumInput
          ref="red"
          min={0}
          max={255}
          step={1}
          val={+this.state.red}
          label="Blue"
          update={this.update}
        />
        {this.state.red}
        <br />
      </div>
    )
  }
}


class NumInput extends React.Component {
  render() {
    const label = this.props.label !== '' ?
    <label>{this.props.label}#{this.props.val}</label> : ''
    return (
      <div>
        <input
          ref="inp"
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.val}
          onChange={this.props.update}
        />
        {label}
      </div>
    );

  }
}

NumInput.propTypes = {
  label: React.PropTypes.string,
  val: React.PropTypes.number,
  step: React.PropTypes.number,
  update: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf(['number', 'range'])
}


NumInput.defaultProps = {
  min: 0,
  max: 0,
  step: 1,
  val: 0,
  label: '',
  type: 'range'
}


ReactDom.render(<App/>, document.getElementById('app'));
