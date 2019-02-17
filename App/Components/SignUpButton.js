
import React, { Component } from 'react'
import { Input } from 'react-native-elements'

export default class SignUpButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      label: props.label
    }
  }
  render () {
    const { secureTextEntry } = this.props
    return (
      <Input
        placeholder={this.props.label}
        leftIcon={this.props.Icon}
        leftIconContainerStyle={{marginLeft: 0}}
        containerStyle={{borderColor: '#ccc', borderWidth: 2, borderRadius: 15, marginTop: 6, marginBottom: 6}}
        inputContainerStyle={{borderBottomWidth: 0}}
        secureTextEntry
      />
    )
  }
}
