import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Entry, User } from "../../interfaces/interfaces";
import { RootState } from "../../rootReducer";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store/store";
import { setEntry } from "../../features/entry/entry";
import http from "../../services/api";

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
  const dispatch = useAppDispatch();
  const { entriesShow } = useSelector((state: RootState) => state);
  const { entries } = useSelector((state: RootState) => state);
  const { user }: any = useSelector((state: User) => state);
  const id = entriesShow;

  const showEntries = () => {

   
    if (entries && id != null) {

      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntry(sortByLastUpdated));
          }
        });
    }
  };

  console.log(entries)




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
            <Divider component="li" />
          </List>
        </Box>
        <Box>
          <Button
            className={classes.createButton}
            variant="outlined"
            onClick={showEntries}
          >
            show entries
          </Button>
          <List>
            {entries.map((entry, index) => (
              <React.Fragment>
                <ListItem button key={index}>
                <ListItemText primary={entry.title} />
              </ListItem>

                <Divider component="li" />

              </React.Fragment>
              
            ))}
          </List>
        </Box>
      </Grid>
    </div>
  );
}
