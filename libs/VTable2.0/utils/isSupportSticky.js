
/**
 * 是否支持position: sticky
 * @return {boolean}
 */
export const isSupportSticky =  () => {
  let vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
  let vendorListLength = vendorList.length;
  let stickyElement = document.createElement('div');
  for (let i = 0; i < vendorListLength; i++) {
    stickyElement.style.position = vendorList[i] + 'sticky';
    if (stickyElement.style.position !== '') {
      return true;
    }
  }
  return false;
};
