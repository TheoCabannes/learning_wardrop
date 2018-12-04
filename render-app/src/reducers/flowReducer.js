import { FETCH_FLOW, SET_MAX } from '../actions/types';

const initialState = {
  data: {
  	flowData: {},
  	maximum: 0
  }
};

export default function(state = initialState.data, action) {
  // console.log("Flow data reducer = ", action.type)
  switch (action.type) {
    case FETCH_FLOW:
      return {...state, flowData: action.payload }
    case SET_MAX:
    	return {...state, maximum: action.payload}
    default:
      return state;
  }
}