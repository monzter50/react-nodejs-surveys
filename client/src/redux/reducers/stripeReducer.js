import {FETCH_STRIPE} from '../actions/types';

export const stripeReducer = (state = {}, action) =>{
    switch(action.type){
      case FETCH_STRIPE:
        return {
          ...state,
          token: action.token,
          loading: false,
        };
        default:
          return state;
    }
  }