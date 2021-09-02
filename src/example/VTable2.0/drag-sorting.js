/**
 * 使用react-dnd实现可伸缩列
 */

import React from 'react';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import Backend from 'react-dnd-html5-backend/lib/index';
import update from 'immutability-helper';
import {VTable} from '@libs/VTable2.0';
import {generateColumns, generateData} from '../common/utils';

import './drag-sorting.less';

const TYPE = 'DragbleBodyRow';
const DragableBodyRow = ({index, moveRow, className, style, ...restProps}) => {

  const ref = React.useRef();
  const [{isOver, dropClassName}, drop] = useDrop({
    accept: TYPE,
    collect: monitor => {
      const {index: dragIndex} = monitor.getItem() || {};
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

  constructor() {
    super();
    this.state = {
      dataNum: 0,
      columnsNum: 0,
      dataSource: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dataNum !== state.dataNum || props.columnsNum !== state.columnsNum) {
      return {
        dataNum: props.dataNum,
        columnsNum: props.columnsNum,
        dataSource: generateData(
          props.dataNum,
          props.columnsNum
        )
      };
    }
  }

  fetchData() {
    const {columnsNum, dataNum} = this.props;
    const dataSource = generateData(
      dataNum,
      columnsNum
    );
    this.setState({dataSource});
  }

  moveRow(dragIndex, hoverIndex) {
    console.log(dragIndex, '=>', hoverIndex);
    const {dataSource} = this.state;
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
    const {dataSource} = this.state;
    const {align, bordered, columnsNum} = this.props;
    const columns = generateColumns(
      columnsNum,
      {
        columnObj: () => {
          return {
            align,
          };
        }
      }
    );
    return (
      <>
        <h2>VTable drag sorting</h2>
        <DndProvider backend={Backend}>
          <VTable
            // 边框
            bordered={bordered}
            // 列
            columns={columns}
            // 数据
            dataSource={dataSource}
            // 可视区域高度
            visibleHeight={400}
            // 重写body row
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
