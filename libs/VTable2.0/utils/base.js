
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
      })
    }
  }
  return className.trim();
};
