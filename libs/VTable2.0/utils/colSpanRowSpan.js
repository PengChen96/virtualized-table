
/**
 * 将合并数组转换为单元格的合并信息
 * @param {Array} mergesArr
 *  [
 *    {
 *      s: {c: 0, r: 2},
 *      e: {c: 1, r: 2},
 *    },
 *    {
 *       s: {c: 2, r: 2},
 *       e: {c: 2, r: 3},
 *    }
 *  ];
 * @return {Object}
 * {
 *   '0:2': {colSpan: 2, rowSpan: 1},
 *   '1:2': {colSpan: 0, rowSpan: 0},
 *   '2:2': {colSpan: 1, rowSpan: 2},
 *   '2:3': {colSpan: undefined, rowSpan: 0},
 * }
 */
export const formatToCellsSpan = (mergesArr) => {
  const mergesObj = {};
  mergesArr.forEach((m) => {
    const msc = m.s.c;
    const msr = m.s.r;
    const mec = m.e.c;
    const mer = m.e.r;
    for (let sc = msc; sc <= mec; sc++) {
      for (let sr = msr; sr <= mer; sr++) {
        mergesObj[`${sc}:${sr}`] = {
          colSpan: msr === sr ? 0 : undefined, // 第一行才设置colSpan=0,兼容VTable与antd差异
          rowSpan: 0,
        };
      }
    }
    mergesObj[`${msc}:${msr}`] = {
      colSpan: mec - msc + 1,
      rowSpan: mer - msr + 1,
    };
  });
  return mergesObj;
};
