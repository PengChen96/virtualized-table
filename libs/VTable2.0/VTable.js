
import React, {useEffect, useMemo, useRef} from 'react';
import VTableContext from './context/VTableContext';
import MultiGrid from './MultiGrid';
import './styles/vtable.less';

const VTable = (props) => {

  let vtHeader = useRef(null);
  let vtBody = useRef(null);

  useEffect(() => {

  }, []);

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

  return <>
    <VTableContext.Provider
      value={{
        onScroll,
        isSticky: props.isSticky,
        headerTitle: getHeaderTitle,
        originDataSource: props.dataSource
      }}
    >
      {
        !props.isSticky && <MultiGrid
          {...props}
          ref={vtHeader}
          type={'header'}
          className={`vt-table-header ${props.className}`}
          visibleHeight={40}
          dataSource={getHeaderTitle}
        />
      }
      <MultiGrid
        {...props}
        ref={vtBody}
        type={'body'}
      />
    </VTableContext.Provider>
  </>;

};
export default VTable;
