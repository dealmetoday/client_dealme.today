import React, { Component } from 'react'
import { ScrollView, View, Linking} from 'react-native'
import { Text, Input } from 'react-native-elements'
import RegisterButton from '../../ignite/DevScreens/DevscreensButton.js'
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'
import SafariView from 'react-native-safari-view'
import SignUpButton from '../Components/SignUpButton'
import Icon from 'native-base'

// Styles
import styles from './Styles/LaunchScreenStyles'

const MailIcon = {
  name: 'mail',
  size: 24,
  color: '#F5B512',
  iconStyle: {paddingRight: 16, left: 0}
}

export default class LaunchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigninInProgress: false
    }
  }

  componentWillMount () {
    GoogleSignin.configure({
      webClientId: '84477259757-3di3d87li4lgq4pr7q7987h6n83f5boo.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '84477259757-qst0agnr3uujrnmu73hsglf2stsf395e.apps.googleusercontent.com' // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    })

    Linking.getInitialURL().then((url) => {
      console.log('Initial url is: ' + url)
      if (url) {
        console.log('Initial url is: ' + url)
      }
    }).catch(err => console.error('An error occurred', err))
  }

  componentWillUnmount () { // C
  }

  handleOpenURL = (event) => { // D
    this.navigate(event.url)
  }

  navigate = (url) => { // E
    const { navigate } = this.props.navigation
    const route = url.replace(/.*?:\/\//g, '')
    const routeName = route.split('/')[0]

    if (routeName === 'LaunchScreen') {
      navigate('UserProfileScreen', {})
    };
  }

  _signInServer = async () => {
    try {
      console.log('button pressed')
      SafariView.addEventListener('onDismiss', () => {
        console.log('Dissmissed')
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

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={{...styles.section, alignItems: 'center', height: '33%'}}>
            <Text style={{textAlign: 'center', color: '#7C2218', marginTop: '45%'}} h1>Dealme</Text>
          </View>

          <View style={{...styles.section, height: '15%'}} >
            <GoogleSigninButton
              style={{ width: '100%', height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signInServer}
              disabled={this.state.isSigninInProgress} />
          </View>
          <View style={styles.section} >
            <Text style={{textAlign: 'center', marginBottom: 12}} h3> Sign Up</Text>
            <SignUpButton Icon={MailIcon} />
          </View>

          <RegisterButton />
        </ScrollView>
      </View>
    )
  }
}
