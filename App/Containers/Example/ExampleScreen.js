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
      user: null
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

      axios.put('https://api.dealme.today/Auth/login/social',
        {
          email: "mihailo@shaw.ca",
          firstName: "Mihailo",
          lastName: "Stefanovic",
          role: "user",
          token: "asdasdasdsa"
        }).then(resp => {
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
    let buffer = Buffer.from(password)
    let key = {
      key: this.props.auth.pubKey,
      padding: 1
    }
    let hashed = crpyto.publicEncrypt(key, buffer).toString('base64')
    axios.defaults.headers.common = {
      Bearer: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJkZXZlbG9wZXIiLCJlbWFpbCI6ImRldkBkZXYuY29tIiwiaWQiOiJwODIxMzc1MDkxODI3MzE0MCIsImlhdCI6MTU1MTQxNzI1OSwiZXhwIjoxNTU0MDA5MjU5LCJhdWQiOiJhcGkuZGVhbG1lLnRvZGF5L2RldmVsb3BlciIsImlzcyI6ImRlYWxtZS50b2RheSIsInN1YiI6ImRldkBkZXYuY29tIn0.Wq_vpaPZMIzI22sbUy5FSI6ZqN9kpUvjETuwysPhl3L-xGhWB0gdNr28ev0oChwrNtR9r62FTAry5QxPH2eWdxQFxjLQ1Dwul-a-usGvyXtvjZjuKjBDaMOK7fOpnhzc1jQltlZi_yUt5WUW1nSL8DRm6PiCWSfR1ABSdDcjN-9XirQCRclwYZdSpQIyQ7vomJQU2o9eDSb6z4B-P-riaj6X1Z-B35Clp8XkTRD_fNyfzsd315k9uPJz7bNFcn64ioc1mSBa6KlmkxZqaEv5U0L8mPwnuUUokIJXtIQw2HiK1sb1s8nQ1wS4KliZnuiyYjaxMhqcYPJUW7fjuQJEzix9kpjyrxc33dFG62k_FjxPYFJsCTxd-lC07CYskZjLiQiCMMnPG-lRKmW9JePh7-ZnGo9cWZ3JGCvsap3vRZxU2hvv0-l09EHjeCRccj_t4RxPLVgVOT6TV0PKuaIV_PCtEKrhFa1SJE5y1iZIyQmZVBrD7alKRjiBQTfmHpbleQa1MCw2FSIJhr-9QKrN1K6ROx8P20CeMOEKiSwMwMqmyBAC_Pqk6xyOl1TCz_G6zncrr91PMjCyTZMf_It6cCSZbvkzoYCb7bDexUipUkwn_fWKc1X3bgWuOkd51tcNvdq0vVf7cxHxXyTCLcLCTaEttGz6XZTAWwJ0krI8aZE"
    }
    let params = {
      data: hashed
    }
    axios.put('https://api.dealme.today/test/decrypt', params).then( resp => {
      console.log(resp)
    }).catch ( error => {
      console.log(error)
    })


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

        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.example.get('user').toJS(),
  userIsLoading: state.example.get('userIsLoading'),
  userErrorMessage: state.example.get('userErrorMessage'),
  liveInEurope: liveInEurope(state),
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
