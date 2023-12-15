import React, {useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import {deepClone} from './utils/deepClone';
import {classNames} from './utils/base';
import './styles/multi-grid.less';
import VTableContext from './context/VTableContext';

const MultiGrid =  (props, ref) => {

  const _multiGridContainer = useRef(null);
  // 要向父VTable暴露的
  const multiGridContainer = useRef(null);
  useImperativeHandle(ref, () => ({
    // multiGridContainer: multiGridContainer.current,
    gridContainer: multiGridContainer.current.gridContainer
  }));
  //
  const {
    type,
    mgClassName,
    shouldRowHeightSync,
    columns,
    hasFixed,
    dataSource,
    fixedLeftColumnCount = 0,
    fixedRightColumnCount = 0,
    bodyScrollBarWidth,
    bodyScrollBarHeight,
  } = props;
  //
  const multiGridContainerLeft = useRef(null);
  const multiGridContainerRight = useRef(null);

  const _VTableContext = useContext(VTableContext);

  // let [rowsHeightCacheId, setRowsHeightCacheId] = useState([]);
  let [rowsHeightArr, setRowsHeightArr] = useState([]);
  let [syncRowHeightTriggered, setSyncRowHeightTriggered] = useState(false);

  // 同步固定列的高度
  const syncRowHeightByScroll = function () {
    const timer = setTimeout(() => {
      const {current} = multiGridContainer;
      if (current.gridContainer && current.gridContainer.querySelector('.vt-grid-row')) {
        const t = setTimeout(() => {
          syncRowHeight('setState');
          clearTimeout(t);
        }, 50);
        setSyncRowHeightTriggered(false);
      } else {
        syncRowHeightByScroll();
      }
      clearTimeout(timer);
    }, 50);
  }

  useEffect(() => {
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && hasFixed) {
      setSyncRowHeightTriggered(true);
    }
  }, [columns, dataSource, hasFixed]);
  useEffect(() => {
    if (syncRowHeightTriggered) {
      syncRowHeightByScroll();
    }
  }, [syncRowHeightTriggered]);

  // main columns
  const getColumns = useMemo(() => {
    if (!hasFixed) {
      return columns;
    }
    const end = fixedRightColumnCount ? -fixedRightColumnCount : undefined;
    return (fixedLeftColumnCount || fixedRightColumnCount) ? deepClone(columns).slice(fixedLeftColumnCount, end) : columns;
  }, [hasFixed, columns, fixedLeftColumnCount, fixedRightColumnCount]);

  // fixed left columns
  const getFixedLeftColumns = useMemo(() => {
    if (!hasFixed) { return []; }
    let fixedLeftColumns = fixedLeftColumnCount ? columns.slice(0, fixedLeftColumnCount) : [];
    return formatFixedLeftColumns({fixedLeftColumns});
  }, [hasFixed, columns, fixedLeftColumnCount]);

  // fixed right columns
  const getFixedRightColumns = useMemo(() => {
    if (!hasFixed) { return []; }
    let fixedRightColumns = fixedRightColumnCount ? columns.slice(-fixedRightColumnCount) : [];
    return formatFixedRightColumns({fixedRightColumns, columnsLength: columns.length});
  }, [hasFixed, columns, fixedRightColumnCount]);

  // 未使用sticky的主内容列
  const mainColumns = useMemo(
    () => [...getFixedLeftColumns, ...getColumns, ...getFixedRightColumns],
    [getFixedLeftColumns, getColumns, getFixedRightColumns]
  );
  //
  const onScrollTopSync = useCallback((e) => {
    const scrollTop = e && e.target && e.target.scrollTop;
    // window.requestAnimationFrame(() => {
    const {current: leftCurrent} = multiGridContainerLeft;
    const {current: rightCurrent} = multiGridContainerRight;
    //
    if (leftCurrent) {
      e.preventDefault();
      leftCurrent.gridContainer.scrollTop = scrollTop;
    }
    if (rightCurrent) {
      e.preventDefault();
      rightCurrent.gridContainer.scrollTop = scrollTop;
    }
    // });
    syncRowHeight('setState');
  }, []);
  // no isSticky
  const syncRowHeight = (syncType = 'setDomStyle') => {
    // 同步固定列的高度
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && hasFixed) {
      const multiGridCurrent = multiGridContainer.current;
      const gridRowCollection = multiGridCurrent.gridContainer.querySelectorAll('.vt-grid-row');
      // if (syncType === 'setDomStyle') {
      //   const multiGridContainerLeftCurrent = multiGridContainerLeft.current;
      //   const multiGridContainerRightCurrent = multiGridContainerRight.current;
      //   gridRowCollection.forEach((gridRowDom) => {
      //     const dataKey = gridRowDom.getAttribute('data-key');
      //     const leftRowDom = multiGridContainerLeftCurrent && multiGridContainerLeftCurrent.gridContainer.querySelector(`[data-key=${dataKey}]`);
      //     if (leftRowDom) leftRowDom.style.height = gridRowDom.clientHeight + 'px';
      //
      //     const rightRowDom = multiGridContainerRightCurrent && multiGridContainerRightCurrent.gridContainer.querySelector(`[data-key=${dataKey}]`);
      //     if (rightRowDom) rightRowDom.style.height = gridRowDom.clientHeight + 'px';
      //   });
      // }
      if (syncType === 'setState') {
        const gridRowHeightArr = Array.prototype.slice.call(gridRowCollection).map((item) => {
          return item.clientHeight;
        });
        setRowsHeightArr(gridRowHeightArr);
      }
    }
  };

  return <>
    <div className={classNames('vt-multi-grid-container', mgClassName)}
      ref={_multiGridContainer}>
      {
        _VTableContext.isSticky ? <Grid
          {...props}
          ref={multiGridContainer}
          // 加这个key是因为固定列变化 列数据多渲染一列 todo 原因
          key={`${fixedLeftColumnCount}_${fixedRightColumnCount}_${hasFixed}`}
          columns={getColumns}
          fixedLeftColumns={getFixedLeftColumns}
          fixedRightColumns={getFixedRightColumns}
          // 这里加mgType是为了getBodyScrollBar
          mgType={'mainMultiGrid'}
        /> : <>
            <Grid
              {...props}
              ref={multiGridContainer}
              columns={mainColumns}
              fixedLeftColumns={[]}
              fixedRightColumns={[]}
              mgType={'mainMultiGrid'}
              onScrollTopSync={onScrollTopSync}
              // syncRowHeight={syncRowHeight}
            />
          {
            getFixedLeftColumns.length > 0 ? <div className="vt-multi-grid-fixed-left">
              <Grid
                {...props}
                ref={multiGridContainerLeft}
                columns={getFixedLeftColumns}
                fixedLeftColumns={[]}
                fixedRightColumns={[]}
                rowsHeightArr={rowsHeightArr}
                mgType={'leftMultiGrid'}
                gridStyle={{
                  marginBottom: type === 'body' ? -bodyScrollBarHeight : undefined
                }}
              />
            </div> : null
          }
          {
            getFixedRightColumns.length > 0 ? <div className="vt-multi-grid-fixed-right" style={{
              marginRight: type === 'body' ? bodyScrollBarWidth : undefined
            }}>
              <Grid
                {...props}
                ref={multiGridContainerRight}
                columns={getFixedRightColumns}
                fixedLeftColumns={[]}
                fixedRightColumns={[]}
                rowsHeightArr={rowsHeightArr}
                mgType={'rightMultiGrid'}
                gridStyle={{
                  marginBottom: type === 'body' ? -bodyScrollBarHeight : undefined
                }}
              />
            </div> : null
          }
        </>
      }
    </div>
  </>;

};

MultiGrid.propTypes = {
  // 类型 header
  type: PropTypes.string,
  mgClassName: PropTypes.string,
  shouldRowHeightSync: PropTypes.bool,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  hasFixed: PropTypes.bool,
  fixedLeftColumnCount: PropTypes.number,
  fixedRightColumnCount: PropTypes.number,
  bodyScrollBarWidth: PropTypes.number,
  bodyScrollBarHeight: PropTypes.number,
};

export default React.memo(React.forwardRef(MultiGrid));
