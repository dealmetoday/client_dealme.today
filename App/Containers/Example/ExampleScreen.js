import React, { Component } from 'react'
import { Platform, Text, View, Button, Linking, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import AuthActions from 'App/Stores/Auth/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import SignUpForm from '../../Components/SignUpForm'
import axios from 'axios'
let { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import crpyto from 'react-native-crypto'
import '../../../shim.js';



import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const MailIcon = {
  name: 'mail',
  size: 24,
  color: '#F5B512',
  iconStyle: {paddingRight: 16, left: 0}
}

class ExampleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSigninInProgress: false,
      user: null,
      signUpErr: null
    }
    this.handleEmailLogIn.bind(this)
    this.handleEmailSignUp.bind(this)
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '84477259757-3di3d87li4lgq4pr7q7987h6n83f5boo.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '84477259757-qst0agnr3uujrnmu73hsglf2stsf395e.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    })
    axios.get('https://api.dealme.today/pubkey').then(resp => {
      this.props.updatePubKey(resp.data)
    })
  }

  handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      const params = {
        email: userInfo.user.email,
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        role:'user',
        token: userInfo.user.id
      }
      console.log(params)

      axios.put('https://api.dealme.today/Auth/login/social', params).then(resp => {
        console.log(resp)
        if(resp.data.status === 'Success'){
          console.log(resp.data.Bearer)
          this.props.loginGoogleSuccess(resp.data.Bearer)
          axios.defaults.headers.common = this.props.config
          axios.get(`https://api.dealme.today/user/profile?id=${'5c386f357eb1a4767f9f1bb0'}`, {}, this.props.config).then( resp => {
            console.log(resp.data)
            this.props.updateUserProfile(resp.data)
            this.props.navigation.navigate('UserScreen')
          }).catch(error => {
            console.log(error)
          })
        }
        else {
          console.log('Something went wrong!')
        }
      }).catch(error => {
        console.log('Error: ' + error)
      })
    }
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  handleFacebookLogin = async (user) => {
    try{
      axios.get(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${user.credentials.token }`).then(resp => {
        let params = {
          email: resp.data.email,
          firstName: resp.data.first_name,
          lastName: resp.data.last_name,
          token: resp.data.id,
          role: 'user'
        }
        axios.put('https://api.dealme.today/Auth/login/social', params).then(resp => {
          console.log(resp)
        }).catch(error => {
          console.log(error)
        })
      })

    }catch (error) {
      console.log(error)
    }
  }

  handleEmailSignUp = (email,password) => {
    if(this.validateEmail(email)) {
      if(this.validatePass(password)) {
        let buffer = Buffer.from(password)
        let key = {
          key: this.props.auth.pubKey,
          padding: 1
        }
        let hashed = crpyto.publicEncrypt(key, buffer).toString('base64')
        axios.defaults.headers.common = this.props.config
        let params = {
          data: hashed
        }
        axios.put('https://api.dealme.today/user/check', params).then(resp => {
          console.log(resp)
        }).catch(error => {
          console.log(error)
        })

      }
      else{
        this.setState({
          signUpErr: 'Invalid Password. Must contain: one lowercase letter, one uppercase letter, one number and minimum of 8 characters.'
        })
      }
    }
    else {
      this.setState({
        signUpErr: 'invalid email'
      })
    }


  }

  handleEmailLogIn = (email,password) => {
    let buffer = Buffer.from(password)
    let key = {
      key: this.props.auth.pubKey,
      padding: 1
    }
    let hashed = crpyto.publicEncrypt(key, buffer).toString('base64')
    const params = {
      email,
      role: 'user',
      password: hashed
    }

    axios.put('https://api.dealme.today/auth/login/email', params).then(resp => {

      if(resp.data.status === 'Success'){
        this.props.loginGoogleSuccess(resp.data.Bearer)
        axios.defaults.headers.common = this.props.config
        axios.get(`https://api.dealme.today/users?email=${email}`, {}, this.props.config).then( resp => {
          console.log(resp.data)
          this.props.updateUserProfile(resp.data)
          this.props.navigation.navigate('UserScreen')
        }).catch(error => {
          console.log(error)
        })
      }
      else {
        console.log('Something went wrong!')
      }

      console.log(resp)
    }).catch( error => {
      console.log(error)
    })


  }

  navigate = (url) => { // E
    const { navigate } = this.props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const routeName = route.split('/')[0]
    if (routeName === 'LaunchScreen') {
      navigate('UserScreen', {})
    };
  }

  validateEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
  }

  validatePass = (password) => {
    let lowerCheck = /[a-z]/g;
    let upperCheck = /[A-Z]/g;
    let numCheck = /[0-9]/g;
    return password.match(lowerCheck) && password.match(upperCheck) && password.match(numCheck) && password.length >= 8
  }

  render() {
    return (
      <View style={Style.container}>
        <ScrollView contentContainerStyle={Style.container}>
          <View style={{...Style.section, alignItems: 'center', height: '33%'}}>
            <Text style={{textAlign: 'center', color: '#7C2218', marginTop: '45%', fontSize: 72, fontWeight: '600'}} h1>Dealme</Text>
          </View>

          <View style={{...Style.section, height: '15%'}} >
            <FBLogin style={{width: '100%', height: 48}}
                     onLogin={this.handleFacebookLogin}
                     permissions={["email", "public_profile"]}
            />
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.handleGoogleLogin}
              disabled={this.state.isSigninInProgress} />
          </View>
          <View style={Style.section} >
            <Text style={{textAlign: 'center', marginBottom: 12}} h3> Log in or Sign up</Text>
            <SignUpForm Icon={MailIcon} emailSignUp={this.handleEmailSignUp} emailLogIn={this.handleEmailLogIn}/>
          </View>
          {this.state.signUpErr ? <Text style={{color: 'red'}}>{this.state.signUpErr}</Text> : null}

        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  config: state.auth.config

})

const mapDispatchToProps = (dispatch) => ({
  loginGoogleSuccess: (Bearer)=> dispatch(ExampleActions.loginGoogleSuccess(Bearer)),
  updateUserProfile: (id) => dispatch(AuthActions.updateUserProfile(id)),
  updatePubKey: (pubKey) => dispatch(AuthActions.updatePubKey(pubKey))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
