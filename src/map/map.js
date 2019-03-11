import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import './mapbox-gl.css';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '100%',
        height: '100vh',
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: 3,
      }
    };
  }

  render() {
    const token = process.env.REACT_APP_MAP_API_KEY;

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={token}
        onViewportChange={(viewport) => this.setState({ viewport })}
        onClick={this.props.onClick}
        mapStyle="mapbox://styles/mapbox/outdoors-v9">
        <Marker
          latitude={this.props.latitude}
          longitude={this.props.longitude}
        >
          <div className='mapMarkerStyle' />
        </Marker>
      </ReactMapGL>
    );
  }
}
