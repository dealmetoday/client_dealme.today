import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import UserScreen from '../Containers/UserScreen/UserScreen'
import StoreScreen from '../Containers/StoreScreen/StoreScreen'
import UserProfileScreen from '../Containers/UserScreen/UserProfileScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen},
  UserScreen: {screen: UserProfileScreen},
  StoreScreen: {screen: StoreScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'UserScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
