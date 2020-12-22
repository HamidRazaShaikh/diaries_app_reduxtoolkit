import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import http from "../../services//api";
import Swal from "sweetalert2";
import { Diary, User } from "../../interfaces/interfaces";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import dayjs from "dayjs";

import {
  Grid,
  Hidden,
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { addDiary } from "../../features/diary/diarySlice";
import { setUser } from "../../features/auth/userSlice";

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
}));

export default function Diaries() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const diaries = useSelector((state: RootState) => state.diaries);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
         console.log(http.get<null, Diary[]>(`/diaries/${user.id}`))
      }
    };

    fetchDiaries();
  }, [dispatch, user]);

  const createDiary = async () => {
    const result: any = await Swal.mixin({
      input: "text",
      confirmButtonText: "Next ->",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    }).queue([
      {
        titleText: "Diary title",
        input: "text",
      },

      {
        titleText: "Private or public diary?",
        input: "radio",
        inputOptions: {
          private: "Private",
          public: "Public",
        },
        inputValue: "private",
      },
    ]);

    if (result.value) {
      const { value } = result;

      const { diary, user: _user } = await http.post<
        Partial<Diary>,
        { diary: Diary; user: User }
      >("/diaries/", {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });

      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(user));

        return Swal.fire({ titleText: "All done!", confirmButtonText: "OK" });
      }
    }

    Swal.fire({
      titleText: "Cancelled",
    });
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Box>
          <Button
            className={classes.createButton}
            variant="outlined"
            onClick={createDiary}
          >
            create new
          </Button>
        </Box>
      
      </Grid>
    </div>
  );
}
