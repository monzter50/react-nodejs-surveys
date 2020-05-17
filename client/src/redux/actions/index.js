import axios from 'axios';
import {FETCH_USER,FETCH_STRIPE} from './types'

export const fetchUser = () => async dispatch =>{
    try{
      const reponse = await axios.get(`/api/current_user`)
      console.log("Response:", reponse)
      if(reponse.data){
        console.log("hey")
        localStorage.setItem("token",reponse.data.token );
      }

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