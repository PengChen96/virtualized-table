
import React, {useEffect, useState, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import VTableContext from './context/VTableContext';
import MultiGrid from './MultiGrid';
import {isSupportSticky} from './utils/isSupportSticky';
import './styles/vtable.less';
import {sameType, classNames} from './utils/base';

const VTable = (props) => {

  let vtHeader = useRef(null);
  let vtBody = useRef(null);

  let [isSticky, setIsSticky] = useState(false);
  let [bodyScrollBarWidth, setBodyScrollBarWidth] = useState(0);
  useEffect(() => {
    let _isSticky = props.isSticky === undefined ? isSupportSticky() : props.isSticky;
    setIsSticky(_isSticky);
  }, [props.isSticky]);

  // 表头
  const getHeaderTitle = useMemo(() => {
    const {columns} = props;
    let headerData = [{}];
    columns.forEach((column) => {
      headerData[0][column.key || column.dataIndex] = column.title;
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
  // 获取body的滚动条宽度，然后去设置header的最后一列宽度
  const getBodyScrollBarWidth = ({ref}) => {
    if (ref && ref.current) {
      setBodyScrollBarWidth(ref.current.offsetWidth - ref.current.clientWidth);
    }
  };

  let spinning = sameType(props.loading, 'Object') ? props.loading.spinning : props.loading;
  return <>
    <VTableContext.Provider
      value={{
        onScroll,
        getBodyScrollBarWidth,
        isSticky: isSticky,
        headerTitle: getHeaderTitle,
        originDataSource: props.dataSource,
      }}
    >
      <div
        className={classNames('vt-table', props.wrapperClassName)}
        style={{height: props.visibleHeight}}
      >
        {
          !isSticky && <MultiGrid
            {...props}
            ref={vtHeader}
            type={'header'}
            className={classNames('vt-table-header', props.className)}
            visibleHeight={props.rowHeight || 40}
            minRowHeight={props.rowHeight}
            dataSource={getHeaderTitle}
            bodyScrollBarWidth={bodyScrollBarWidth}
          />
        }
        <MultiGrid
          {...props}
          ref={vtBody}
          type={'body'}
          mgClassName={'vt-table-body'}
          visibleHeight={!isSticky ? props.visibleHeight - (props.rowHeight || 40) : props.visibleHeight}
          minRowHeight={props.rowHeight}
          bodyScrollBarWidth={bodyScrollBarWidth}
        />
        {
          !spinning && props.dataSource.length < 1 ? <div className="vt-table-empty">
            <div style={{pointerEvents: 'auto'}}>
              {
                (props.locale && props.locale.emptyText) ? props.locale.emptyText : '暂无数据'
              }
            </div>
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
export default React.memo(VTable);
