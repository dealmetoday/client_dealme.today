
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

const buttonStyle = {
  height: 48,
  width: 100,
  borderRadius: 5,
  marginVertical: 10,
  backgroundColor: '#F5B512',
  justifyContent: 'center',
  display: 'flex',
  flex: 1
}
const buttonTextStyle = {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 14,
  marginVertical: 10
}

export default class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      label: props.label,
      email: null,
      password: null
    }
  }
  handleInputChange (event, field) {
    this.setState({
      [ field ]: event.nativeEvent.text
    })
  }

  render () {
    return (
      <View style={{justifyContent: 'center'}}>
        <Form>
          <Item inlineLabel>
            <Input placeholder={'Email'} onChange={event => this.handleInputChange(event, 'email')} testID={"Email-input"} keyboardType={'email-address'}/>
          </Item>
          <Item inlineLabel>
            <Input
              placeholder={'Password'}
              onChange={event => this.handleInputChange(event, 'password')}
              value={this.state.password}
              secureTextEntry
              testID={"Password-input"}
            />
          </Item>
        </Form>
        <View style={{flexDirection: 'row'}}>
          <Button rounded style={buttonStyle} onPress={() => this.props.emailSignUp(this.state.email,this.state.password)} testID={'SignUp-Button'}>
            <Text style={buttonTextStyle}>Sign Up</Text>
          </Button>
          <View style={{width: 15}} />
          <Button rounded style={buttonStyle} onPress={() => this.props.emailLogIn(this.state.email,this.state.password)} testID={'Login-Button'}>
            <Text style={buttonTextStyle}>Log in</Text>
          </Button>
        </View>
      </View>
    )
  }
}

