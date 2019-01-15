import React from 'react';
import Link from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import "../styles/Auth.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'


const styles = theme => ({
  button: {
    width: "50%"
  }


})

const Auth = (props) => {
  const {classes} = props
  return (
    <div className={'Auth'}>
      <Paper elevation={1}>
        <div className={"sign-in-header"}>
          <h2>Sign In or Register</h2>
          <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>
              <Divider/>
            </Grid>
          </Grid>
        </div>
        <div className={''}>
          <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>
              <FacebookLoginButton onClick={props.authFacebook}/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
              <GoogleLoginButton onClick={props.authGoogle}/>
            </Grid>
          <Grid container>
            <Grid item xs={3}/>
            <Grid item xs={6} style={{textAlign: "center"}}>
              <h2> OR </h2>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={1}/>

            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={5}>
                  <TextField
                    id="email"
                    label="Email"
                    value={props.username}
                    onChange={props.handleChange('email')}
                    margin="normal"
                    variant="outlined"
                    style={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={5}>
                  <TextField
                    id="password"
                    label="Password"
                    type='password'
                    value={props.username}
                    onChange={props.handleChange('password')}
                    margin="normal"
                    variant="outlined"
                    style={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={12} style={{textAlign: "center", paddingTop: "25px", paddingBottom: "25px"}}>
                  <Button disabled={!props.isFormValid} variant="contained" color="primary" className={classes.button} onClick={props.handleFormLogin}>
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </div>
      </Paper>


    </div>


)

}

export default withStyles(styles)(Auth);