import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useForm ,  Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { User } from "../../../interfaces/interfaces";
import { AuthResponse } from "../../../services/mirage/routes/user";
import http from "../../../services/api";
import {useAppDispatch} from '../../../store/store';
import { saveToken, setAuthState} from '../../../features/auth/authSlice';
import { setUser } from '../../../features/auth/userSlice';


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
    display: "flex",
    background: "linear-gradient(90deg, #1a237e , #b2ebf2)",
    alignItems: "center",
  },

  signup: {
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "#263238",  
    borderWidth: 2,
    padding: 20,
    margin: 10,
    background :' #ffff',
  },
}));


const schema = Yup.object().shape({
  username: Yup.string()
    .required("What? No username?")
    .max(16, "Username cannot be longer than 16 characters"),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  email: Yup.string().email("Please provide a valid email address (abc@xy.z)"),
});

function Auth () {

  const classes = useStyle();
  const [ isSignin , setIsSignin] = useState( true);
  const dispatch = useAppDispatch();
  

  const {handleSubmit, errors, control } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data : User) => {
    const path =  isSignin? "/auth/signin" : '/auth/signup';

    http.post<User, AuthResponse >( path , data).then( (res) => {
      if(res){
        const {user,token} = res;        
        dispatch (setUser(user)); 
        dispatch (saveToken(token));
        dispatch (setAuthState(true) )      

      }
    }).catch ( err=> console.log(err))


  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Hidden mdUp>
            <Grid item sm={12} container alignItems="center" justify="center">
              <Box px={3}>
                <Box style={{ color: "#ffd600" }} py={2}>
                  <Typography variant="h3">Diary App</Typography>
                  <Typography variant="h6">Manage your activities</Typography>
                </Box>
              </Box>
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid item md={6} container alignItems="center">
              <Box px={10} style={{ color: "#ffd600" }}>
                <Box py={2}>
                  <Typography variant="h2">Diary App</Typography>
                </Box>
                <Box>
                  <Typography style={{ fontWeight: 5, fontSize: 20 }}>
                    Keeping a diary is important for some people, for many
                    different reasons. Traditionally, people would just write
                    their thoughts in a small book, and then store it away in a
                    safe place. Diary app allows people to keep diaries on a
                    computer.
                  </Typography>
                </Box>
                <Box>
                  
                    <Button
                      variant="outlined"
                      style={{ marginTop: 25, color: "#ffd600" }}
                      onClick = { ()=> setIsSignin(!isSignin)}
                    >
                      {isSignin ? 'signup' :'signin'}
                    </Button>
                 
                </Box>
              </Box>
            </Grid>
          </Hidden>
          <Grid item md={6} container alignItems="center" justify="center">
            <Box px={5} className={classes.signup}>
              <Box py={2} style={{ color: "#263238" }}>
                <Typography variant="h4">{isSignin ? 'sigin' :'signup'}</Typography>
              </Box>
              <Box>
                <form onSubmit = { handleSubmit(submitForm)}>
                  <Box my = {2}>
                  <Controller
                        as={<TextField id="standard-full-width"  fullWidth />}
                        name="username"
                        fullWidth
                        label="Username"
                        size="small"                       
                        variant="outlined"
                        helperText={errors.username?.message}
                        error={errors && errors.username && true}
                        control={control}
                        defaultValue=""
                      />
                  </Box>
                  <Box>
                  <Controller
                        as={<TextField />}
                        name="password"
                        fullWidth
                        label="Password"
                        size="small"                       
                        variant="outlined"
                        type="password"
                        helperText={errors.password?.message}
                        error={errors && errors.password && true}
                        control={control}
                        defaultValue=""
                      />
                  </Box>

                  <Box my = {2} >
                  <Controller
                        as={<TextField />}
                        name="email"
                        fullWidth
                        label="Email"
                        size="small"                       
                        variant="outlined"
                        helperText={errors.email?.message}
                        error={errors && errors.email && true}
                        control={control}
                        defaultValue=""
                      />
                  </Box>

                  <Box py={1}>
                    <Button
                      variant="outlined"
                      disableElevation
                      style={{ color: "#060c21", marginTop: 30 }}
                      type="submit"
                    >
                     {isSignin ? 'sigin' :'signup'}
                    </Button>

                    <Hidden mdUp>                      
                        <Button
                          variant="outlined"
                          style={{
                            color: "#060c21",
                            marginTop: 30,
                            marginLeft: 32,
                          }}      
                          onClick = { ()=> setIsSignin(!isSignin)}
                        >
                          {isSignin ? 'signup' :'signin'}

                        </Button>
                     
                    </Hidden>
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Auth;
