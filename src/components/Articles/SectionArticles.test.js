import React from 'react';
import { shallow } from 'enzyme'  
import SectionArticles from './SectionArticles'
import axios from 'axios'


jest.mock('axios');


let app

beforeEach(() => {
   // app = shallow(<SectionArticles />)
})

describe('Section Articles  component', () => {

    it('calls componentDidMount', () => {
        jest.spyOn(SectionArticles.prototype, 'componentDidMount')
        const wrapper = shallow(<SectionArticles />)
        expect(SectionArticles.prototype.componentDidMount.mock.calls.length).toBe(1)
      })

    it('Should fetch list of articles', async () => {

        let res = { data: {
            data: [
                {uuid: 'asdas', title: 'test'}
            ],
            meta: {total: 10}
        } }

        axios.get.mockResolvedValue(res);
        const wrapper = shallow(<SectionArticles />)

        const response = await wrapper.instance().getArticles();

        expect(axios.get).toHaveBeenCalled();
       // expect(response.data.data).toEqual(res)

    });
  })
