import React from 'react';
import { shallow } from 'enzyme'  
import App from './App';

let wrapper

beforeEach(() => {
  wrapper = shallow(<App />)
})

describe('App  component', () => {

  it('App renders without crashing', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('App should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
})