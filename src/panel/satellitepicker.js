import React from 'react';
import Select from 'react-select';
import axios from 'axios'

class SatellitePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      satellites: [],
      loaded: false,
    }

    this.getSatellites();
  }

  /**
   * Fetch satellites from remote URL.
   */
  getSatellites() {
    const url = `${process.env.REACT_APP_API_URL}/satellite`;

    const parse = (response) => {
      return response.data.map(x => {
        return {
          value: x.id,
          label: x.name,
        }
      });
    }

    axios.get(url).then((response) => {
      console.log(response);
      this.setState({
        satellites: parse(response),
        loaded: true,
      });
    }, (error) => {
      console.log(error);
      this.setState({
        satellites: [],
        loaded: true,
      });
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <Select
          value={this.props.selected}
          onChange={this.props.onChange}
          options={this.state.satellites}
          isMulti={true}
          placeholder="Choose satellites"
        />
      );
    } else {
      return (
        <Select
          isDisabled={true}
          placeholder="Fetching satellites..."
        />
      );
    }
  }
}

export default SatellitePicker;
