import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPhotosAsync } from '../actions/photos.js';

const mapStateToProps = (state) => {
  return {
    photos: state.photos
  };
};

const mapDispatchToProps = {
  getPhotosAsync
};

class Main extends Component {
  componentWillMount() {
    this.props.getPhotosAsync();
  }

  render() {
    const { photos } = this.props;

    return (
      <div>
        { photos.map((el) => {
          return <img src={ el.thumbnail } key={ el.id } role="presentation" />;
        }) }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
