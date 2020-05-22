
import {FETCH_SURVEY,PENDING_SURVEY} from '../actions/types';
export const surveysReducer = (state = {}, action) =>{
    switch(action.type){
      case FETCH_SURVEY:
        return {
          ...state,
          surveys: action.surveys,
          loading:false
        };
        case PENDING_SURVEY:
          return {
            ...state,
            loading: true,
          };
        default:
          return state;
    }
  }