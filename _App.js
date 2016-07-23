import React from 'react';
import ReactDom from 'react-dom';
import Papa from 'papaparse';

// Papa.parse('../data/ stop_times.txt', {
//   download: true,
//   header: true,
//   complete: function(results) {
//     // let stops = {}
//     // results.data.forEach((stop) => {
//     //   stops[stop.stop_id] = stop;
//     // })
//     console.log(results.data);
//   }
// })


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
    fetch('./data/stops.json').then(res => res.json())
      .then(data => {
        var stops = {};
        stops = data;
      })
      .catch(e => console.log('Booo'))
      .then( () => {
        var arrival_var  = '1093S'
        var dest_var  = '1084S'
        fetch('./data/stop_times.json').then(res => res.json())
        .then(data => {
           let possible_trips = data.filter((strip) => {
            return strip.stop_id == arrival_var || strip.stop_id == dest_var;
          })

          let trip_match = possible_trips.reduce((valAnte, valActual, indice) => {
            let stop_id_key = valActual.stop_id == arrival_var ? 'arrival_stop' :
            'dest_stop';
            let stop_sequence_key = valActual.stop_id == arrival_var ? 'arrival_sequence' :
            'dest_sequence';

            if (!valAnte[valActual.trip_id]) {
              valAnte[valActual.trip_id] = {}
            }
            valAnte[valActual.trip_id][stop_id_key] = valActual.stop_id
            valAnte[valActual.trip_id][stop_sequence_key] = valActual.stop_sequence

            return valAnte
          },{});

          let full_trips = []

          Object.keys(trip_match).forEach(tm => {
            if (!trip_match[tm].arrival_stop || !trip_match[tm].dest_sequence) {
              delete trip_match[tm];
              return;
            }
            if (+trip_match[tm].arrival_sequence > +trip_match[tm].dest_sequence) {
              delete trip_match[tm];
              return
            }

            full_trips.push(data.filter(trip => {
              return trip.trip_id == tm &&
              +trip.stop_sequence >= +trip_match[tm].arrival_sequence &&
              +trip.stop_sequence <= +trip_match[tm].dest_sequence
            }))
          })
          console.log(full_trips[0][0]);
          this.setState({full_trips: full_trips[0][0]});
        })
      })

  }
  render() {
    return (
        <DestinationInput data={this.state.full_trips}>
        {this.state.full_trips.trip_id}
        </DestinationInput>
    )
  }
}

class DestinationInput extends React.Component {
  render() {
    return (
      <div>{this.props.data}</div>
    )

  }
}

ReactDom.render(<App/>, document.getElementById('app'));
