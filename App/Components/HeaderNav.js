import React, { Component } from 'react'
import { Header, Left, Body, Right, Button, Title, Text } from 'native-base'
import { connect } from 'react-redux'

// This is a generic header component for the App.
// When using this component, please specify the methods for
// the Left and Right button as props. Also specify the labels for the
// Left, Title, and Right buttons as props

class HeaderNav extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Header>
        <Left>
          <Button hasText transparent onPress={this.props.handleLeftButton}>
            <Text>{this.props.leftLabel}</Text>
          </Button>
        </Left>
        <Body>
        <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button hasText transparent onPress={this.props.handleRightButton} testID={"header-right-button"}>
          <Text>{this.props.rightLabel}</Text>
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
