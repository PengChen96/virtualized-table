
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.less';

const Grid = (props) => {

  let [grid, setGrid] = useState({

  });
  useEffect(() => {

    console.log(props);
    setGrid(props);

  }, [
    props.columns,
    props.dataSource
  ]);

  const _cellRender = (row, rowIndex, column, columnIndex) => {

    let value = row[column['key']];
    let width = column.width || 150;
    return <div className="v-grid-cell" style={{
      width: width,
      minWidth: width
    }}>
      {value}
    </div>;

  };

  return <>
    <div className="v-grid-container1" style={{height: 400}}>
      <div className="v-grid-main-container">
        {
          props.dataSource.map((row, rowIndex) => {
            return <div className="v-grid-row" key={rowIndex}>
              {
                props.columns.map((column, columnIndex) => {
                  return <div key={columnIndex}>
                    {
                      _cellRender(row, rowIndex, column, columnIndex)
                    }
                  </div>;
                })
              }
            </div>;
          })
        }
      </div>
      <div className="v-grid-left-columns-container">
        {
          props.dataSource.map((row, rowIndex) => {
            return <div className="v-grid-row" key={rowIndex}>
              {
                props.columns.map((column, columnIndex) => {
                  return <div key={columnIndex}>
                    {
                      _cellRender(row, rowIndex, column, columnIndex)
                    }
                  </div>;
                })
              }
            </div>;
          })
        }
      </div>
    </div>
  </>;

};

Grid.propTypes = {
  // 类型 header
  type: PropTypes.string
};

export default Grid;
