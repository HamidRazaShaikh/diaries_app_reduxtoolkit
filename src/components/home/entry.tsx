import React, { useEffect, useState } from "react";
import { Card, IconButton, makeStyles } from "@material-ui/core";
import { Diary, Entry } from "../../interfaces/interfaces";
import { setCurrentlyEditing, setCanEdit } from "../../features/entry/editor";
import { updateDiary } from "../../features/diary/diarySlice";
import {
  Grid,
  Hidden,
  Box,
  Button,
  TextField,
  Divider,
  Typography,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import http from "../../services/api";
import { useAppDispatch } from "../../store/store";
import { updateEntry } from "../../features/entry/entry";
import EditIcon from "@material-ui/icons/Edit";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#fff",
  },
  root2: {
    minWidth: 275,
    margin: 2,
  },

  title: {
    fontSize: 14,
  },

  pos: {
    marginBottom: 12,
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

export default function EntryEditor() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector(
    (state: RootState) => state.editor
  );
  const [editedEntry, updateEditedEntry] = useState(entry);

  const { editor } = useSelector((state: RootState) => state);

  const saveEntry = async () => {
    if (activeDiaryId == null) {
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Please select a diary <strong>check it out!</strong>
      </Alert>;
    }

    if (entry == null) {
      http
        .post<Entry, { diary: Diary; entry: Entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http
        .put<Entry, Entry>(`/diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry != null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateEntry(_entry));
          }
        });
    }

    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);

  return (
    <div className={classes.root2}>
      <Grid>
        {entry && !canEdit ? (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Title
              </Typography>
              <Typography variant="h5" component="h2">
                {" "}
                {entry.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {`updated at : ${entry.updatedAt}`}
              </Typography>
              <Typography variant="body2" component="p">
                {entry.content}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  dispatch(setCurrentlyEditing(entry));
                  dispatch(setCanEdit(true));
                }}
              >
                Edit entry
              </Button>
            </CardActions>
          </Card>
        ) : (
          <div>
            <Box>
              <TextField
                className={classes.textfield}
                value={editedEntry?.title ?? ""}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(e) => {
                  if (editedEntry) {
                    updateEditedEntry({
                      ...editedEntry,
                      title: e.target.value,
                    });
                  } else {
                    updateEditedEntry({
                      title: e.target.value,
                      content: "",
                    });
                  }
                }}
              />
            </Box>
            <Box py={1}>
              <TextField
                className={classes.textfield}
                value={editedEntry?.content ?? ""}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={22}
                variant="outlined"
                onChange={(e) => {
                  if (editedEntry) {
                    updateEditedEntry({
                      ...editedEntry,
                      content: e.target.value,
                    });
                  } else {
                    updateEditedEntry({
                      title: "",
                      content: e.target.value,
                    });
                  }
                }}
              />
            </Box>
            <Box py={1}>
              <Button
                className={classes.Button}
                variant="outlined"
                onClick={saveEntry}
              >
                save
              </Button>
            </Box>
          </div>
        )}
      </Grid>
    </div>
  );
}
