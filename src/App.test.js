  
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './client/App';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Run APP component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<App />);
    });

    it('renders an Input', () => {
      const app = shallow(<App />);
      expect(app.find('input').length).toEqual(2);
    });

    it('Simulate Change', () => {
      const app = shallow(<App />);
      app.simulate('change');
    });

    it('Do Snapshot', () => {
      const app = shallow(<App />);
      app.toMatchSnapShot();
    });

        


});
