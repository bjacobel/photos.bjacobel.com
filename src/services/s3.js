import AWSS3 from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk/global';

import { REGION, BUCKET, ID_POOL, ROLE_ARN } from '../constants/aws';

const getBucketContents = (collectionName) => {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: ID_POOL,
    RoleArn: ROLE_ARN
  });

  AWS.config.credentials.get();

  const S3 = new AWSS3({
    region: REGION,
    credentials: AWS.config.credentials.webIdentityCredentials
  });

  const S3params = {
    Bucket: BUCKET,
    Prefix: collectionName || '/'
  };

  return S3.listObjectsV2(S3params).promise();
};

const getAllPhotos = () => {
  return getBucketContents();
};

const getPhotosFromCollectionName = (collName) => {
  return getBucketContents(collName);
};

export const getPhotos = (collName) => {
  if (collName) {
    return getPhotosFromCollectionName(collName);
  } else {
    return getAllPhotos();
  }
};
