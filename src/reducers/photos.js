import {
  GET_PHOTOS_SUCCEEDED,
  GET_PHOTOS_FAILED
} from '../actions/photos';

const photos = (state = [], action) => {
  switch (action.type) {
  case GET_PHOTOS_SUCCEEDED:
    return action.payload.photos.map((el) => {
      return {
        thumb: {
          url: el.url_c,
          height: parseInt(el.height_c, 10),
          width: parseInt(el.width_c, 10)
        },
        original: {
          url: el.url_o,
          height: parseInt(el.height_o, 10),
          width: parseInt(el.width_o, 10)
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
