import React, { Component } from 'react';
import S3 from 'aws-sdk/clients/s3'; // eslint-disable-line import/order
import AWS from 'aws-sdk/global'; // eslint-disable-line import/order

import styles from '../stylesheets/main.css';
import { COGNITO_POOL_ID, COGNITO_POOL_ROLE_ARN } from '../constants';

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

    AWS.Config.credentials = new AWS.CognitoIdentityCredentials(
      {
        RoleArn: COGNITO_POOL_ROLE_ARN,
        IdentityPoolId: COGNITO_POOL_ID,
      },
      { region: 'us-east-1' }
    );

    AWS.Config.credentials.refreshPromise().then(() => {
      const s3client = new S3({
        credentials: AWS.Config.credentials.webIdentityCredentials,
      });
      s3client
        .listObjectsV2({
          Prefix: prefix,
          Bucket: 'photos.bjacobel.com',
        })
        .promise()
        .then(data => {
          this.setState({
            photos: data.Contents.sort(
              (photo1, photo2) =>
                new Date(photo1.LastModified).getTime() - new Date(photo2.LastModified).getTime()
            ),
          });
        });
    });
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
