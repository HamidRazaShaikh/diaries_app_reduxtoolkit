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
      width :'100%',
      background : '#fff',

    },  
    createButton: {
      width :'100%',
      color: '#000',
      background : '#b0bec5'
      
    },  
    
  }));

export default function Diary() {
    const classes = useStyle();

  return (
    <div className = {classes.root}>
      <Grid>
        <Box>
          <Button className = {classes.createButton} variant = "outlined">
          create new
          </Button>
        </Box>
      </Grid>
    </div>
  );
}
