import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPhotosAsync } from '../actions/photos.js';
import Error from './Error';

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
    this.props.getPhotosAsync(this.props.params.collection);
  }

  render() {
    const { photos } = this.props;

    if (photos.hasOwnProperty('error')) {
      return <Error error={ photos.error } />;
    }

    return (
      <div>
        { photos.map((el) => {
          return <img src={ el.thumb.url } key={ el.id } role="presentation" />;
        }) }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
