import React from 'react';
import Select from 'react-select';

function SatellitePicker(props) {
  if (props.loading) {
    return (
      <Select
        isDisabled={true}
        placeholder="Fetching satellites..."
      />
    );
  } else {
    return (
      <Select
        value={props.selected}
        onChange={props.onChange}
        options={props.satellites}
        isMulti={true}
        placeholder="Choose satellites"
      />
    );
  }
}

export default SatellitePicker;
