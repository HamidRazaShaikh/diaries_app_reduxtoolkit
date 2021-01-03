import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Diary, Entry } from "../../interfaces/interfaces";
import { setCurrentlyEditing, setCanEdit } from "../../features/entry/editor";
import { updateDiary } from "../../features/diary/diarySlice";
import {
  Grid,
  Hidden,
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import http from "../../services/api";
import { useAppDispatch } from "../../store/store";
import { updateEntry } from "../../features/entry/entry";

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
    <div className={classes.root}>
      <Grid>
        <Box>
          <TextField
            className={classes.textfield}
            value={editedEntry?.title ?? ''}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange = { (e)=> {
              if (editedEntry){

                updateEditedEntry({
                  ...editedEntry,
                  title : e.target.value
                })
              }

              else {
                updateEditedEntry({

                  title : e.target.value,
                  content : ''


                })
              }


            }}
          />
        </Box>
        <Box py={1}>
         
          <TextField
            className={classes.textfield}
            value={editedEntry?.content ?? ''}            
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
                  title: '',
                  content: e.target.value,
                });
              }
            }}
          />
        </Box>
        <Box py={1}>
          <Button className={classes.Button} variant="outlined" onClick={saveEntry}>
            save
          </Button>
        </Box>
      </Grid>
    </div>
  );
}
