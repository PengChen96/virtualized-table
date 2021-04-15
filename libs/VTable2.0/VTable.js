
import React, {useEffect, useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import VTableContext from './context/VTableContext';
import MultiGrid from './MultiGrid';
import {isSupportSticky} from './utils/isSupportSticky';
import './styles/vtable.less';
import {sameType} from "./utils/base";

const VTable = (props) => {

  let vtHeader = useRef(null);
  let vtBody = useRef(null);

  let [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    let _isSticky = props.isSticky === undefined ? isSupportSticky() : props.isSticky;
    setIsSticky(_isSticky);
  }, [props.isSticky]);

  // 表头
  const getHeaderTitle = useMemo(() => {
    const {columns} = props;
    let headerData = [{}];
    columns.forEach((column) => {
      headerData[0][column.key] = column.title;
    });
    return headerData;
  }, [props.columns]);

  const onScroll = (e) => {
    let scrollLeft = e && e.target && e.target.scrollLeft;
    if (vtHeader.current) {
      vtHeader.current.gridContainer.scrollLeft = scrollLeft;
    }
    // vtBody.current.scrollLeft = scrollLeft;
    // console.log(vtHeader.current);
    // console.log(vtHeader.current.scrollLeft, vtBody.current.scrollLeft);
    // [vtHeader, vtBody].forEach((vt) => {
    //   if(vt.current.gridContainer.scrollLeft !== scrollLeft) {
    //     vt.current.gridContainer.scrollLeft = scrollLeft;
    //   }
    // });
  };

  let spinning = sameType(props.loading, 'Object') ? props.loading.spinning : props.loading;
  return <>
    <VTableContext.Provider
      value={{
        onScroll,
        isSticky: isSticky,
        headerTitle: getHeaderTitle,
        originDataSource: props.dataSource
      }}
    >
      <div className={`vt-table ${props.wrapperClassName}`}>
        {
          !isSticky && <MultiGrid
            {...props}
            ref={vtHeader}
            type={'header'}
            className={`vt-table-header ${props.className}`}
            visibleHeight={props.rowHeight || 40}
            minRowHeight={props.rowHeight}
            dataSource={getHeaderTitle}
          />
        }
        <MultiGrid
          {...props}
          ref={vtBody}
          type={'body'}
          visibleHeight={!isSticky ? props.visibleHeight - (props.rowHeight || 40) : props.visibleHeight}
          minRowHeight={props.rowHeight}
        />
        {
          !spinning && props.dataSource.length < 1 ? <div className="vt-table-empty">
            {
              (props.locale && props.locale.emptyText) ? props.locale.emptyText : '暂无数据'
            }
          </div> : ''
        }
        {
          spinning ? <div className="vt-table-loading">
            {
              (props.loading && props.loading.spinningText) ? props.loading.spinningText : '数据加载中，请稍后...'
            }
          </div> : ''
        }
      </div>
    </VTableContext.Provider>
  </>;

};

VTable.propTypes = {
  loading: PropTypes.any,
  locale: PropTypes.object,
  wrapperClassName: PropTypes.string,
  rowHeight: PropTypes.number
};
export default VTable;
