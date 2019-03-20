import React from 'react';
import axios from 'axios';
import moment from 'moment';

import DatePicker from './datepicker';
import SatellitePicker from './satellitepicker';
import SearchButton from './searchbutton';

import './panel.css';

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: moment(),
      endTime: moment().add(1, 'days'),

      // satellite states
      satellites: [],
      satelliteMap: {},
      selectedSatellites: [],
      satelliteLoading: true,

      // search states
      searching: false,
      error: false,
    }

    this.getSatellites();
  }

  /**
   * Fetch a list of available satellites from the server. Called once on
   * component initialization.
   */
  getSatellites() {
    const url = `${process.env.REACT_APP_API_URL}/satellite`;
    axios.get(url).then((response) => {
      console.log(response);

      const satelliteMap = {};
      const satellites = response.data.map(x => {
        satelliteMap[x.id] = x.name;
        return {value: x.id, label: x.name};
      });

      this.setState({
        satellites: satellites,
        satelliteMap: satelliteMap,
      });
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      this.setState({satelliteLoading: false});
    });
  }

  clearError = () => {
    this.setState({error: false});
  }

  /**
   * Triggered when user updates the search start time.
   */
  onStartTimeUpdate = (moment) => {
    this.setState({startTime: moment});
  }

  /**
   * Triggered when user updates the search end time.
   */
  onEndTimeUpdate = (moment) => {
    this.setState({endTime: moment});
  }

  /**
   * Triggered when user selects or unselects satellites to use for search.
   */
  onSatelliteUpdate = (selection) => {
    this.setState({selectedSatellites: selection});
  }

  /**
   * POST the search request. Pass result back to the app.
   */
  onSearchButtonClick = () => {
    this.setState({searching: true, error: false});
    const url = `${process.env.REACT_APP_API_URL}/visibility/search`;

    // form the request
    const startTime = moment.utc(this.state.startTime).format();
    const endTime = moment.utc(this.state.endTime).format();
    const platforms = this.state.selectedSatellites.map(x => x.value);
    const requestData = {
      "POI": {
        "startTime": startTime.slice(0, startTime.length - 1),
        "endTime": endTime.slice(0, startTime.length - 1),
      },
      "Target": [
        this.props.longitude, this.props.latitude,
      ],
      "PlatformID": platforms.length > 0 ? platforms : null,
    }

    console.log(requestData);
    axios.post(url, requestData).then((response) => {
      console.log(response);
      if (response.data.Opportunities.length > 0) {
        // result will give a platform ID, but we want the satellite name
        response.data.Opportunities.forEach(x => {
          let name = this.state.satelliteMap[x.PlatformID];
          if (name == null) {
            name = `Satellite ${x.PlatformID}`;
          }
          x.PlatformName = name;
        });

        // call back to app with results
        this.props.onSearchSucceed(response.data.Opportunities);
      }
    }).catch((error) => {
      console.log(error);
      this.setState({error: true})
    }).finally(() => {
      this.setState({searching: false});
    });
  }

  render() {
    const longStr = Math.round(this.props.longitude * 1000) / 1000
    const latStr = Math.round(this.props.latitude * 1000) / 1000

    return (
        <div className="panel-container">
          <div className="panel-header">Period of Interest</div>
          <div className="panel-row">
            <div className="panel-row-left">Start: </div>
            <div>
              <DatePicker 
                datetime = {this.state.startTime}
                onUpdate = {this.onStartTimeUpdate}
              />
            </div>
          </div>
          <div className="panel-row">
            <div className="panel-row-left">End: </div>
            <div>
              <DatePicker 
                datetime = {this.state.endTime}
                onUpdate = {this.onEndTimeUpdate}
              />
            </div>
          </div>
          <div className="panel-header">Site Coordinates</div>
          <div className="panel-row">
            <div className="panel-row-left">X: {longStr}</div>
            <div>Y: {latStr}</div>
          </div>
          <div className="panel-header">Satellites</div>
          <SatellitePicker 
            satellites = {this.state.satellites}
            selected = {this.state.selectedSatellites}
            onChange = {this.onSatelliteUpdate}
            loading = {this.state.satelliteLoading}
          />
          <SearchButton
            isSearching = {this.state.searching}
            hasError = {this.state.error}
            clearError = {this.clearError}
            onSearchButtonClick = {this.onSearchButtonClick}
          />
        </div>
    );
  }
}

export default Panel;
