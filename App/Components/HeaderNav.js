import React, { Component } from 'react'
import { Header, Left, Body, Right, Button, Title, Form, Item, Picker, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'



class HeaderNav extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Header>
        <Left>
          <Button hasText transparent onPress={this.props.handleBackButton}>
            <Text>Back</Text>
          </Button>
        </Left>
        <Body>
        <Title>Profile</Title>
        </Body>
        <Right>
          <Button hasText transparent>
            <Text>Save</Text>
          </Button>
        </Right>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav)
