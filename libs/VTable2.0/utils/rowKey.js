
import {sameType} from './base';

export const getRowKey = (rowKey, row, index) => {
  return rowKey ? (sameType(rowKey, 'Function') ? rowKey(row) : row[rowKey]) : index;
};
