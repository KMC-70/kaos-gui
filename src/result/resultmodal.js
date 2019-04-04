import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';

import './resultmodal.css';

class ResultModal extends React.Component {
  constructor(props) {
    super(props);
    Modal.setAppElement('body');
  }

  renderRows() {
    const formatStr = "MMMM Do YYYY, h:mm:ss a";
    
    return this.props.results.map((x, i) => {
      const start = moment.unix(x.start_time).format(formatStr);
      const end = moment.unix(x.end_time).format(formatStr);
      const window = `${start} to ${end}`;
      return (
        <tr key={i}>
          <td>{x.PlatformName}</td>
          <td>{window}</td>
        </tr>
      );
    })
  }

  render() {
    const style = {
      content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      },
    };

    return (
      <Modal 
        isOpen={this.props.isOpen}
        contentLabel="Search Results"
        style={style}
      >
        <span
          className="result-modal-close-btn"
          onClick={this.props.onCloseButtonClick}
        >
          &times;
        </span>
        <div className="result-container">
          <div className="result-container-scroll">
            <h1>Viewing Opportunities</h1>
            <table>
              <thead>
                <tr>
                  <th>Satellite</th><th>Visibility Window</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ResultModal;
