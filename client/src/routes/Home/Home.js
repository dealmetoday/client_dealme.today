import React from 'react'
import axios from 'axios'
import "./styles/main.css"
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu"
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


const componentClicked = () => {
  console.log('clicked')
}

const responseGoogle = (response) => {
  console.log(response);
}

class Home extends React.Component {

  constructor(props){
    super(props);
    this.responseFacebook.bind(this)
    this.state = {
      username: null
    }
  }


  componentWillMount() {

  }
  responseFacebook = (response) => {
    console.log("hi")
    console.log(response);
  }


  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name
      });
    } else {
      alert('Facebook login error');
    }
  }




  render() {
    const { username } = this.state;
    return (
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6} style={{textAlign: "center"}}>
          <h1>Deal.io</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>
              <Paper elevation={1}>
                <div className={"sign-in-header"}>
                  <h2>Sign In or Register</h2>
                  <Divider/>
                </div>
                <div className={'social-media-signup'}>
                  <FacebookLogin
                    appId="794859637527349"
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    redirectUri={"localhost:5000/api/dashboard"}
                    scope="public_profile"
                  />

                  <a href={`https://www.facebook.com/v3.2/dialog/oauth?client_id=${'794859637527349'}&redirect_uri=${'http://localhost:5000/api/dashboard'}&state=${'123'}&response_type=${'code%20granted_scopes'}&scope=public_profile,email`}>CLICK HERE</a>
                </div>
                <Divider/>
                <div className={'email-signup'}>
                </div>


              </Paper>

            </Grid>
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

export default Home