export const apiKey = '269530467e71aee6baa566a8c7a104b8';
export const userId = '28268415@N08';
export const baseUrl = 'https://api.flickr.com/services/rest/?';

export const smallUrl = 'url_z';
export const smallHeight = 'height_z';
export const smallWidth = 'width_z';
export const fullUrl = 'url_o';
export const fullHeight = 'height_o';
export const fullWidth = 'width_o';

export const baseParams = {
  api_key: apiKey,
  extras: `${smallUrl},${fullUrl},description`,
  format: 'json',
  per_page: 500,
  nojsoncallback: 1,
  user_id: userId
};
