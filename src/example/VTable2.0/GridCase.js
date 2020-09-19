/**
 * Created by Administrator on 2019/10/20.
 */

import React from 'react';
import {Grid} from '../../../libs/VTable2.0';
import {
  Select,
  Switch
} from '../../components';
const { Option } = Select;

class GridCase extends React.Component {

  constructor () {
    super();
    this.state = {
      dataSource: [],
      footerColumnData: [],
      // 参数设置
      __bordered: true,
      __loading: false,
      __pointerEventDisabled: false
    };
  }

  componentDidMount() {
    this.getList(50);
  }

  getColumns(num = 1) {
    let columns = [{
      key: 'id',
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
        if (rowIndex === 4) {
          val = 3;
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
        if (rowIndex === 4) {
          val = 0;
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
        if (rowIndex === 4) {
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
        // ellipsis: true,
        render: (value) => {
          return <span>{value}</span>;
        }
      });
    }
    return columns;
  }

  getList(num = 1, colNum = 25) {

    let list = [];
    for (let i = 0; i < num; i++) {
      let rowObj = {
        id: i,
        mergeColumn: '合并列'
      };
      for (let j = 0; j < colNum; j++) {
        rowObj[`title${j}`] = `内容${j}`;
        // rowObj[`title${j}`] = i % 10 === 0 ? '绝对是分开发的口复上课都会发生的看法和速度快水电费快递师傅看电视' : i;
        if (i < 5) {
          rowObj.selectionDisable = true;
        }
      }
      list.push(rowObj);
    }
    this.setState({
      dataSource: list
    });

  };

  // 设置参数
  switchSetting(key) {

    this.setState({
      [key]: !this.state[key]
    });

  };

  render() {
    const {
      dataSource,
      __bordered,
    } = this.state;
    // let columnData = [{ title0: '内容'}];
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
          <label style={{paddingLeft: 16}}>
            <span>边框(bordered)：</span>
            <Switch checked={__bordered} onChange={() => this.switchSetting('__bordered')} />
          </label>
        </div>
        <br/>
        <Grid
        // 表格样式类名
          className="my-custom-class"
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={__bordered}
          //
          fixedLeftColumnCount={2}
          fixedRightColumnCount={1}
          onSelectAll={this.onSelectAll}
          onSelect={this.onSelect}
          onCellTap={this.onCellTap}
          onRowRemove={this.onRowRemove}
          visibleHeight={400}
          minRowHeight={40}
          emptyText={<div>未查询到数据</div>}
        />
      </>
    );
  }

}

export default GridCase;
