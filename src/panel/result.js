import React from 'react';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';

class ResultDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loading: false,
      error: false,
    }
  }

  componentDidUpdate(old) {
    if (old.requestJSON === this.props.requestJSON 
      || this.props.requestJSON === null) {
      return;
    }

    this.setState({loading: true, error: false});
    const url = `${process.env.REACT_APP_API_URL}/visibility/search`;

    console.log(this.props.requestJSON);
    axios.post(url, JSON.parse(this.props.requestJSON)).then((response) => {
      console.log(response);
      this.setState({results: response.data.Opportunities})
    }).catch((error) => {
      console.log(error);
      this.setState({error: true, results: []})
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="result-spinner-container">
          <div style={{
            width: "60px",
            margin: "3rem auto",
          }}>
            <CircleLoader
              sizeUnit={"px"}
              size={60}
              color={"#33cfc0"}
              loading={true}
            />
          </div>
          <p>this might take a while...</p>
        </div>
      );
    } else if (this.state.error) {
      const onClick = () => {
        this.setState({error: false});
      }

      return (
        <div className="result-error-container">
          <span 
            className="result-error-close-btn" 
            onClick={onClick}
          >&times;</span>
          Didn't find any opportunities :(
        </div>
      );
    } else if (this.state.results && this.state.results.length > 0) {
      const rows = this.state.results.map(x => {
        const window = `${x.OpportunityWindow[0]} to ${x.OpportunityWindow[1]}`;
        return (
          <tr key={x.PlatformID}>
            <td>{x.PlatformID}</td>
            <td>{window}</td>
          </tr>
        );
      });

      console.log(rows);

      return (
        <div className="result-success-container">
          The following viewing opportunities were found:
          <table>
            <thead>
              <tr>
                <th>Satellite</th><th>Visibility Window</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ResultDisplay;
