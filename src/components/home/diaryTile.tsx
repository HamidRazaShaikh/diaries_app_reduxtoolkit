import React, { FC, useState } from "react";
import { Diary, User } from "../../interfaces/interfaces";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import http from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import dayjs from "dayjs";
import { useAppDispatch } from "../../store/store";
import { TextField } from "@material-ui/core";
import { updateDiary } from "../../features/diary/diarySlice";
import { show} from '../../features/entry/entryshow';
import { setActiveDiaryId, setCanEdit, setCurrentlyEditing} from "../../features/entry/editor";
interface Props {
  diary: Diary;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 5,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 2,
  },
});

const DiaryTile: FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const { editor } = useSelector((state: RootState) => state);
  const totalEntries = props.diary?.entryIds?.length;
  

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
        }
      })
      .finally(() => setIsEditing(false));
  };

  
  

  return (
    <div>
      <Card className={classes.root}  onClick = {()=>dispatch(show(diary.id as string))}>        
        <CardActionArea>
          <CardContent>
            {isEditing ? (
              <div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={diary.title}
                  onChange={(e) => {
                    setDiary({
                      ...diary,
                      title: e.target.value,
                    });
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      saveChanges();
                    }
                  }}
                />
              </div>
            ) : (
              <div >
                <Typography variant="h6">{diary.title}</Typography>
                <Button color="primary" onClick = {()=> {
                  dispatch(setCanEdit(true))
                  dispatch(setActiveDiaryId(diary.id as string))
                  dispatch(setCurrentlyEditing(null))
                  dispatch(show(diary.id as string))
                  
                }

                }>Add new entry</Button>
              </div>
            )}

            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                {diary.type}
              </Typography>
              <Box display="flex" alignItems="space-between">
                <Typography variant="body2" color="textSecondary" component="p">
                  {diary.createdAt}
                </Typography>

                <IconButton
                  aria-label="edit"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton><br/>

              
              </Box>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default DiaryTile;
