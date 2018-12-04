import { FETCH_CHOICE } from './types';

export const fetchChoice = () => dispatch => {

  fetch('http://localhost:5000/path_choice')
    .then(res =>
      res.json()
    )
    .then(posts => 
	    {
        console.log("posts: ", posts.path_choice)
            // console.log("Calling dispatch")
              dispatch ({
                type: FETCH_CHOICE,
                payload: posts.path_choice
              })
      }
    )
};