import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Public = ({ component:Component, ...rest  }) => {
  // const userAuth =  localStorage.getItem('token')
  //   if(userAuth){
  //     return  <Redirect to="/"/>
  //   }
    return <Route {...rest} component={Component} />
  
}

export default Public