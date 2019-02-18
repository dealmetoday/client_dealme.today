import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text } from 'native-base'
import { Input } from 'react-native-elements'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'

// SCREENS
// Styles
import styles from '../Styles/LaunchScreenStyles'

export default class UserProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigninInProgress: false,
      age: 0
    }
  }

  onValueChange (value: string) {
    this.setState({
      selected: value
    })
  }

  handleBackButton = () => {
    this.props.navigation.pop()
  }

  openDealScreen = () => {
    this.props.navigation.navigate('UserDealsScreen')
  }
  openProfileSCreen = () => {
    this.props.navigation.navigate('UserProfileScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <HeaderNav handleBackButton={this.handleBackButton} />
        <ScrollView style={styles.container}>
          <View>
            <Form>
              <Item inlineLabel>
                <Input placeholder={'First Name'} />
              </Item>
              <Item inlineLabel last>
                <Input placeholder={'Last Name'} />
              </Item>
              <Item inlineLabel>
                <Input placeholder={'Email'} />
              </Item>
              <Item>
                <Picker
                  note
                  mode='dropdown'
                  selectedValue={this.age}
                  onValueChange={this.onValueChange.bind(this)}
                  placeholder='Select Age Range'
                  style={{ width: undefined }}
                  iosIcon={<Icon name='arrow-down' />}
                >
                  <Picker.Item label='Wallet' value={0} />
                  <Picker.Item label='ATM Card' value={1} />
                  <Picker.Item label='Debit Card' value={2} />
                  <Picker.Item label='Credit Card' value={3} />
                  <Picker.Item label='Net Banking' value={4} />
                </Picker>
              </Item>
              <Item inlineLabel last>
                <Picker
                  note
                  mode='dropdown'
                  selectedValue={this.age}
                  onValueChange={this.onValueChange.bind(this)}
                  placeholder='Select Gender'
                  style={{ width: undefined }}
                  iosIcon={<Icon name='arrow-down' />}
                >
                  <Picker.Item label='Mail' value={0} />
                  <Picker.Item label='Female' value={1} />
                  <Picker.Item label='Other' value={2} />
                </Picker>
              </Item>
              <Item inlineLabel last>
                <Input placeholder={'Shopping Interest'} />
              </Item>
            </Form>
            <Button rounded light>
              <Text>Save</Text>
            </Button>
          </View>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen}/>

      </View>
    )
  }
}
