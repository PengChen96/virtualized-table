
import React, {useEffect, useState} from 'react';
import Grid from './Grid';

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
    <Grid
      type={'11'}
      {...props}
    />
  </>;

};
