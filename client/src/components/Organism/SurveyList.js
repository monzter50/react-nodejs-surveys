import React, { useEffect } from "react";
import store from "../../redux/store";
import { fetchSurvey } from "../../redux/actions/index";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CircularProgress,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import EmpyState from "../Molecules/EmpyState";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
  pos: {
    marginBottom: 12,
  },
});
const SurveyList = ({ match, surveys,loading }) => {
  const classes = useStyles();
  useEffect(() => {
    store.dispatch(fetchSurvey());
  }, [match]);
  return (
    <div>
      {!loading ? (
        surveys ? (
          surveys.map((survey) => (
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Title
                </Typography>
                <Typography variant="h5" component="h2">
                  {survey.title}
                </Typography>
                <Typography color="textSecondary">Body</Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.pos}
                >
                  {survey.body}
                  <br />
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="body2" component="p">
                  <span className={classes.bullet}>Yes: {survey.yes}</span>
                  <span className={classes.bullet}>No: {survey.no}</span>
                </Typography>
              </CardActions>
            </Card>
          ))
        ) : (
          <EmpyState />
        )
      ) : (
        <div className={classes.container}><CircularProgress /></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  surveys: state.surveysReducer.surveys,
  loading: state.surveysReducer.loading,
});
export default connect(mapStateToProps, {})(SurveyList);
