import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text, Input, Label } from 'native-base'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'
import axios from 'axios'

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
      first: first,
      last: last,
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
    let oldProfile = this.props.auth.profile;

    let updatedProfile = {
      id: this.props.auth.id,
      first: this.state.first !== oldProfile.first ? this.state.first : oldProfile.first,
      middle: this.state.middle !== oldProfile.middle ? this.state.middle : oldProfile.middle,
      last: this.state.last !== oldProfile.last ? this.state.last : oldProfile.last,
      email: this.state.email !== oldProfile.email ? this.state.email : oldProfile.email,
      age: this.state.age !== oldProfile.age ? this.state.age : oldProfile.age,
      gender: this.state.gender !== oldProfile.gender ? this.state.gender : oldProfile.gender,
      location: this.state.location !== oldProfile.location ? this.state.location : oldProfile.location,
    }
    console.log(updatedProfile)
    axios.defaults.headers.common = this.props.config

    axios.put('https://api.dealme.today/users', updatedProfile).then(resp => {
      console.log(resp)
    }).catch( err => {
      console.log(err)
    })
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
                <Input value={this.state.first} onChange={event => this.handleInputChange(event, 'first')} />
              </Item>
              <Item fixedLabel>
                <Label>Middle Name</Label>
                <Input value={this.state.middle} onChange={event => this.handleInputChange(event, 'middle')} />
              </Item>
              <Item fixedLabel>
                <Label>Last Name</Label>
                <Input value={this.state.last} onChange={event => this.handleInputChange(event, 'last')} />
              </Item>
              <Item fixedLabel>
                <Label>Email</Label>
                <Input value={this.state.email} onChange={event => this.handleInputChange(event, 'email')} />
              </Item>
              <Item fixedLabel>
                <Label>Age</Label>
                <Input keyboardType='numeric' value={this.state.age} onChange={event => this.handleInputChange(event, 'age')} />
              </Item>
              <Item fixedLabel>
                <Label>Location</Label>
                <Input value={this.state.location} onChange={event => this.handleInputChange(event, 'location')} />
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
            <Button rounded light onPress={this.handleSaveProfile}>
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