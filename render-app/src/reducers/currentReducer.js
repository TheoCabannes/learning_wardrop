import { CHANGE_CURRENT } from '../actions/types';

const initialState = {
  current: null
};

export default function(state = initialState.current, action) {
  // console.log("Change index reducer = ", action.type)
  switch (action.type) {
    case CHANGE_CURRENT:
      return action.payload
    default:
      return state;
  }
}