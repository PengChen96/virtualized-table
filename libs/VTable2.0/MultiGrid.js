
import React, {useEffect, useState} from 'react';
import Grid from './Grid';
import PropTypes from 'prop-types';

const MultiGrid =  (props) => {

  let [state, setState] = useState({

  });

  const set = (value) => {
    setState(Object.assign(state, value));
  };

  useEffect(() => {

    set(props);

  }, []);

  return <>
    <div className="vt-multi-grid-container">
      <Grid
        type={'1'}
        {...props}
      />
      <Grid
        type={'2'}
        {...props}
      />
      <Grid
        type={'3'}
        {...props}
      />
    </div>
  </>;

};

MultiGrid.propTypes = {
  // 类型 header
  type: PropTypes.string,
  // 是否显示边框
  bordered: PropTypes.bool
};

export default MultiGrid;