import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import HeaderNav from '../Components/HeaderNav'
import FooterNav from '../Components/FooterNav'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <HeaderNav dispatch={this.props.dispatch} state={this.props.nav}/>
        <ReduxNavigation />
        <FooterNav dispatch={this.props.dispatch} state={this.props.nav}/>
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)