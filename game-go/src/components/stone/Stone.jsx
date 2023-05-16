import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const game = useSelector(state => state.game);
const dispatch = useDispatch();
dispatch({ type: 'SOME_ACTION_TYPE', payload: 'some payload' });


const Stone = () => {
    return (
      <div>Stone</div>
    )
}

export default Stone;
