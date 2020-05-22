import axios from 'axios';
import {FETCH_USER,FETCH_STRIPE,FETCH_SURVEY,PENDING_SURVEY} from './types'

export const fetchUser = () => async dispatch =>{
    try{
      const reponse = await axios.get(`/api/current_user`)
      dispatch({
          type:FETCH_USER,
          user:reponse.data,
        })
    }catch(e){
      console.error("tienes error",e)
    }
  }
  export const handleToken = (token) => async dispatch =>{
    try{
      const reponse = await axios.post(`/api/stripe`,token)
      dispatch({
          type:FETCH_STRIPE,
          user:reponse.data,
        })
    }catch(e){
      console.error("tienes error",e)
    }
  }

  export const submitSurveys = (values,history) => async dispatch =>{
    try{
      const reponse = await axios.post(`/api/surveys`,values)
      history.push('/surveys')
      dispatch({
          type:FETCH_USER,
          user:reponse.data,
        })
    }catch(e){
      console.error("tienes error",e)
    }
  }
  export const fetchSurvey = () => async dispatch =>{
    try{
      dispatch({
        type:PENDING_SURVEY,
      })
      const reponse = await axios.get(`/api/surveys`)
      dispatch({
          type:FETCH_SURVEY,
          surveys:reponse.data,
        })
    }catch(e){
      console.error("tienes error",e)
    }
  }