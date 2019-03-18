import React from 'react';
import DatePicker from './datepicker';
import SatellitePicker from './satellitepicker';
import ResultDisplay from './result';
import './panel.css';

function Panel(props) {
  const longStr = Math.round(props.coordinates.longitude * 1000) / 1000
  const latStr = Math.round(props.coordinates.latitude * 1000) / 1000

  return (
    <div className="panel-container">
      <div className="panel-header">Period of Interest</div>
      <div className="panel-row">
        <div className="panel-row-left">Start: </div>
        <div>
          <DatePicker 
            datetime = {props.timeInterval.startTime}
            onUpdate = {(moment) => props.onTimeUpdate(moment, "startTime")}
          />
        </div>
      </div>
      <div className="panel-row">
        <div className="panel-row-left">End: </div>
        <div>
          <DatePicker 
            datetime = {props.timeInterval.endTime}
            onUpdate = {(moment) => props.onTimeUpdate(moment, "endTime")}
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
        selected = {props.selectedSatellites}
        onChange = {props.onSatelliteUpdate}
      />
      <button 
        className="panel-search-btn"
        onClick={props.onSearchButtonClick}
      >
        Find viewing opportunities!
      </button>
      <ResultDisplay 
        requestJSON={props.requestJSON}
      />
    </div>
  )
}

export default Panel;
