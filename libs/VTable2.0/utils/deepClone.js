
/**
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 */
export const deepClone = (data) => {
  // TODO
  return JSON.parse(JSON.stringify(data));
};
