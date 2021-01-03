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
import { withStyles} from '@material-ui/core/styles';

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


const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

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
      <BootstrapButton disableRipple>

      <Card className={classes.root}  onClick = {()=>{
        
        dispatch(show(diary.id as string))
        
        }}>        
       
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

               

              
              </Box>
            </div>
          </CardContent>

          <CardActions>
              <Button size="small"  onClick = {()=> {
                  dispatch(setCanEdit(true))
                  dispatch(setActiveDiaryId(diary.id as string))
                  dispatch(setCurrentlyEditing(null))
                  dispatch(show(diary.id as string))
                  
                }

                }>add new entry</Button>
              <IconButton
                  aria-label="edit"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
            </CardActions>

       
      </Card>

      </BootstrapButton>
     
    </div>
  );
};

export default DiaryTile;
