import React,{useEffect} from "react";
import Payments from './Payments';
import store from "../../redux/store";
import {
    fetchUser,
} from "../../redux/actions/index";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link:{
    textDecoration:'none',
    color:'inherit'
  }
}));
const removeToken = (event) =>{
  localStorage.removeItem('token')
}
const Header = ({ match,user }) => {
  useEffect(() => {
    store.dispatch(fetchUser());
  }, [user])
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
       
          <Typography variant="h6" className={classes.title}>
          <Link to={!user?'/':'/surveys'} className={classes.link}>
            Epayco
          </Link>
             
          </Typography>
       

        
        {!user ? (
          <Button color="inherit" href="/auth/google">
            Login With Google
          </Button>
          ) : (
            <div>

            <Payments>
              <Button color="inherit" >
                Add credits
              </Button>
            </Payments>
            
            <Button  color="inherit" >
              Credit: {user.credits}
            </Button>
            <Button onClick={()=>removeToken} color="inherit" href="/api/logout">
              Logout
            </Button>
            </div>
            
          )
          }
        
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  loading: state.authReducer.loading,
});
export default connect(mapStateToProps, {})(Header);
