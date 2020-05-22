import React from 'react'
import { Route } from 'react-router-dom'

const Public = ({ component:Component, ...rest  }) => {
    return <Route {...rest} component={Component} />
  
}

export default Public