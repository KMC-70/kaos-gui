import React from 'react';
import { CircleLoader } from 'react-spinners';

class SearchButton extends React.Component {
  renderButton() {
    const style = this.props.isSearching
      ? {backgroundColor: "#a9a9a9", cursor: "not-allowed"}
      : null;

    const onClick = this.props.isSearching 
      ? null 
      : this.props.onSearchButtonClick;

    return (
      <button 
        className="panel-search-btn"
        style={style}
        onClick={onClick}
      >
        Find viewing opportunities!
      </button>
    );
  }

  renderLoader() {
    if (!this.props.isSearching) {
      return null;      
    }

    return (
      <div>
        <div style={{
          width: "60px",
          margin: "4rem auto 2rem",
        }}>
          <CircleLoader
            sizeUnit={"px"}
            size={60}
            color={"#33cfc0"}
            loading={true}
          />
        </div>
        <p>This might take a while...</p>
      </div>
    );
  }

  renderError() {
    if (this.props.errorMessage === null) {
      return null;
    }

    return (
      <div className="result-error-container">
        <span 
          className="result-error-close-btn" 
          onClick={this.props.clearError}
        >&times;</span>
      {this.props.errorMessage}
      </div>
    );
  }

  render() {
    return (
      <div className="panel-search">
        {this.renderButton()}
        {this.renderError()}
        {this.renderLoader()}
      </div>
    );
  }
}

export default SearchButton;
