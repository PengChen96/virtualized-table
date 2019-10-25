
import React from 'react';

// Fun测试
export const sum = (a, b) => {

  return a + b;

};

// Dom测试
export const DOM = (props) => {

  return <div>
    <div className="test_text">文本内容</div>
    <div className="test_bar">1</div>
    <div className="test_bar">2</div>
    <div className="test_bar">3</div>
    <div className="test_click" onClick={() => {
      /* eslint-disable-next-line*/
      props.testClick();
    }}/>
  </div>;

};
