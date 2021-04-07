
import {sameType} from './base';

/**
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 */
export const deepClone = (value) => {
  // 记录被拷贝的值，避免循环引用的出现
  let memo = new WeakMap();
  function baseClone(value){
    let res;
    if (sameType(value, 'Number') || sameType(value, 'String')
        || sameType(value, 'Symbol') || sameType(value, 'Boolean')
    ) {
      return value;
    } else if (sameType(value, 'Array')){
      res = [...value];
    } else if (sameType(value, 'Object')){
      res = {...value};
    }
    // 检测我们浅拷贝的这个对象的属性值有没有是引用数据类型。如果是，则递归拷贝
    Reflect.ownKeys(res).forEach(key=>{
      if(typeof res[key] === 'object' && res[key] !== null){
        // 此处我们用memo来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
        if(memo.get(res[key])){
          res[key] = memo[res[key]];
        }else{
          memo.set(res[key], true);
          res[key] = baseClone(res[key]);
        }
      }
    });
    return res;
  }
  return baseClone(value);
};
