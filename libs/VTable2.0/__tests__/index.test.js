import React from 'react';
import { mount, render } from 'enzyme';
import Grid from '../Grid';

// 列
let columns = (num = 25) => {
  let columns = [{
    // key: 'id',
    dataIndex: 'id',
    title: '复选框',
    width: 150,
    align: 'center'
  }, {
    key: 'mergeColumn',
    title: '合并列',
    width: 150,
    align: 'center',
    colSpan: (rowIndex) => {
      let val = 1;
      if (rowIndex === 1) {
        val = 2;
      }
      return val;
    }
  }, {
    key: 'mergeColumn',
    title: '合并列',
    width: 150,
    align: 'center',
    colSpan: (rowIndex) => {
      let val = 1;
      if (rowIndex === 1) {
        val = 0;
      }
      return val;
    }
  }];
  for (let i = 0; i < num; i++) {
    columns.push({
      key: 'title' + i,
      title: '标题列' + i,
      width: 150,
      render(value){
        return <span>{value}</span>;
      }
    });
  }
  return columns;
};
// 数据
let dataSource = (num = 1, colNum = 250) => {

  let list = [];
  for (let i = 0; i < num; i++) {
    let rowObj = {id: i};
    for (let j = 0; j < colNum; j++) {
      rowObj[`title${j}`] = `内容${j}`;
      if (i < 5) {
        rowObj.selectionDisable = true;
      }
    }
    list.push(rowObj);
  }
  return list;

};

//
describe('Grid render', () => {

  test('渲染正常', () => {
    const wrapper = render(
      <Grid/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('渲染Grid正常', () => {
    const wrapper = mount(
      <Grid
        columns={columns()}
        dataSource={dataSource()}
      />,
    );
    wrapper.find('.vt-grid-container').simulate('scroll');
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('渲染Grid border 文本align正常', () => {
    const wrapper = mount(
      <Grid
        columns={columns()}
        dataSource={dataSource()}
        bordered={true}
      />,
    );
    expect(
      wrapper
        .find('.vt-grid-cell')
        .at(0)
        .hasClass('vt-bordered'),
    ).toBe(true);
    expect(
      wrapper
        .find('.vt-grid-cell')
        .at(0)
        .hasClass('vt-align-center'),
    ).toBe(true);
  });

});

// 函数
describe('Grid Func', () => {

  test('点击单元格cell', () => {
    let cellTap = jest.fn();
    let wrapper = mount(
      <Grid
        columns={columns()}
        dataSource={dataSource()}
        onCellTap={cellTap}
      />
    );
    wrapper.find('.vt-grid-cell').at(0).simulate('click');
    expect(cellTap).toBeCalled();
  });

});
