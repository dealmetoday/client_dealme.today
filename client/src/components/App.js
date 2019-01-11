import React from 'react'
import axios from 'axios'
import "./main.css"
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import FacebookLoginButton from './FacebookLoginButton';
import FacebookLogin from 'react-facebook-login';
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu"

const responseFacebook = (response) => {
    console.log(response);
}

const componentClicked = () => {
   console.log('clicked')
}
export default class App extends React.Component {
    state = {
        username: null
    };


    componentWillMount() {

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
                                    <div className="App-intro">
                                        { !username &&
                                        <div>
                                            <p>Click on one of any button below to login</p>
                                            <FacebookLoginButton onLogin={this.onFacebookLogin}>
                                                <button>Facebook</button>
                                            </FacebookLoginButton>
                                        </div>
                                        }
                                        {username &&
                                        <p>Welcome back, {username}</p>
                                        }
                                    </div>
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

