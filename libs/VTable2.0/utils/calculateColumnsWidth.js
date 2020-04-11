
// 计算所传列的宽度
export const calculateColumnsWidth = (columns = []) => {

  let width = 0;
  columns.forEach((item) => {
    if (item.colSpan > 1) {
      width += item.width * item.colSpan;
    } else if (item.colSpan === 0) {
      width += 0;
    } else {
      width += item.width;
    }
  });

  return width;

};
