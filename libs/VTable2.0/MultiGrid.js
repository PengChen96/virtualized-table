
import React, {useContext, useEffect, useImperativeHandle, useMemo, useRef, useCallback} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';
import {formatFixedLeftColumns, formatFixedRightColumns} from './utils/fixUtil';
import {deepClone} from './utils/deepClone';
import {classNames} from './utils/base';
import {isRowsHeightCached, setRowHeightCache} from './cache/rowHeightCache';
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
    bodyScrollBarWidth
  } = props;
  //
  const multiGridContainerLeft = useRef(null);
  const multiGridContainerRight = useRef(null);

  const _VTableContext = useContext(VTableContext);

  // let [rowsHeightCacheId, setRowsHeightCacheId] = useState(null);

  useEffect(() => {
    // 同步固定列的高度
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && hasFixed) {
      let timer = setTimeout(() => {
        // syncRowHeight({forceUpdate: true});
        const {current} = multiGridContainer;
        if (current) {
          current.gridContainer.scrollTop += 1;
          window.requestAnimationFrame(() => {
            current.gridContainer.scrollTop -= 1;
          });
        }
        clearTimeout(timer);
      }, 150);
    }
  }, [columns, dataSource, hasFixed]);

  // main columns
  const getColumns = useMemo(() => {
    if (!hasFixed) { return columns; }
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

  //
  const onScrollTopSync = useCallback((e, {startRowIndex, endRowIndex}) => {
    const scrollTop = e && e.target && e.target.scrollTop;
    // window.requestAnimationFrame(() => {
    const {current: leftCurrent} = multiGridContainerLeft;
    const {current: rightCurrent} = multiGridContainerRight;
    //
    if (leftCurrent) {
      leftCurrent.gridContainer.scrollTop = scrollTop;
    }
    if (rightCurrent) {
      rightCurrent.gridContainer.scrollTop = scrollTop;
    }
    // });
    syncRowHeight({startRowIndex, endRowIndex});
  }, []);
  // no isSticky
  const syncRowHeight = ({startRowIndex, endRowIndex}) => {
    // 同步固定列的高度
    if (shouldRowHeightSync && !_VTableContext.isSticky && type === 'body' && hasFixed) {
      const {current} = multiGridContainer;
      const gridRowCollection = current.gridContainer.getElementsByClassName('vt-grid-row');
      const gridRowHeightArr = Array.prototype.slice.call(gridRowCollection).map((item) => {
        return item.clientHeight;
      });
      // TODO cache data need better way
      const cached = isRowsHeightCached({startRowIndex, endRowIndex, rowHeightArr: gridRowHeightArr});
      if (!cached) {
        setRowHeightCache({startRowIndex, endRowIndex, rowHeightArr: gridRowHeightArr});
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
          // 这里加mgType是为了getBodyScrollBarWidth
          mgType={'mainMultiGrid'}
        /> : <>
            <Grid
              {...props}
              ref={multiGridContainer}
              columns={[...getFixedLeftColumns, ...getColumns, ...getFixedRightColumns]}
              fixedLeftColumns={[]}
              fixedRightColumns={[]}
              mgType={'mainMultiGrid'}
              onScrollTopSync={onScrollTopSync}
            />
          {
            getFixedLeftColumns.length > 0 ? <div className="vt-multi-grid-fixed-left">
              <Grid
                {...props}
                ref={multiGridContainerLeft}
                columns={getFixedLeftColumns}
                fixedLeftColumns={[]}
                fixedRightColumns={[]}
                // rowsHeightCacheId={rowsHeightCacheId}
                mgType={'leftMultiGrid'}
                gridStyle={{
                  marginBottom: type === 'body' ? -bodyScrollBarWidth : undefined
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
                // rowsHeightCacheId={rowsHeightCacheId}
                mgType={'rightMultiGrid'}
                gridStyle={{
                  marginBottom: type === 'body' ? -bodyScrollBarWidth : undefined
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
  // 是否显示边框
  bordered: PropTypes.bool
};

export default React.memo(React.forwardRef(MultiGrid));
