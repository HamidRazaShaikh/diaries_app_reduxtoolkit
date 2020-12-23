import React, { FC, useState } from "react";
import { Diary } from "../../interfaces/interfaces";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
  const [diary, setDiary] = useState(props.diary);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {diary.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {diary.type}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {diary.createdAt}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default DiaryTile;
