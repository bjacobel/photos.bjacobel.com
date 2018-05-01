import React, { Component } from 'react';

import fetchPhotos from 'services/fetchPhotos';

import styles from '../stylesheets/main.css';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }

  componentWillMount() {
    const {
      match: {
        params: { album },
      },
    } = this.props;
    const prefix = `photos/${album || ''}`;
    fetchPhotos(prefix);
  }

  render() {
    return (
      <div className={styles.wall}>
        {this.state.photos.map(photo => (
          <img
            key={photo.ETag + photo.LastModified}
            alt=""
            className={styles.brick}
            src={`https://photos.bjacobel.com/${photo.Key}`}
          />
        ))}
      </div>
    );
  }
}
