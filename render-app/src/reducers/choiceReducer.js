import { FETCH_CHOICE } from '../actions/types';

const initialState = {
  pathChoice: {}
};

export default function(state = initialState.pathChoice, action) {
  // console.log("Path choice reducer = ", action.type)
  switch (action.type) {
    case FETCH_CHOICE:
      return action.payload
    default:
      return state;
  }
}