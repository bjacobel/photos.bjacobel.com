import {
  loadingStarted,
  loadingEnded
} from './loading';

import { getPhotos } from '../services/s3';

export const GET_PHOTOS_FAILED = 'GET_PHOTOS_FAILED';
export const GET_PHOTOS_SUCCEEDED = 'GET_PHOTOS_SUCCEEDED';

export const getPhotosSucceeded = (photos) => {
  return { type: GET_PHOTOS_SUCCEEDED, payload: { photos } };
};

export const getPhotosFailed = (err) => {
  return { type: GET_PHOTOS_FAILED, payload: { err }, error: true };
};

export const getPhotosAsync = (collName = null) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    return getPhotos(collName)
    .then((photos) => {
      dispatch(loadingEnded());
      dispatch(getPhotosSucceeded(photos));
    })
    .catch((err) => {
      dispatch(loadingEnded());
      dispatch(getPhotosFailed(err));
    });
  };
};
