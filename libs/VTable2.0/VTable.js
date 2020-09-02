
import React, {useEffect, useState} from 'react';
import MultiGrid from './MultiGrid';

export default (props) => {

  let [state, setState] = useState({

  });

  const set = (value) => {
    setState(Object.assign(state, value));
  };

  useEffect(() => {

    set(props);

  }, []);

  return <>
    <MultiGrid
      type={'11'}
      {...props}
    />
  </>;

};
