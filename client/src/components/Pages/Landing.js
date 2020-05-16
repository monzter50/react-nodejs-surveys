import React from 'react'
import {Typography,Container} from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    height:'100vh'
  },
  
}));
const Login = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
        <div className={classes.container}>
            <Typography variant="h1">Epayco</Typography>
            <Typography variant="h6">Welcome to Epayco</Typography>
        </div>
            
        </Container>
    )
}

export default Login
