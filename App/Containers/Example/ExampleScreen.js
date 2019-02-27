import React, { Component } from 'react'
import { Platform, Text, View, Button, Linking, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import SafariView from 'react-native-safari-view'
import SignUpForm from '../../Components/SignUpForm'
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');




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
    }
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
  }

  handleOpenURL = (event) => { // D
    this.navigate(event.url)
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
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

  navigate = (url) => { // E
    const { navigate } = this.props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const routeName = route.split('/')[0]

    if (routeName === 'LaunchScreen') {
      navigate('UserScreen', {})
    };
  }

  _signInServer = async () => {
    try {
      SafariView.addEventListener('onDismiss', () => {
        this.handleOpenURL({url: 'appdeal://LaunchScreen'})
      })
      SafariView.isAvailable()
        .then(
          SafariView.show({ url: 'https://api.dealme.today/auth/login/google' })
        )
        .catch(error => {
          // Fallback WebView code for iOS 8 and earlier
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }
  handleLogin(data) {
    console.log(data.credentials)
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
                     onLogin={this.handleLogin}
                     permissions={["email","user_friends"]}
            />
            <GoogleSigninButton
              style={{ width: '100%', height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />
          </View>
          <View style={Style.section} >
            <Text style={{textAlign: 'center', marginBottom: 12}} h3> Sign Up</Text>
            <SignUpForm Icon={MailIcon} />
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
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
