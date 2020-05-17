import { combineReducers } from 'redux';
import {authReducer} from  './authReducer';
import {stripeReducer} from  './stripeReducer';
import {surveysReducer} from './surveysReducer';
export default  combineReducers({
    authReducer,
    surveysReducer,
    stripeReducer
})