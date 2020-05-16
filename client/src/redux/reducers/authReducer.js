import {FETCH_USER} from '../actions/types';

export const authReducer = (state = {}, action) =>{
    switch(action.type){
      case FETCH_USER:
        return {
          ...state,
          user: action.user,
          loading: false,
        };
        default:
          return state;
    }
  }