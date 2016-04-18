import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import photos from './photos';
import loading from './loading';

export default combineReducers({
  loading,
  routing: routerReducer,
  photos
});
