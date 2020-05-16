import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Protected = ({ component:Component, ...rest }) => {
  // const userAuth =  localStorage.getItem('token')
  //   if(!userAuth){
  //     return  <Redirect to="/surveys"/>
  //   }
    return <Route {...rest} component={Component} />
  
}

export default Protected