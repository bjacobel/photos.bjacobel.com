import { flickr } from '../constants';

import 'isomorphic-fetch';
import queryString from 'query-string';

const getAllPhotos = () => {
  return fetch(
    flickr.baseUrl + queryString.stringify(
      Object.assign({}, flickr.baseParams, {
        method: 'flickr.people.getPublicPhotos'
      })
    )
  ).then((response) => {
    return response.json();
  }).then((json) => {
    return json.photos.photo;
  });
};

const getCollectionPhotos = (collId) => {
  return fetch(
    flickr.baseUrl + queryString.stringify(
      Object.assign({}, flickr.baseParams, {
        method: 'flickr.photosets.getPhotos',
        photoset_id: collId
      })
    )
  ).then((response) => {
    return response.json();
  }).then((json) => {
    return json.photoset.photo;
  });
};

const getCollectionIdFromName = (collName) => {
  return fetch(
    flickr.baseUrl + queryString.stringify(
      Object.assign({}, flickr.baseParams, {
        method: 'flickr.photosets.getList'
      })
    )
  ).then((response) => {
    return response.json();
  }).then((json) => {
    for (const el of json.photosets.photoset) {
      const collRegex = new RegExp(collName, 'i');
      if (el.title._content.match(collRegex) !== null) {
        return el.id;
      }
    }
    throw new Error(`No collection with name ${collName} exists.`);
  });
};

const getPhotosFromCollectionName = (collName) => {
  return getCollectionIdFromName(collName)
  .then((collId) => {
    return getCollectionPhotos(collId);
  })
  .then((photos) => {
    return photos;
  });
};

export const getPhotos = (collName) => {
  if (collName === null) {
    return getAllPhotos();
  } // else
  return getPhotosFromCollectionName(collName);
};
