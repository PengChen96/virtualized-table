
// 计算所传列的宽度
export const calculateColumnsWidth = (columns = []) => {

  let width = 0;
  columns.forEach((item) => {
    width += item.width;
  });

  return width;

};
