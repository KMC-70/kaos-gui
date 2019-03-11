import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios'

import './App.css';

import Map from './map/map.js';
import Panel from './panel/panel.js';

class App extends Component {
  constructor(props) {
    super(props);

    // initialize the state
    this.state = {
      longitude: -123.250,
      latitude: 49.2623,
      startTime: moment(),
      endTime: moment().add(1, 'days'),
      result: null,
    }
  }

  onMapClick = (clickEvent) => {
    const [longitude, latitude] = clickEvent.lngLat;
    this.setState({
      longitude: longitude,
      latitude: latitude
    })
  }

  onTimeUpdate = (moment, startOrEnd) => {
    this.setState({
      [startOrEnd]: moment,
    });
  }

  onSearchButtonClick = () => {
    const startTime = moment.utc(this.state.startTime).format();
    const endTime = moment.utc(this.state.endTime).format();

    // moment formats the times with a "Z" at the end to indicate UTC time
    // we need to get rid of that before POSTing the request

    const request = JSON.stringify({
      "POI": {
        "startTime": startTime.slice(0, startTime.length - 1),
        "endTime": endTime.slice(0, startTime.length - 1),
      },
      "Target": [
        this.state.longitude, this.state.latitude
      ],
    });

    // post this to ptsv2 as a test
    const url = "http://ptsv2.com/t/apcgf-1552269155/post"
    axios.post(url, request).then((response) => {
      console.log(response);
      alert(request);
    }, (error) => {
      console.log(error);
      alert(request);
    });
  }

  render() {
    return (
      <div className="app">
        <div className="mapBox">
          <Map 
            longitude = {this.state.longitude}
            latitude = {this.state.latitude}
            onClick = {this.onMapClick}
          />
        </div>
        <div className="panelBox">
          <Panel 
            longitude = {this.state.longitude}
            latitude = {this.state.latitude}
            startTime = {this.state.startTime}
            endTime = {this.state.endTime}
            onTimeUpdate = {this.onTimeUpdate}
            onSearchButtonClick = {this.onSearchButtonClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
