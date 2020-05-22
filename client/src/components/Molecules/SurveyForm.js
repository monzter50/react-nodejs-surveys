import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SurveyField from "../Atom/SurveyField";
import { FIELDS } from "../../helpers/fieldsForm";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
  reviewDown:{
    display:"flex",
    justifyContent:"space-between",
    margin:"1rem 0"
  }
}));
const SurveyForm = ({
  onSurveyReview,
  valid,
  handleChange,
  values,
  review,
}) => {
  const classes = useStyles();
  if (review) {
    return null;
  }
  return (
    <Container maxWidth="md">
      <div className={classes.container}>
        <Typography variant="h2" component="h2">
          Survey Form
        </Typography>
        {JSON.stringify(values)}
        <form onSubmit={onSurveyReview}>
          {_.map(FIELDS, ({ label, name, message }) => (
            <SurveyField
              valid={valid[name]}
              message={valid[message]}
              key={name}
              label={label}
              name={name}
              handleChange={handleChange}
              type="text"
              values={values[name]}
            />
          ))}
          <div className={classes.reviewDown}>
            <Link to="/surveys">
              <Button type="submit" color="primary">
                Cancel
              </Button>
            </Link>

            <Button type="submit" color="primary">
              Next
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SurveyForm;
