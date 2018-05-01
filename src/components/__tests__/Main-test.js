import React from 'react';
import { shallow } from 'enzyme';

import fetchPhotos from 'services/fetchPhotos';
import Main from 'components/Main';

jest.mock('services/fetchPhotos');

describe('main component', () => {
  beforeEach(() => {
    fetchPhotos.mockReturnValueOnce(Promise.resolve());
  });

  it('matches snapshot with no params', () => {
    expect(shallow(<Main match={{ params: {} }} />)).toMatchSnapshot();
  });
});
