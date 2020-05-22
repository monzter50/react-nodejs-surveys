import React from 'react'
import {TextField,FormControl} from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
  }));
const SurveyField = ({ label,name,type,handleChange,message,valid,values}) => {
    const classes = useStyles();
    return (
      <FormControl
          fullWidth
          className={classes.margin}
          variant="outlined"
        >
          
          <TextField
            error={!valid}
            values={values}
            onChange={handleChange(name)}
            label={label}
            type={type}
            name={name}
            helperText={message}
            variant="outlined"
            defaultValue={values}
            required
          />
        </FormControl>
        
    )
}


export default SurveyField;