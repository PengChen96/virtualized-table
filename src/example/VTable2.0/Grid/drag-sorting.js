/**
 * Created by Administrator on 2019/10/20.
 */

import React from 'react';
import {VTable} from '../../../../libs/VTable2.0';
import {
  Select
} from '../../../components';
import {generateColumns, generateData} from '../../common/utils';
import {useDrag, useDrop} from 'react-dnd';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend/lib/index';
import update from 'immutability-helper';
const { Option } = Select;

import './drag-sorting.less';

const TYPE = 'DragbleBodyRow';
const DragableBodyRow = ({index, moveRow, className, style, ...restProps}) => {

  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: TYPE,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [{isDragging}, drag] = useDrag({
    item: {
      type: TYPE,
      index: index
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      className={`${className} dragble-body-row${isOver ? dropClassName : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        ...style
      }}
      {...restProps}
    />
  );

};

class DragSortingCase extends React.Component {

  constructor () {
    super();
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.getList(50);
  }

  getColumns(num = 1) {
    return generateColumns(num);
  }

  getList(num = 1, colNum = 25) {

    this.setState({
      dataSource: generateData(num, colNum)
    });

  };

  moveRow(dragIndex, hoverIndex) {
    console.log(dragIndex, '=>', hoverIndex);
    const { dataSource } = this.state;
    const dragRow = dataSource[dragIndex];
    this.setState(
      update(this.state, {
        dataSource: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        },
      }),
      () => {
        console.log(this.state.dataSource);
      }
    );
  }

  render() {
    const {
      dataSource
    } = this.state;
    let columns = this.getColumns(25);
    return (
      <>
        <div>
          <label>
            <span>表格数据/条：</span>
            <Select defaultValue={50} style={{ width: 120 }} onChange={(value) => this.getList(value)}>
              <Option value={0}>0 条</Option>
              <Option value={50}>50 条</Option>
              <Option value={500}>500 条</Option>
              <Option value={5000}>5000 条</Option>
              <Option value={10000}>10000 条</Option>
              <Option value={50000}>50000 条</Option>
            </Select>
          </label>
        </div>
        <br/>
        <DndProvider backend={Backend}>
          <VTable
            // 可视区域高度
            visibleHeight={400}
            // 表格样式类名
            className="my-custom-class"
            // 列
            columns={columns}
            // 数据
            dataSource={dataSource}
            // 边框
            bordered={true}
            // 覆盖grid row元素
            components={{
              body: {
                row: DragableBodyRow
              }
            }}
            // 设置行属性
            onRow={(record, index) => {
              return ({
                index,
                moveRow: this.moveRow.bind(this),
              });
            }}
          />
        </DndProvider>
      </>
    );
  }

}

export default DragSortingCase;
