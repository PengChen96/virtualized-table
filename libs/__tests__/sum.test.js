
import React from 'react';
import {sum, DOM} from './sum';
import { mount } from 'enzyme';

test('adds 1 + 2 to equal 3', () => {

  expect(sum(1, 2)).toBe(3);

});

test('测试文本内容', () => {

  const wrapper = mount(<DOM/>);
  expect(wrapper.find('.test_text').text()).toBe('文本内容');

});

test('测试元素个数', () => {

  const wrapper = mount(<DOM/>);
  // expect(wrapper.find('.test_bar').length).toBe(3);
  // expect(wrapper.find('.test_bar')).not.toHaveLength(4);
  expect(wrapper.find('.test_bar')).toHaveLength(3);

});

test('测试点击', () => {

  const testClick = jest.fn();
  const wrapper = mount(<DOM testClick={testClick}/>);
  wrapper.find('.test_click').simulate('click');
  expect(testClick).toBeCalled();

});
