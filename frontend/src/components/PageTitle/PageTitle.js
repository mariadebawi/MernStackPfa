import React from "react";
import { Button } from "@material-ui/core";

// styles
import useStyles from "./styles";


export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
     
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
        >
          {props.button}
        </Button>
      )}
    </div>
  );
}
