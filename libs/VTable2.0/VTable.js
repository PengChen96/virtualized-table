
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
    console.log(state);

  }, []);

  return <>
    <Grid
      type={'11'}
    />
  </>;

};
