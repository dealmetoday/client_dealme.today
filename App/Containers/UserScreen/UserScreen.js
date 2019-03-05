import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text, Input } from 'native-base'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'
import { createStackNavigator, createAppContainer } from 'react-navigation'


// SCREENS
import UserDealsScreen from './UserDealsScreen'
import UserProfileScreen from './UserProfileScreen'
import UserQRScreen from './UserQRScreen'

// Styles
import styles from '../Styles/LaunchScreenStyles'

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
    value: 1,
    label: 'Female'
  },
  {
    value: 2,
    label: 'Male'
  },
  {
    value: 3,
    label: 'Other'
  }
]

const tagsList = {
  1: 'Haircuts',
  2: 'Sandwiches'
}


class UserScreen extends Component {
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
              <Item inlineLabel>
                <Input placeholder={'First Name'} onChange={event => this.handleInputChange(event, 'firstName')} />
              </Item>
              <Item inlineLabel last>
                <Input placeholder={'Last Name'} onChange={event => this.handleInputChange(event, 'lastName')} />
              </Item>
              <Item inlineLabel>
                <Input placeholder={'Email'} onChange={event => this.handleInputChange(event, 'email')} />
              </Item>
              <Item>
                <Picker
                  note
                  mode='dropdown'
                  selectedValue={this.state.age}
                  onValueChange={value => this.onValueChange(value, 'age')}
                  placeholder='Select Age Range'
                  style={{ width: undefined }}
                  iosIcon={<Icon name='arrow-down' />}
                >
                  {
                    ageList.map(anOption => {
                      return <Picker.Item key={anOption.value} label={anOption.label} value={anOption.value} />
                    })
                  }
                </Picker>
              </Item>
              <Item inlineLabel last>
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
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen} openQRScreen={this.openQRScreen} />



      </View>
    )
  }
}

const stackNavigator = createStackNavigator({
  UserScreen: {screen: UserScreen},
  UserDealsScreen: {screen: UserDealsScreen},
  UserProfileScreen: {screen: UserProfileScreen},
  UserQRScreen: {screen: UserQRScreen}
}, {
  cardStyle: {
    opacity: 1
  },
  initialRouteName: 'UserProfileScreen',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Icon name={'close'} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})

export default createAppContainer(stackNavigator)