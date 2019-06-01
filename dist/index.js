module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("prop-types")},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[n].concat(i).concat([r]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(r=0;r<e.length;r++){var a=e[r];null!=a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var o,r,i={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),l=function(e){var t={};return function(e){if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),s=null,c=0,u=[],f=n(6);function d(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=i[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(g(o.parts[a],t))}else{var l=[];for(a=0;a<o.parts.length;a++)l.push(g(o.parts[a],t));i[o.id]={id:o.id,refs:1,parts:l}}}}function h(e,t){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],a=t.base?i[0]+t.base:i[0],l={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(l):n.push(o[a]={id:a,parts:[l]})}return n}function m(e,t){var n=l(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=l(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,r)}}function v(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function p(e){var t=document.createElement("style");return e.attrs.type="text/css",b(t,e.attrs),m(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,o,r,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var a=c++;n=s||(s=p(t)),o=x.bind(null,n,a,!1),r=x.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",b(t,e.attrs),m(e,t),t}(t),o=function(e,t,n){var o=n.css,r=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||i)&&(o=f(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),l=e.href;e.href=URL.createObjectURL(a),l&&URL.revokeObjectURL(l)}.bind(null,n,t),r=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=p(t),o=function(e,t){var n=t.css,o=t.media;o&&e.setAttribute("media",o);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){v(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=h(e,t);return d(n,t),function(e){for(var o=[],r=0;r<n.length;r++){var a=n[r];(l=i[a.id]).refs--,o.push(l)}e&&d(h(e,t),t);for(r=0;r<o.length;r++){var l;if(0===(l=o[r]).refs){for(var s=0;s<l.parts.length;s++)l.parts[s]();delete i[l.id]}}}};var y,C=(y=[],function(e,t){return y[e]=t,y.filter(Boolean).join("\n")});function x(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=C(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t,n){var o=n(5);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0};n(3)(o,r);o.locals&&(e.exports=o.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".v-table-header .v-table-container .v-table-main-container {\n  overflow-y: hidden;\n}\n.v-table-container {\n  display: flex;\n  border: 1px solid #e3e4e8;\n}\n.v-table-container .v-table-left-columns-container {\n  overflow: hidden;\n}\n.v-table-container .v-table-left-columns-container .v-table-row {\n  display: flex;\n}\n.v-table-container .v-table-main-container {\n  overflow: auto;\n}\n.v-table-container .v-table-main-container .v-table-row {\n  display: flex;\n}\n.v-table-container .v-table-fixed-left {\n  box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);\n}\n.v-table-container .v-table-fixed-right {\n  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);\n}\n",""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i)?e:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(e,t,n){var o=n(8);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0};n(3)(o,r);o.locals&&(e.exports=o.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,"/* VTable*/\n.v-table-header .v-grid-container {\n  background: #f4f6f9;\n  border-bottom: none;\n}\n.v-table-header .v-grid-container .v-grid-left-columns-container {\n  overflow: hidden;\n}\n.v-table-header .v-grid-container .v-grid-left-columns-container .v-grid-cell {\n  border-bottom: none !important;\n}\n.v-table-header .v-grid-container .v-grid-main-container {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.v-table-header .v-grid-container .v-grid-main-container::-webkit-scrollbar {\n  background: transparent;\n}\n.v-table-header .v-grid-container .v-grid-main-container .v-grid-cell {\n  border-bottom: none !important;\n}\n.v-table-footer .v-grid-container {\n  background: #f4f6f9;\n  border-top: none;\n}\n.v-table-footer .v-grid-container .v-grid-left-columns-container {\n  overflow: hidden;\n}\n.v-table-footer .v-grid-container .v-grid-left-columns-container .v-grid-cell {\n  border-bottom: none !important;\n}\n.v-table-footer .v-grid-container .v-grid-main-container {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.v-table-footer .v-grid-container .v-grid-main-container::-webkit-scrollbar {\n  background: transparent;\n}\n.v-table-footer .v-grid-container .v-grid-main-container .v-grid-cell {\n  border-bottom: none !important;\n}\n/* Grid*/\n.v-grid-container {\n  position: relative;\n  display: flex;\n  border: 1px solid #e3e4e8;\n}\n.v-grid-container .v-grid-left-columns-container {\n  overflow-y: hidden;\n  overflow-x: scroll;\n}\n.v-grid-container .v-grid-left-columns-container::-webkit-scrollbar {\n  background: transparent;\n}\n.v-grid-container .v-grid-left-columns-container .v-grid-row {\n  display: flex;\n}\n.v-grid-container .v-grid-left-columns-container .v-grid-row .v-grid-cell {\n  overflow: hidden;\n  position: relative;\n  border-bottom: 1px solid #e3e4e8;\n  line-height: 16px;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  word-break: break-all;\n}\n.v-grid-container .v-grid-main-container {\n  overflow: auto;\n}\n.v-grid-container .v-grid-main-container .v-grid-row {\n  display: flex;\n}\n.v-grid-container .v-grid-main-container .v-grid-row .v-grid-cell {\n  overflow: hidden;\n  position: relative;\n  border-bottom: 1px solid #e3e4e8;\n  line-height: 16px;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  word-break: break-all;\n}\n.v-grid-container .v-grid-fixed-left {\n  box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15);\n}\n.v-grid-container .v-grid-fixed-right {\n  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);\n}\n.v-grid-container .v-container-empty {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  padding-top: 40px;\n  box-sizing: border-box;\n  color: #999;\n}\n.v-grid-container .v-container-loading {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  padding-top: 60px;\n  box-sizing: border-box;\n  opacity: 0.8;\n  background: #fafafa;\n}\n.v-row-remove {\n  position: absolute;\n  top: -20px;\n  left: -20px;\n  border: 20px solid;\n  border-color: red transparent transparent transparent;\n  transform: rotate(135deg);\n  cursor: pointer;\n}\n.v-row-remove:after {\n  content: \"x\";\n  position: absolute;\n  top: -20px;\n  left: -2px;\n  color: #fff;\n  transform: rotate(45deg);\n}\n.v-checkbox-container {\n  position: relative;\n  cursor: pointer;\n}\n.v-checkbox-container input {\n  cursor: pointer;\n}\n.v-checkbox-container input:checked + .show-box:before {\n  border: solid #ff8040;\n  border-width: 0 2px 2px 0;\n}\n.v-checkbox-container .show-box {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 16px;\n  height: 16px;\n  border-radius: 2px;\n  border: 1px solid #d1d3d8;\n  background: white;\n}\n.v-checkbox-container .show-box:hover {\n  border-color: #ff8040;\n}\n.v-checkbox-container .show-box:before {\n  content: '';\n  position: absolute;\n  top: 2px;\n  left: 6px;\n  width: 3px;\n  height: 8px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n",""])},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),i=n(1),a=n.n(i);n(4);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=c(this,u(t).call(this,e))).state={columns:[],virtualColumns:[],dataSource:[],virtualData:[],visibleHeight:e.visibleHeight||400,estimatedRowHeight:40,rowVisibleCount:10,rowOffsetCount:5,startRowIndex:0,endRowIndex:0,startVerticalOffset:0,endVerticalOffset:0,fixedLeftColumnCount:1,visibleWidth:e.visibleWidth||1200,estimatedColumnWidth:150,columnVisibleCount:8,columnOffsetCount:4,startColumnIndex:0,endColumnIndex:0,startHorizontalOffset:0,endHorizontalOffset:0,fixedLeftColumns:0,scrollLeft:0},n}var n,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,r.a.Component),n=t,i=[{key:"getDerivedStateFromProps",value:function(e,t){if(console.log(e.dataSource!==t.dataSource),e.dataSource!==t.dataSource){var n=Math.ceil(t.visibleHeight/t.estimatedRowHeight),o=t.startRowIndex+n+2*t.rowOffsetCount,r=Math.ceil(t.visibleWidth/t.estimatedColumnWidth),i=t.startColumnIndex+r+2*t.columnOffsetCount,a=e.columns.slice(0,e.fixedLeftColumnCount);return{columns:e.columns,fixedLeftColumns:a,fixedLeftColumnCount:e.fixedLeftColumnCount,virtualColumns:e.columns.slice(t.startColumnIndex,i),startHorizontalOffset:t.startColumnIndex*t.estimatedColumnWidth,endHorizontalOffset:(e.columns.length-i)*t.estimatedColumnWidth,columnVisibleCount:r,dataSource:e.dataSource,virtualData:e.dataSource.slice(t.startRowIndex,o),startVerticalOffset:t.startRowIndex*t.estimatedRowHeight,endVerticalOffset:(e.dataSource.length-o)*t.estimatedRowHeight,rowVisibleCount:n}}return null}}],(o=[{key:"componentDidMount",value:function(){var e=this;this.setState({visibleHeight:this._container.clientHeight,visibleWidth:this._container.clientWidth}),this._container.addEventListener("scroll",function(){console.log(e._container.scrollTop,e._leftContainer.scrollTop),e._leftContainer.scrollTop=e._container.scrollTop})}},{key:"_onVerticalScroll",value:function(){var e=this._container.scrollTop,t=this.state,n=t.dataSource,o=t.estimatedRowHeight,r=t.rowOffsetCount,i=t.rowVisibleCount,a=Math.floor(e/o),l=a-r>0?a-r:0,s=i+a+r>n.length?n.length:i+a+r,c=l*o,u=(n.length-s)*o,f=n.slice(l,s);console.log(a,l,s,c,u,f,"垂直滚动"),this.setState({startRowIndex:l,endRowIndex:s,startVerticalOffset:c,endVerticalOffset:u,virtualData:f})}},{key:"_onHorizontalScroll",value:function(){var e=this._container.scrollLeft,t=this.state,n=t.columns,o=t.estimatedColumnWidth,r=t.columnOffsetCount,i=t.columnVisibleCount,a=Math.floor(e/o),l=a-r>0?a-r:0,s=i+a+r>n.length?n.length:i+a+r,c=l*o,u=(n.length-s)*o,f=n.slice(l,s);console.table({"columns.length":n.length,"scrollLeftNum水平滚动的条数":a,"startColumnIndex要渲染的列开始坐标":l,"endColumnIndex要渲染的列结尾坐标":s,"startHorizontalOffset左边未渲染数据的paddingLeft值":c,"endHorizontalOffset右边未渲染数据的paddingRight值":u}),console.log("需要渲染显示的列数据",f),console.log("总columns",n),this.setState({scrollLeft:e,startColumnIndex:l,endColumnIndex:s,startHorizontalOffset:c,endHorizontalOffset:u,virtualColumns:f})}},{key:"_onScrollEvent",value:function(){console.log(this),this.__onScroll(this._container.scrollLeft),this._onVerticalScroll(),this._onHorizontalScroll();var e=this.state.scrollPosition,t=this._container.scrollTop-e>0;this.setState({scrollPosition:this._container.scrollTop});var n=this._container.scrollHeight-this._container.scrollTop-this._container.clientHeight;this._container.scrollHeight,this._container.scrollTop,this._container.clientHeight;!t&&this._container.scrollTop,console.table({"scrollTop 滚动的高度":this._container.scrollTop,"scrollLeft 滚动的宽度":this._container.scrollLeft,"clientHeight 视窗高度":this._container.clientHeight,"scrollHeight 页面高度":this._container.scrollHeight,"height 距离页面底部的高度":n,"滚动方向":t?"下":"上"})}},{key:"_cellRender",value:function(e,t,n,o){var i=this,a=t+this.state.startRowIndex,l=o+this.state.startColumnIndex,s=e[n.key];return r.a.createElement("div",{style:{minWidth:150},onClick:function(){return i.__onCellTap(e)}},n.render?n.render(s):e[n.key],"[",a,", ",l,"]")}},{key:"render",value:function(){var e=this,t=this.state,n=t.fixedLeftColumns,o=t.virtualColumns,i=t.startHorizontalOffset,a=t.endHorizontalOffset,l=t.visibleWidth,s=t.scrollLeft,c=t.virtualData,u=t.startVerticalOffset,f=t.endVerticalOffset,d=t.estimatedRowHeight,h=t.visibleHeight;return console.log(c,"-"),console.log(o,"|"),r.a.createElement("div",{className:"v-table-container"},r.a.createElement("div",{className:"v-table-left-columns-container ".concat(s>0&&"v-table-fixed-left"),ref:function(t){return e._leftContainer=t},style:{width:300,height:h}},r.a.createElement("div",{style:{paddingTop:u,paddingBottom:f}},c.map(function(t,o){return r.a.createElement(r.a.Fragment,{key:o},r.a.createElement("div",{className:"v-table-row",style:{width:300,height:d}},n.map(function(n,i){return r.a.createElement(r.a.Fragment,{key:i},e._cellRender(t,o,n,i))})))}))),r.a.createElement("div",{className:"v-table-main-container",ref:function(t){return e._container=t},onScrollCapture:this._onScrollEvent.bind(this),style:{width:l,height:h,minHeight:d}},r.a.createElement("div",{style:{paddingTop:u,paddingBottom:f}},c.map(function(t,n){return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("div",{className:"v-table-row",style:{height:d,width:l,paddingLeft:i,paddingRight:a}},o.map(function(o,i){return r.a.createElement(r.a.Fragment,{key:i},e._cellRender(t,n,o,i))})))}))))}},{key:"__onScroll",value:function(e){var t=this.props.onScroll;"function"==typeof t&&t(e)}},{key:"__onCellTap",value:function(e){var t=this.props.onCellTap;"function"==typeof t&&t(e)}}])&&s(n.prototype,o),i&&s(n,i),t}();d.propTypes={title:a.a.string,columns:a.a.array,fixedLeftColumnCount:a.a.number,dataSource:a.a.array,visibleWidth:a.a.number,visibleHeight:a.a.number,onScroll:a.a.func,onCellTap:a.a.func};var h=d,m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=0;return e.forEach(function(e){t+=e.width}),t};n(7);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){b(e,t,n[t])})}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function y(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var w=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=y(this,C(t).call(this,e))).state={columns:[],virtualColumns:[],dataSource:[],virtualData:[],visibleHeight:e.visibleHeight||400,estimatedRowHeight:40,rowVisibleCount:10,rowOffsetCount:10,startRowIndex:0,endRowIndex:0,startVerticalOffset:0,endVerticalOffset:0,visibleWidth:e.visibleWidth||1200,estimatedColumnWidth:150,columnVisibleCount:8,columnOffsetCount:e.columnOffsetCount||4,startColumnIndex:0,endColumnIndex:0,startHorizontalOffset:0,endHorizontalOffset:0,scrollLeft:0,fixedLeftColumnCount:0,fixedLeftColumns:[],fixedLeftColumnsWidth:0,scrollColumns:[],scrollColumnsWidth:e.visibleWidth||1200},n}var n,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(t,r.a.Component),n=t,i=[{key:"getDerivedStateFromProps",value:function(e,t){if(e.dataSource!==t.dataSource){var n=Math.ceil(t.visibleHeight/t.estimatedRowHeight),o=t.startRowIndex+n+2*t.rowOffsetCount,r=t.visibleWidth,i=e.columns.slice(0,e.fixedLeftColumnCount),a=m(i),l=e.columns.slice(e.fixedLeftColumnCount,e.columns.length),s=r-a,c=Math.ceil(s/t.estimatedColumnWidth),u=t.startColumnIndex+c+2*t.columnOffsetCount,f=l.slice(0,t.startColumnIndex),d=m(f),h=l.slice(u,l.length),v=m(h);return{visibleHeight:e.visibleHeight,columns:e.columns,fixedLeftColumns:i,fixedLeftColumnsWidth:a,scrollColumns:l,scrollColumnsWidth:s,fixedLeftColumnCount:e.fixedLeftColumnCount,virtualColumns:l.slice(t.startColumnIndex,u),startHorizontalOffset:d,endHorizontalOffset:v,columnVisibleCount:c,dataSource:e.dataSource,virtualData:e.dataSource.slice(t.startRowIndex,o),startVerticalOffset:t.startRowIndex*t.estimatedRowHeight,endVerticalOffset:(e.dataSource.length-o)*t.estimatedRowHeight,rowVisibleCount:n}}return null}}],(o=[{key:"componentWillReceiveProps",value:function(e){var t=this.state;if(e.dataSource!==t.dataSource){var n=Math.ceil(t.visibleHeight/t.estimatedRowHeight),o=t.startRowIndex+n+2*t.rowOffsetCount,r=this._masterContainer.clientWidth,i=e.columns.slice(0,e.fixedLeftColumnCount),a=m(i),l=e.columns.slice(e.fixedLeftColumnCount,e.columns.length),s=r-a,c=Math.ceil(s/t.estimatedColumnWidth),u=t.startColumnIndex+c+2*t.columnOffsetCount,f=l.slice(0,t.startColumnIndex),d=m(f),h=l.slice(u,l.length),v=m(h);this.setState({visibleHeight:e.visibleHeight,columns:e.columns,fixedLeftColumns:i,fixedLeftColumnsWidth:a,scrollColumns:l,scrollColumnsWidth:s,fixedLeftColumnCount:e.fixedLeftColumnCount,virtualColumns:l.slice(t.startColumnIndex,u),startHorizontalOffset:d,endHorizontalOffset:v,columnVisibleCount:c,dataSource:e.dataSource,virtualData:e.dataSource.slice(t.startRowIndex,o),startVerticalOffset:t.startRowIndex*t.estimatedRowHeight,endVerticalOffset:(e.dataSource.length-o)*t.estimatedRowHeight,rowVisibleCount:n})}}},{key:"componentDidMount",value:function(){var e=this.props,t=this._masterContainer.clientHeight,n=this._masterContainer.clientWidth,o=e.columns.slice(0,e.fixedLeftColumnCount),r=m(o),i=e.columns.slice(e.fixedLeftColumnCount,e.columns.length),a=n-r;this.setState({visibleHeight:t,visibleWidth:n,fixedLeftColumns:o,fixedLeftColumnsWidth:r,scrollColumns:i,scrollColumnsWidth:a})}},{key:"_syncScrollTop",value:function(e,t){t.scrollTop=e.scrollTop,t.scrollTop!==e.scrollTop?this.setState({pointerEvents:"none"}):this.setState({pointerEvents:"auto"})}},{key:"_onVerticalScroll",value:function(){var e=this._scrollContainer.scrollTop,t=this.state,n=t.dataSource,o=t.estimatedRowHeight,r=t.rowOffsetCount,i=t.rowVisibleCount,a=Math.floor(e/o),l=a-r>0?a-r:0,s=i+a+r>n.length?n.length:i+a+r,c=l*o,u=(n.length-s)*o,f=n.slice(l,s);this.setState({startRowIndex:l,endRowIndex:s,startVerticalOffset:c,endVerticalOffset:u,virtualData:f})}},{key:"_onHorizontalScroll",value:function(){var e=this._scrollContainer.scrollLeft,t=this.state,n=t.scrollColumns,o=t.estimatedColumnWidth,r=t.columnOffsetCount,i=t.columnVisibleCount,a=Math.floor(e/o),l=a-r>0?a-r:0,s=i+a+r>n.length?n.length:i+a+r,c=n.slice(0,l),u=m(c),f=n.slice(s,n.length),d=m(f),h=n.slice(l,s);this.setState({scrollLeft:e,startColumnIndex:l,endColumnIndex:s,startHorizontalOffset:u,endHorizontalOffset:d,virtualColumns:h})}},{key:"_onScrollEvent",value:function(){this._syncScrollTop(this._scrollContainer,this._leftContainer),this.__onScroll(this._scrollContainer.scrollLeft),this._onVerticalScroll(),this._onHorizontalScroll();var e=this.state.scrollPosition,t=this._scrollContainer.scrollTop-e>0;this.setState({scrollPosition:this._scrollContainer.scrollTop});this._scrollContainer.scrollHeight,this._scrollContainer.scrollTop,this._scrollContainer.clientHeight;!t&&this._scrollContainer.scrollTop}},{key:"_cellRender",value:function(e,t,n,o){var i=this,a=t+this.state.startRowIndex,l=o+this.state.startColumnIndex,s=e[n.key],c=n.width||150,u=this.props,f=u.rowActiveKey,d=void 0===f?"active":f,h=u.rowActiveColor,m=void 0===h?"#fff1f0":h;return r.a.createElement("div",{onClick:function(){return i.__onCellTap(s,e,t,a,n,o,l)},className:"v-grid-cell ".concat(n.className||""),style:p({width:c,minWidth:c,height:this.state.estimatedRowHeight,background:e[d]?m:e.checked||e.hover?"#fff9e1":""},n.style)},this._render(s,e,t,a,n,o,l))}},{key:"_render",value:function(e,t,n,o,r,i,a){return"header"===this.props.type?r.headRender?r.headRender(e,t,n,o,r,i,a):t[r.key]:r.render?r.render(e,t,n,o,r,i,a):t[r.key]}},{key:"_mouseEnter",value:function(e){var t=this.props.type;if("header"!==this.props.type&&"footer"!==t){var n=this.state.virtualData;n.map(function(t,n){t.hover=!1,n===e&&(t.hover=!0)}),this.setState({virtualData:n})}}},{key:"_mouseLeave",value:function(e){var t=this.props.type;if("header"!==t&&"footer"!==t){var n=this.state.virtualData;n[e].hover=!1,this.setState({virtualData:n})}}},{key:"render",value:function(){var e=this,t=this.state,n=t.fixedLeftColumns,o=t.fixedLeftColumnsWidth,i=t.scrollColumnsWidth,a=t.virtualColumns,l=t.startHorizontalOffset,s=t.endHorizontalOffset,c=t.scrollLeft,u=t.virtualData,f=t.startVerticalOffset,d=t.endVerticalOffset,h=t.estimatedRowHeight,m=t.visibleHeight,v=t.dataSource,p=t.pointerEvents;return r.a.createElement("div",null,r.a.createElement("div",{className:"v-grid-container",ref:function(t){return e._masterContainer=t}},r.a.createElement("div",{className:"v-grid-left-columns-container ".concat(c>0&&"v-grid-fixed-left"),ref:function(t){return e._leftContainer=t},style:{width:o,minWidth:o,height:m}},r.a.createElement("div",{style:{paddingTop:f,paddingBottom:d}},u.map(function(t,i){return r.a.createElement("div",{key:i},r.a.createElement("div",{className:"v-grid-row",onMouseEnter:function(){return e._mouseEnter(i)},onMouseLeave:function(){return e._mouseLeave(i)},style:{pointerEvents:p,width:o,minWidth:o,height:h}},n.map(function(n,o){return r.a.createElement("div",{key:o},e._cellRender(t,i,n,o))})))}))),r.a.createElement("div",{className:"v-grid-main-container",ref:function(t){return e._scrollContainer=t},onScrollCapture:this._onScrollEvent.bind(this),style:{width:i,height:m,minHeight:h}},r.a.createElement("div",{style:{paddingTop:f,paddingBottom:d}},u.map(function(t,n){return r.a.createElement("div",{key:n},r.a.createElement("div",{className:"v-grid-row",onMouseEnter:function(){return e._mouseEnter(n)},onMouseLeave:function(){return e._mouseLeave(n)},style:{pointerEvents:p,height:h,width:i,paddingLeft:l,paddingRight:s}},a.map(function(o,i){return r.a.createElement("div",{key:i},e._cellRender(t,n,o,i))})))}))),v.length<1&&r.a.createElement("div",{className:"v-container-empty"},this.props.emptyText||"暂无数据"),this.props.loading&&r.a.createElement("div",{className:"v-container-loading"},this.props.loadingText||"数据加载中，请稍后..")))}},{key:"__onScroll",value:function(e){var t=this.props.onScroll;"function"==typeof t&&t(e)}},{key:"__onCellTap",value:function(e,t,n,o,r,i,a){var l=this.props.onCellTap;"function"==typeof l&&l(e,t,n,o,r,i,a)}}])&&g(n.prototype,o),i&&g(n,i),t}();w.propTypes={type:a.a.string,title:a.a.string,columns:a.a.array,fixedLeftColumnCount:a.a.number,dataSource:a.a.array,visibleWidth:a.a.number,visibleHeight:a.a.number,columnOffsetCount:a.a.number,emptyText:a.a.element,loading:a.a.bool,loadingText:a.a.element,rowActiveKey:a.a.string,rowActiveColor:a.a.string,onScroll:a.a.func,onCellTap:a.a.func};var S=w;function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function k(e,t){return!t||"object"!==_(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function R(e){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var H=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=k(this,R(t).call(this))).state={list:[],columns:[],columnData:[{}],dataSource:[],footerColumnData:[],selected:[],selectedRows:[]},e}var n,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,r.a.Component),n=t,(o=[{key:"componentWillReceiveProps",value:function(e){var t=this,n=this.state,o=e.rowRemoveVisible,i=void 0===o||o;if(e.dataSource!==n.dataSource||e.footerColumnData!==n.footerColumnData){var a=e.columns,l=JSON.parse(JSON.stringify(e.columns));e.rowSelection&&(a.unshift({width:60,style:{justifyContent:"center"},headRender:function(e,n,o,i){return r.a.createElement("div",{className:"v-checkbox-container",onClick:function(e){return t._select(e,n,i)}},r.a.createElement("input",{type:"checkbox",onChange:function(e){return t._select(e,n,i)},checked:n.checked||!1}),r.a.createElement("div",{className:"show-box"}))},render:function(n,o,a,l){return[i&&o&&o.hover&&r.a.createElement("div",{key:0,onClick:function(e){return t.__onRowRemove(e,o,a,l)}},e.rowRemoveText||r.a.createElement("div",{className:"v-row-remove"})),r.a.createElement("div",{className:"v-checkbox-container",key:1,onClick:function(e){return t._select(e,o,l)}},r.a.createElement("input",{type:"checkbox",checked:o.checked||!1}),r.a.createElement("div",{className:"show-box"}))]}}),(l=JSON.parse(JSON.stringify(e.columns)))[0]={width:60}),this.setState({columns:a,columnData:this.getColumnData(a),dataSource:e.dataSource,footerColumns:l,footerColumnData:e.footerColumnData,selected:[],selectedRows:[]})}}},{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.rowRemoveVisible,o=void 0===n||n,i=t.columns,a=JSON.parse(JSON.stringify(t.columns));t.rowSelection&&(i.unshift({width:60,style:{justifyContent:"center"},headRender:function(t,n,o,i){return r.a.createElement("div",{className:"v-checkbox-container",onClick:function(t){return e._select(t,n,i)}},r.a.createElement("input",{type:"checkbox",checked:n.checked||!1}),r.a.createElement("div",{className:"show-box"}))},render:function(n,i,a,l){return[o&&i&&i.hover&&r.a.createElement("div",{key:0,onClick:function(t){return e.__onRowRemove(t,i,a,l)}},t.rowRemoveText||r.a.createElement("div",{className:"v-row-remove"})),r.a.createElement("div",{className:"v-checkbox-container",key:1,onClick:function(t){return e._select(t,i,l)}},r.a.createElement("input",{type:"checkbox",checked:i.checked||!1}),r.a.createElement("div",{className:"show-box"}))]}}),(a=JSON.parse(JSON.stringify(t.columns)))[0]={width:60}),this.setState({columns:i,columnData:this.getColumnData(i),dataSource:t.dataSource,footerColumns:a,footerColumnData:t.footerColumnData,selected:[],selectedRows:[]})}},{key:"getColumnData",value:function(e){var t=[{}];return e.forEach(function(e){t[0][e.key]=e.title}),t[0].selection="all",t}},{key:"render",value:function(){var e=this,t=this.state,n=t.columns,o=t.columnData,i=t.dataSource,a=t.footerColumns,l=void 0===a?[]:a,s=t.footerColumnData,c=void 0===s?[]:s,u=this.props,f=u.className,d=u.visibleWidth,h=void 0===d?1200:d,m=u.visibleHeight,v=void 0===m?400:m,p=u.fixedLeftColumnCount,b=void 0===p?0:p,g=u.columnOffsetCount,y=void 0===g?0:g,C=u.emptyText,x=u.loading,w=u.loadingText,_=u.rowActiveKey,O=u.rowActiveColor;return r.a.createElement("div",{className:"v-table ".concat(f)},r.a.createElement("div",{className:"v-table-header"},r.a.createElement(S,{type:"header",ref:function(t){return e._header=t},title:"title",visibleWidth:h,visibleHeight:40,columns:n,dataSource:o,fixedLeftColumnCount:b,columnOffsetCount:y})),r.a.createElement("div",{className:"v-table-content"},r.a.createElement(S,{title:"title",visibleWidth:h,visibleHeight:v,columns:n,dataSource:i,fixedLeftColumnCount:b,columnOffsetCount:y,onScroll:this.onScroll.bind(this),onCellTap:this.__onCellTap.bind(this),emptyText:C,loading:x,loadingText:w,rowActiveKey:_,rowActiveColor:O})),c.length>0&&r.a.createElement("div",{className:"v-table-footer"},r.a.createElement(S,{type:"footer",ref:function(t){return e._footer=t},title:"title",visibleWidth:h,visibleHeight:40,columns:l,dataSource:c,fixedLeftColumnCount:b,columnOffsetCount:y})))}},{key:"onScroll",value:function(e){this._header._scrollContainer.scrollLeft=e,this._footer&&(this._footer._scrollContainer.scrollLeft=e)}},{key:"__onCellTap",value:function(e,t,n,o,r,i,a){var l=this.props.onCellTap;"function"==typeof l&&l(e,t,n,o,r,i,a)}},{key:"__onRowRemove",value:function(e,t,n,o){e.stopPropagation();var r=this.props.onRowRemove;"function"==typeof r&&r(e,t,n,o)}},{key:"_select",value:function(e,t,n){e.stopPropagation(),t.selection&&"all"===t.selection?this.__onSelectAll(t):this.__onSelect(t,n)}},{key:"__onSelectAll",value:function(e){var t=this.props,n=t.onSelectAll,o=t.rowKey,r=this.state.dataSource;if("function"==typeof n){var i=JSON.parse(JSON.stringify(r)),a=[],l=[];e.checked?(e.checked=!1,r.map(function(e){return e.checked=!1,e}),this.setState({dataSource:r,selected:[],selectedRows:[]})):(e.checked=!0,r.map(function(e){return e.checked=!0,e}),this.setState({dataSource:r,selected:i,selectedRows:i.map(function(e,t){return o?e[o]:t})}),a=i,l=i.map(function(e,t){return o?e[o]:t})),n(a,l)}}},{key:"__onSelect",value:function(e,t){var n=this.props,o=n.onSelect,r=n.rowKey,i=this.state,a=i.selected,l=i.selectedRows,s=i.columnData,c=i.dataSource;if("function"==typeof o){e.checked?(e.checked=!1,a[t]=void 0,l[t]=void 0):(e.checked=!0,a[t]=e,l[t]=r?e[r]:t);var u=a.filter(function(e){return e}),f=l.filter(function(e){return 0===e||e});u.length===c.length?s[0].checked=!0:s[0].checked=!1,this.setState({columnData:s}),o(e,u,f)}}}])&&O(n.prototype,o),i&&O(n,i),t}();H.propTypes={className:a.a.string,columns:a.a.array,fixedLeftColumnCount:a.a.number,columnOffsetCount:a.a.number,dataSource:a.a.array,visibleWidth:a.a.number,visibleHeight:a.a.number,rowSelection:a.a.object,emptyText:a.a.element,loading:a.a.bool,loadingText:a.a.element,rowKey:a.a.string,rowActiveKey:a.a.string,rowActiveColor:a.a.string,footerColumnData:a.a.array,onCellTap:a.a.func,onSelectAll:a.a.func,onSelect:a.a.func,onRowRemove:a.a.func,rowRemoveText:a.a.element,rowRemoveVisible:a.a.bool};var T=H;n.d(t,"Table",function(){return h}),n.d(t,"VTable",function(){return T}),n.d(t,"Grid",function(){return S})}]);