import {
  GET_PHOTOS_SUCCEEDED
} from '../actions/photos';

import flickrUrl from 'flickr-urls';

const photos = (state = [], action) => {
  switch (action.type) {
  case GET_PHOTOS_SUCCEEDED:
    return action.payload.photos.photos.photo.map((el) => {
      return {
        thumbnail: flickrUrl.getFarmUrl(Object.assign({}, el, { size: flickrUrl.IMG_SIZES.LARGE_1024 })),
        original: flickrUrl.getFarmUrl(Object.assign({}, el, { size: flickrUrl.IMG_SIZES.ORIGINAL })),
        id: el.id
      };
    });
  default:
    return state;
  }
};

export default photos;
