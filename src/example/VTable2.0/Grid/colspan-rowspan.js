/**
 * Created by Administrator on 2019/10/20.
 */

import React from 'react';
import {Grid} from '../../../../libs/VTable2.0';
import {Select} from '../../../components';
const { Option } = Select;

// 列数
const COLUMNS_NUM = 2;
class GridCase extends React.Component {

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
    let columns = [
      {
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
        render: (value) => {
          return <span>{value}</span>;
        }
      });
    }
    // 尾部合并列
    let colSp = 12;
    columns.push({
      key: 'mergeColumn',
      title: '合并列',
      width: 150,
      align: 'center',
      colSpan: (rowIndex) => {
        let val = 1;
        if (rowIndex === 6) {
          val = colSp;
        }
        return val;
      }
    });
    for (let i = 1; i < colSp; i++) {
      columns.push({
        key: 'mergeColumn',
        title: '合并列',
        width: 150,
        align: 'center',
        colSpan: (rowIndex) => {
          let val = 1;
          if (rowIndex === 6) {
            val = 0;
          }
          return val;
        }
      });
    }
    // 额外列
    columns.push({
      key: `title${num}`,
      dataIndex: `title${num}`,
      title: '额外列',
      width: 150,
      align: 'right'
    });
    return columns;
  }

  getList(num = 1, colNum = COLUMNS_NUM) {

    let list = [];
    for (let i = 0; i < num; i++) {
      let rowObj = {
        id: i,
        mergeColumn: '合并列'
      };
      for (let j = 0; j < colNum; j++) {
        rowObj[`title${j}`] = `内容${j}`;
      }
      rowObj[`title${colNum}`] = '额外加的最后一列';
      list.push(rowObj);
    }
    this.setState({
      dataSource: list
    });

  };

  render() {
    const {
      dataSource,
    } = this.state;
    let columns = this.getColumns(COLUMNS_NUM);
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
        <Grid
          // 列
          columns={columns}
          // 数据
          dataSource={dataSource}
          // 边框
          bordered={true}
          // 高度
          visibleHeight={400}
        />
      </>
    );
  }

}

export default GridCase;
