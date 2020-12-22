import React from "react";
import { makeStyles } from "@material-ui/core";
import Diaries from './diary';
import Entry from './entry';
import Users from './users';

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
    height: "100vh",
    padding : 2,
    display: "flex",
    background: "linear-gradient(90deg, #1a237e , #b2ebf2)",
    alignItems: "center",
  },

  container: {
    borderStyle: "solid",
    width : '100%',
    borderRadius: 10,
    borderColor: '#1a237e',
    borderWidth: 4,
    padding : 5,
    margin: 2,
    height: "95vh",
    background : '#fafafa',
  },
}));

export default function Home() {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.root}>
        <Grid item md={3} container alignItems="center">
          <Box className={classes.container}>
            <Diaries/>   
                     
          </Box>
        </Grid>
        <Grid item md={6} container alignItems="center">
          <Box className={classes.container}>
            <Entry/>
          </Box>
        </Grid>
        <Grid item md={3} container alignItems="center">
          <Box className={classes.container}>
            <Users/>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
