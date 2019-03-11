import React from 'react';
import moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import './datepicker.css';

function DatePicker(props) {
  const shortcuts = {
    'Today': moment(),
    'Yesterday': moment().subtract(1, 'days'),
    'Clear': ''
  };
  
  return (
    <DatetimePickerTrigger
      shortcuts={shortcuts} 
      moment={props.datetime}
      onChange={props.onUpdate}
    >
      <input 
        type="text" 
        value={props.datetime.format('YYYY-MM-DD HH:mm')} 
        readOnly 
      />
    </DatetimePickerTrigger>
  );
}

export default DatePicker;
