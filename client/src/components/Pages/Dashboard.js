import React from "react";
import {Link} from 'react-router-dom';
import { Typography, Container,Fab } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import {Add as AddIcon} from '@material-ui/icons/';
import SurveyList from '../Organism/SurveyList';
const useStyles = makeStyles((theme) => ({

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));
const Dashboard = () => {
const classes = useStyles();
  return (
    <Container maxWidth="lg">
    
     <SurveyList/>

      <Link to={'/surveys/news'}>
       <Fab color="primary" className={classes.fab} aria-label="add">
       
        <AddIcon />
      </Fab>
      </Link>
    </Container>
  );
};

export default Dashboard;
