import React, { Component } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'
import FringeLogo from '../../Images/onTheFringe.png'
import FringeBanner from '../../Images/onTheFringeBanner.png'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'

// Styles
import styles from '../Styles/LaunchScreenStyles'

export default class UserDealsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigninInProgress: false
    }
  }
  handleBackButton = () => {
    this.props.navigation.pop()
  }

  openProfileScreen = () => {
    this.props.navigation.navigate('UserProfileScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <HeaderNav handleBackButton={this.handleBackButton} />
        <ScrollView style={styles.container}>
          <Content>
            <View style={styles.section} >
              <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={FringeLogo} />
                    <Body>
                      <Text>On the Fringe</Text>
                      <Text note>Hair Salon</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source={FringeBanner} style={{height: 150, width: '100%', flex: 1}} />
                    <Text>
                      $2 off your next haircut
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button iconRight light>
                      <Icon name='home' />
                      <Text>Hair</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>1:02:58 left!</Text>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Content>
          <Content>
            <View style={styles.section} >
              <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={FringeLogo} />
                    <Body>
                      <Text>On the Fringe</Text>
                      <Text note>Hair Salon</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source={FringeBanner} style={{height: 150, width: '100%', flex: 1}} />
                    <Text>
                      $2 off your next haircut
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button iconRight light>
                      <Icon name='home' />
                      <Text>Hair</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Text>1:02:58 left!</Text>
                  </Right>
                </CardItem>
              </Card>
            </View>
          </Content>
        </ScrollView>
        <FooterNav openProfileScreen={this.openProfileScreen} />
      </View>
    )
  }
}
