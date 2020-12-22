import React from "react";
import { makeStyles } from "@material-ui/core";

import {
  Grid,
  Hidden,
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#fff",
  },
  textfield: {
    width: "100%",
  },

  Button: {
    width: "100%",
    color: "#000",
    background: "#b0bec5",
  },
}));

export default function Entry() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Grid>
        <Box>
          <TextField
            className={classes.textfield}
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
        </Box>
        <Box py={1}>
          <TextField
            className={classes.textfield}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={22}
            variant="outlined"
          />
        </Box>
        <Box py={1}>
          <Button className={classes.Button} variant="outlined">
            save
          </Button>
        </Box>
      </Grid>
    </div>
  );
}
