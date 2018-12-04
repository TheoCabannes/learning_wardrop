import { FETCH_FLOW, SET_MAX } from './types';

export const fetchFlow = () => dispatch => {

  fetch('http://localhost:5000/flow_data')
    .then(res =>
      res.json()
    )
    .then(posts => 
	    {
        // console.log("posts: ", posts.flow_data)
        // console.log("Calling dispatch")
          dispatch ({
            type: FETCH_FLOW,
            payload: posts.flow_data
          })
          dispatch ({
            type: SET_MAX,
            payload: posts.maximum
          })
      }
    )
};