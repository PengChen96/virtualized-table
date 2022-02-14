
import {sameType} from './base';

/**
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 */
export const deepClone = (value) => {
  // 记录被拷贝的值，避免循环引用的出现
  let memo = new WeakMap();
  function baseClone(data){
    if (typeof data !== 'object' || data === null) {
      return data;
    }
    if (memo.get(data)) {
      return memo.get(data);
    }
    let newData;
    if (sameType(data, 'Array')){
      newData = [...data];
    } else if (sameType(data, 'Object')) {
      newData = {...data};
    }
    memo.set(data, newData);
    Reflect.ownKeys(data).forEach(key=>{
      if (typeof data[key] === 'object' && data[key] !== null) {
        newData[key] = baseClone(data[key]);
      }
    });
    return newData;
  }
  return baseClone(value);
};

