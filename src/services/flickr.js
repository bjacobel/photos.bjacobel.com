import { flickr } from '../constants';

import 'isomorphic-fetch';
import queryString from 'query-string';

export const getAllPhotos = () => {
  return fetch(
    flickr.baseUrl + queryString.stringify(
      Object.assign({}, flickr.baseParams, { method: 'flickr.people.getPublicPhotos' })
  )).then((response) => {
    return response.json();
  }).then((json) => {
    return json;
  });
};

export const getCollectionIdFromName = (collectionName) => {
  return new Promise((resolve) => {
    resolve();
  });
};

export const getPhotosFromCollection = (collectionId) => {
  return new Promise((resolve) => {
    resolve();
  });
};
