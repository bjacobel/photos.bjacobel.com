import {
  GET_PHOTOS_SUCCEEDED,
  GET_PHOTOS_FAILED
} from '../actions/photos';

import {
  smallUrl,
  smallHeight,
  smallWidth,
  fullUrl
} from '../constants/flickr';

const photos = (state = [], action) => {
  switch (action.type) {
  case GET_PHOTOS_SUCCEEDED:
    return action.payload.photos.map((el) => {
      return {
        src: el[smallUrl],
        width: parseInt(el[smallWidth], 10),
        height: parseInt(el[smallHeight], 10),
        aspectRatio: parseInt(el[smallWidth], 10) / parseInt(el[smallHeight], 10),
        lightboxImage: {
          src: el[fullUrl],
          caption: el.description._content
        },
        id: el.id
      };
    });
  case GET_PHOTOS_FAILED:
    return {
      error: action.payload.err.stack
    };
  default:
    return state;
  }
};

export default photos;
