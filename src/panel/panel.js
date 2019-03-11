import React from 'react';
import DatePicker from './datepicker';

function Coordinates(props) {
  return (
    <div className="panel-coords">
      X: {props.longitude}, Y: {props.latitude}
    </div>
  );
}

function VisibilitySearch(props) {
  return (
    <button 
      className="panel-search-btn"
      onClick={props.onClick}
    >
      Search for visibility!
    </button>
  )
}

function Panel(props) {
  const longStr = Math.round(props.longitude * 1000) / 1000
  const latStr = Math.round(props.latitude * 1000) / 1000

  return (
    <div className="panel-container">
      Start: <DatePicker 
        datetime = {props.startTime}
        onUpdate = {(moment) => props.onTimeUpdate(moment, "startTime")}
      />
      End: <DatePicker 
        datetime = {props.endTime}
        onUpdate = {(moment) => props.onTimeUpdate(moment, "endTime")}
      />
      <Coordinates 
        longitude = {longStr}
        latitude = {latStr}
      />
      <VisibilitySearch
        onClick = {props.onSearchButtonClick}
      />
    </div>
  )
}

export default Panel;
