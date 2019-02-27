import React, { Component } from 'react'
import { Button, Icon, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'

class FooterNav extends Component {
  render () {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.props.openDealsScreen} active={this.props.active === 'DealsScreen'}>
            <Icon name='apps' />
          </Button>
          <Button onPress={this.props.openQRScreen} active={this.props.active === 'QRScreen'}>
            <Icon name='camera' />
          </Button>
          <Button>
            <Icon active name='navigate' />
          </Button>
          <Button onPress={this.props.openProfileScreen} active={this.props.active === 'ProfileScreen'}>
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
