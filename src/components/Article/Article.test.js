import React from 'react';
import { shallow } from 'enzyme'  
import Article from './Article'

let wrapper

let info ={imageUrl: 'test url', url: 'test.com', title:'test title', summary: 'test article summary', primary_image: [], authors: [] }

beforeEach(() => {
  wrapper = shallow(<Article info = {info}/>)
})

describe('Article  component', () => {

  it('Should render an article', () => {
    expect(wrapper.find('.article').length).toEqual(1);
  });

  it('should render an image', () => {
   expect(wrapper.find('img').length).toEqual(1);
  });

  it('should render summary', () => {
   expect(wrapper.find('.summary').length).toEqual(1);
  });

  it('should render a title', () => {
    expect(wrapper.find('a').text()).toEqual('test title');
   });
})