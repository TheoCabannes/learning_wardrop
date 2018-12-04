import { INITIALISE_INSTANT_DATA, CHANGE_INSTANT_DATA } from './types';

export const initialiseInstantData = () => dispatch => {

  dispatch ({
    type: INITIALISE_INSTANT_DATA
  })
      
};

export const changeInstantData = (data) => dispatch => {
	// console.log("Receiving ", data)
  dispatch ({
    type: CHANGE_INSTANT_DATA,
    payload: data
  })
      
};