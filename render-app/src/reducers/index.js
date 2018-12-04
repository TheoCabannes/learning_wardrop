import { combineReducers } from 'redux'

import choiceReducer from './choiceReducer'
import flowReducer from './flowReducer'
import currentReducer from './currentReducer'
import instantReducer from './instantReducer'

export default combineReducers({
	pathChoice: choiceReducer,
	data: flowReducer,
	current: currentReducer,
	instantData: instantReducer
});