import React from 'react';
import Link from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import "../styles/Auth.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const styles = {}


const Auth = (props) => {
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
              Email and Password
            </Grid>
          </Grid>
          </Grid>
        </div>
      </Paper>


    </div>


)

}

export default withStyles(styles)(Auth);