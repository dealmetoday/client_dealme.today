import React, { Component } from 'react'
import { Button, Icon, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'

class FooterNav extends Component {
  render () {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.props.openDealsScreen}>
            <Icon name='apps' />
          </Button>
          <Button onPress={this.props.openQRScreen}>
            <Icon name='camera' />
          </Button>
          <Button active>
            <Icon active name='navigate' />
          </Button>
          <Button onPress={this.props.openProfileScreen}>
            <Icon name='person' />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterNav)
