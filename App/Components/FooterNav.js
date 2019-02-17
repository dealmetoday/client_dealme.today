import React, { Component } from 'react'
import { Button, Icon, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'

class FooterNav extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name='apps' />
          </Button>
          <Button>
            <Icon name='camera' />
          </Button>
          <Button active>
            <Icon active name='navigate' />
          </Button>
          <Button>
            <Icon name='person' />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterNav)
