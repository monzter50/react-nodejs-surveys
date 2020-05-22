import React from "react";
import _ from "lodash";
import {submitSurveys} from "../../redux/actions/index";
import store from "../../redux/store";
import {withRouter} from 'react-router-dom'
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FIELDS } from "../../helpers/fieldsForm";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
  reviewContent: {
    textAlign: "left",
  },
  reviewDown:{
    display:"flex",
    justifyContent:"space-between",
    margin:"1rem 0"
  }
}));
const SurveyReview = ({ values, onCancel, review,history }) => {
  const classes = useStyles();
  if (!review) {
    return null;
  }
  return (
    <Container maxWidth="md">
      <div className={classes.container}>
        <div>
          <Typography variant="h2" component="h2">
            Review
          </Typography>
          {_.map(FIELDS, ({ label, name }) => (
            <div className={classes.reviewContent} key={name}>
              <Typography variant="body" component="h3">
                {label}
              </Typography>
              <Typography variant="subtitle1" component="p">
                {values[name]}
              </Typography>
            </div>
          ))}
          <div className={classes.reviewDown}>
            <Button type="submit" color="primary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" color="primary" onClick={() => store.dispatch(submitSurveys(values,history))}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(SurveyReview);
