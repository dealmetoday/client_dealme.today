import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
    height: '100%'
  },
  centered: {
    alignItems: 'center'
  }
})

// MAIN COLORS

// #7C2218 - RED
// #F5B512 - YELLOW
// #FBFFFE - WHITE
// #191716 - BROWN
// #D58936 - TAN
