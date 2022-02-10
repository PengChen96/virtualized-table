import React from 'react';

/**
 * 判断类型
 * @param {any} value 需要比对的值
 * @param {string} type 比对类型
 * @return {boolean} 比对结果
 */
export const sameType = (value, type) => {
  if (type === 'String') {
    return Object.prototype.toString.call(value) === '[object String]';
  }
  if (type === 'Number') {
    return Object.prototype.toString.call(value) === '[object Number]';
  }
  if (type === 'Symbol') {
    return Object.prototype.toString.call(value) === '[object Symbol]';
  }
  if (type === 'Null') {
    return Object.prototype.toString.call(value) === '[object Null]';
  }
  if (type === 'Undefined') {
    return Object.prototype.toString.call(value) === '[object Undefined]';
  }
  if (type === 'Function') {
    return Object.prototype.toString.call(value) === '[object Function]';
  }
  if (type === 'Object') {
    return Object.prototype.toString.call(value) === '[object Object]';
  }
  if (type === 'Array') {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
  if (type === 'Boolean') {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  }
};

/**
 * 判断render返回的对象类型
 * @param {any} data 传入的值
 * @return {boolean} 比对结果
 */
export const isRenderCellObj = (data) => {
  return data && sameType(data, 'Object') && !React.isValidElement(data);
};

// classNames('foo', 'bar'); // => 'foo bar'
// classNames('foo', { bar: true }); // => 'foo bar'
// classNames({ 'foo-bar': true }); // => 'foo-bar'
// classNames({ 'foo-bar': false }); // => ''
// classNames({ foo: true }, { bar: true }); // => 'foo bar'
// classNames({ foo: true, bar: true }); // => 'foo bar'
export function classNames () {
  let className = '';
  for (let i in arguments) {
    if (sameType(arguments[i], 'String')) {
      className += ` ${arguments[i]}`;
    }
    if (sameType(arguments[i], 'Object')) {
      Object.keys(arguments[i]).forEach((k) => {
        className += arguments[i][k] ? ` ${k}` : '';
      });
    }
  }
  return className.trim();
};

// 查询自定义属性的DOM
// querySelectorAll 除ASCII 字母、数字、_、- 和 . 以外的字符可能会有兼容性问题
export function queryCustomAttributeDOM(scopeDOM, name, value) {
  const selectDom = [];
  const dom = scopeDOM;
  for (let i = 0; i < dom.length; i++) {
    if (value === dom[i].getAttribute(name)) {
      selectDom.push(dom[i]);
    }
  }
  return selectDom;
}
