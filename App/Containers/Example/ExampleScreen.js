import React, { Component } from 'react'
import { Platform, Text, View, Button, Linking } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import SafariView from 'react-native-safari-view'


import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class ExampleScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSigninInProgress: false,
    }
  }
  componentDidMount() {
    this.props.fetchUser()
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

  render() {
    let isLoading = this.props.userIsLoading ? 'Data are loading...' : ''
    let user = this.props.user
    let error = this.props.userErrorMessage
    let result = null
    if (user && !error) {
      result =
        "I'm a fake user, my name is " +
        user.name +
        '.\n' +
        (this.props.liveInEurope ? 'I live in Europe !' : "I don't live in Europe.")
    }

    return (
      <View style={Style.container}>
        <Text style={Style.title}>TheCodingMachine boilerplate</Text>
        <Text style={Style.text}>To get started, edit App.js</Text>
        <Text style={Style.instructions}>{instructions}</Text>
        <Text style={Style.loading}>{isLoading}</Text>
        {user && !error ? (
          <Text style={Style.result}>{result}</Text>
        ) : (
          <Text style={Style.error}>{error}</Text>
        )}
        <Button onPress={this.props.fetchUser} title="Refresh" />

        <GoogleSigninButton
          style={{ width: '100%', height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signInServer}
          disabled={this.state.isSigninInProgress}
        />
      </View>
    )
  }
}

ExampleScreen.propsTypes = {
  user: PropTypes.number,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
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
