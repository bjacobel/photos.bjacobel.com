import S3 from 'aws-sdk/clients/s3'; // eslint-disable-line import/order
import AWS from 'aws-sdk/global'; // eslint-disable-line import/order

import { COGNITO_POOL_ID, COGNITO_POOL_ROLE_ARN } from '../constants';

/**
 * Fetches photos from an S3 bucket
 * @param {string} prefix - the subfolder to look under
 * @returns {Promise}
 */
export default prefix => {
  AWS.Config.credentials = new AWS.CognitoIdentityCredentials(
    {
      RoleArn: COGNITO_POOL_ROLE_ARN,
      IdentityPoolId: COGNITO_POOL_ID,
    },
    { region: 'us-east-1' }
  );

  return AWS.Config.credentials.refreshPromise().then(() => {
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
};
