import { CHANGE_CURRENT } from './types';

export const changeCurrent = (current) => dispatch => {

            // console.log("Calling dispatch")
  dispatch ({
    type: CHANGE_CURRENT,
    payload: current
  })
      
};