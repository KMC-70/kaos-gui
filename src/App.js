import React from 'react';

import Map from './map/map.js';
import Panel from './panel/panel.js';
import ResultModal from './result/resultmodal';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.apiURL = process.env.REACT_APP_API_URL;

    this.state = {
      longitude: -123.250,
      latitude: 49.2623,

      searchResults: [],
      showResults: false,
    }
  }

  onMapClick = (clickEvent) => {
    const [longitude, latitude] = clickEvent.lngLat;
    this.setState({
      longitude: longitude,
      latitude: latitude,
    })
  }

  onSearchSucceed = (result) => {
    this.setState({
      searchResults: result,
      showResults: true,
    });
  }

  closeResultsModal = () => {
    this.setState({showResults: false});
  }

  render() {
    return (
      <div className="app">
        <div className="map-box">
          <Map 
            longitude = {this.state.longitude}
            latitude = {this.state.latitude}
            onClick = {this.onMapClick}
          />
        </div>
        <div className="panel-box">
          <Panel 
            longitude = {this.state.longitude}
            latitude = {this.state.latitude}
            onSearchSucceed = {this.onSearchSucceed}
          />
        </div>
        <div>
          <ResultModal
            results = {this.state.searchResults}
            isOpen = {this.state.showResults}
            onCloseButtonClick = {this.closeResultsModal}
          />
        </div>
      </div>
    );
  }
}

export default App;
