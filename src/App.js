import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

import Map from './map/map.js';
import Panel from './panel/panel.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.apiURL = process.env.REACT_APP_API_URL;

    // initialize the state
    this.state = {
      coordinates: {
        longitude: -123.250,
        latitude: 49.2623,
      },
      timeInterval: {
        startTime: moment(),
        endTime: moment().add(1, 'days'),
      },
      satellites: {},
      selectedSatellites: [],
      requestJSON: null,
    }
  }

  onMapClick = (clickEvent) => {
    const [longitude, latitude] = clickEvent.lngLat;
    this.setState({
      coordinates: {
        longitude: longitude,
        latitude: latitude
      }
    })
  }

  onTimeUpdate = (moment, startOrEnd) => {
    const old = this.state.timeInterval;
    this.setState({
      timeInterval: {
        ...old,
        [startOrEnd]: moment,
      }
    });
  }

  onSatelliteUpdate = (selection) => {
    this.setState({
      selectedSatellites: selection,
    })
  }

  onSearchButtonClick = () => {
    const startTime = moment.utc(this.state.timeInterval.startTime).format();
    const endTime = moment.utc(this.state.timeInterval.endTime).format();
    const platformID = this.state.selectedSatellites.map(x => x.value);

    // note: moment formats the times with a "Z" at the end to mean "UTC time"
    // we need to get rid of that before POSTing the request
    const request = {
      "POI": {
        "startTime": startTime.slice(0, startTime.length - 1),
        "endTime": endTime.slice(0, startTime.length - 1),
      },
      "Target": [
        this.state.coordinates.longitude, this.state.coordinates.latitude
      ],
      "PlatformID": platformID.length ? platformID : null,
    };

    this.setState({requestJSON: JSON.stringify(request)});
  }

  render() {
    return (
      <div className="app">
        <div className="map-box">
          <Map 
            longitude = {this.state.coordinates.longitude}
            latitude = {this.state.coordinates.latitude}
            onClick = {this.onMapClick}
          />
        </div>
        <div className="panel-box">
          <Panel 
            coordinates = {this.state.coordinates}
            timeInterval = {this.state.timeInterval}
            selectedSatellites = {this.state.selectedSatellites}
            onTimeUpdate = {this.onTimeUpdate}
            onSearchButtonClick = {this.onSearchButtonClick}
            onSatellitesFetched = {this.onSatellitesFetched}
            onSatelliteUpdate = {this.onSatelliteUpdate}
            requestJSON = {this.state.requestJSON}
          />
        </div>
      </div>
    );
  }
}

export default App;
