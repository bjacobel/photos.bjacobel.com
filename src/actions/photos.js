import {
  loadingStarted,
  loadingEnded
} from './loading';
import {
  getAllPhotos,
  getCollectionIdFromName,
  getPhotosFromCollection
} from '../services/flickr';

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

    if (collName !== null) {
      return getCollectionIdFromName(collName)
        .then((id) => {
          getPhotosFromCollection(id)
          .then((photos) => {
            dispatch(loadingEnded());
            dispatch(getPhotosSucceeded(photos));
          })
          .catch((err) => {
            dispatch(loadingEnded());
            dispatch(getPhotosFailed(err));
          });
        })
        .catch((err) => {
          dispatch(loadingEnded());
          dispatch(getPhotosFailed(err));
        });
    }
    // else
    return getAllPhotos()
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
