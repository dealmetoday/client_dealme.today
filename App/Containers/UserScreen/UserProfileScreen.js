import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text, Input, Label } from 'native-base'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'

// SCREENS
// Styles
import styles from '../Styles/LaunchScreenStyles'
import ExampleActions from '../../Stores/Example/Actions'
import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'


const ageList = [
  {
    value: 1,
    label: '0-13yrs'
  },
  {
    value: 2,
    label: '14-16yrs'
  },
  {
    value: 3,
    label: '17-19yrs'
  },
  {
    value: 4,
    label: '20-22yrs'
  },
  {
    value: 5,
    label: '23-25yrs'
  },
  {
    value: 6,
    label: '26-28yrs'
  },
  {
    value: 7,
    label: '+30yrs'
  }
]

const genderList = [
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: "Male",
    label: 'Male'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]

const tagsList = {
  1: 'Haircuts',
  2: 'Sandwiches'
}


class UserProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigninInProgress: false,
      age: 0
    }
    this.handleInputChange.bind(this)
    this.onValueChange.bind(this)
    this.openQRScreen.bind(this)
    this.openDealScreen.bind(this)
  }

  componentDidMount(){
    const {email, first, last, gender, age, location} = this.props.auth.profile;
    this.setState({
      firstName: first,
      lastName: last,
      email: email,
      age,
      gender,
      location


    })
  }

  onValueChange (value, field) {
    this.setState({
      [field]: value
    })
  }

  handleBackButton = () => {
    this.props.navigation.pop()
  }

  openDealScreen = () => {
    this.props.navigation.navigate('UserDealsScreen')
  }

  openQRScreen = () => {
    console.log('HI')
    this.props.navigation.navigate('UserQRScreen')
  }

  handleInputChange (event, field) {
    this.setState({
      [ field ]: event.nativeEvent.text
    })
  }

  handleSaveProfile = () => {
    const {firstName, lastName, email, age, gender} = this.state
    let updatedProfile = {
      firstName,
      lastName,
      email,
      age,
      gender
    }
    console.log(updatedProfile)
  }

  render () {

    return (
      <View style={styles.mainContainer}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleSaveProfile} leftLabel={'Back'} title={'Profile'} rightLabel={'Save'} />
        <ScrollView style={styles.container}>
          <View>
            <Form>
              <Item fixedLabel>
                <Label>First Name</Label>
                <Input value={this.state.firstName} onChange={event => this.handleInputChange(event, 'firstName')} />
              </Item>
              <Item fixedLabel>
                <Label>Last Name</Label>
                <Input value={this.state.lastName} onChange={event => this.handleInputChange(event, 'lastName')} />
              </Item>
              <Item fixedLabel>
                <Label>Email</Label>
                <Input value={this.state.email} onChange={event => this.handleInputChange(event, 'email')} />
              </Item>
              <Item fixedLabel>
                <Label>Age</Label>
                <Input value={this.state.age} onChange={event => this.handleInputChange(event, 'age')} />
              </Item>
              <Item fixedLabel>
                <Label>Gender</Label>
                <Picker
                  note
                  mode='dropdown'
                  selectedValue={this.state.gender}
                  onValueChange={value => this.onValueChange(value, 'gender')}
                  placeholder='Select Gender'
                  style={{ width: undefined }}
                  iosIcon={<Icon name='arrow-down' />}
                >
                  {
                    genderList.map(anOption => {
                      return <Picker.Item key={anOption.value} label={anOption.label} value={anOption.value} />
                    })
                  }
                </Picker>
              </Item>
              <Item inlineLabel last>
                <Input placeholder={'Shopping Interest'} />
              </Item>
            </Form>
          </View>
          <View style={{}}>
            <Button rounded light>
              <Text>Save</Text>
            </Button>
          </View>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen} openQRScreen={this.openQRScreen} active={'ProfileScreen'}/>

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
)(UserProfileScreen)