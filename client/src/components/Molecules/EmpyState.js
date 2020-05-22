import React from "react";
import { Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
  },
});
const EmpyState = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h1">Dashboard</Typography>
      <Typography variant="h6">Welcome to Epayco</Typography>
    </div>
  );
};

export default EmpyState;
