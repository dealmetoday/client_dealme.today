import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import UserProfileScreen from '../Containers/UserProfileScreen'
import UserDealsSCreen from '../Containers/UserDealsScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen},
  UserProfileScreen: {screen: UserProfileScreen},
  UserDealsScreen: {screen: UserDealsSCreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
