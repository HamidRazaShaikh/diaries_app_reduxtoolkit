import React from "react";
import { makeStyles } from "@material-ui/core";
import {useSelector} from 'react-redux';
import { User } from "../../interfaces/interfaces";
// import {useAppDispatch} from '../../store/store';
// import { sendUser } from '../../features/auth/userSlice';






import {
  Grid,
  Hidden,
  List,
  ListItem,
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemText,
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
  createButton: {
    width: "100%",
    color: "#000",
    background: "#b0bec5",
  },

  list: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Users() {
  const classes = useStyle();

  const {user} : any  = useSelector(
    (state:User)=> state
  );

  console.log(user.username)  


  
  return (
    <div className={classes.root}>
      <Grid>
        <Box>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.username} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {user.email}
                      
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Box>
      </Grid>
    </div>
  );
}
