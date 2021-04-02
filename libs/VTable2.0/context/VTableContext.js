import React from 'react';

/**
 * onScroll {Function} Grid中滚动时调用同步滚动
 * isSticky {Boolean} 是否使用position:sticky
 * headerTitle {Array} 表头数据
 */
const VTableContext = React.createContext(null);

export default VTableContext;
