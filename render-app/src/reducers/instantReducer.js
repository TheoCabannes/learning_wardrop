import { INITIALISE_INSTANT_DATA, CHANGE_INSTANT_DATA } from '../actions/types';

const initialState = {
  instantData: {}
};

export default function(state = initialState.instantData, action) {
  // console.log("Instantaneous data reducer = ", action.type)
  switch (action.type) {
    case INITIALISE_INSTANT_DATA:
      return {}
    case CHANGE_INSTANT_DATA:
      // console.log("Current state = ", state)
      // console.log("Adding ", action.payload)
    	return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}