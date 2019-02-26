import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text, Input } from 'native-base'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'
import QRCodeScanner from 'react-native-qrcode-scanner';



// SCREENS
// Styles
import styles from '../Styles/LaunchScreenStyles'





export default class UserQRScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flashMode: false,
      zoom: 0.2
    };
  }


  handleBackButton = () => {
    this.props.navigation.pop()
  }

  openDealScreen = () => {
    this.props.navigation.navigate('UserDealsScreen')
  }

  bottomView = () => {
    return(
      <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
        <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
          <Text style={{color:'#fff'}}>点我开启/关闭手电筒</Text>
        </TouchableOpacity>
      </View>
    );
  }
  onRead = (res) => {
    console.log(res);
  }
  onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }

  render () {

    return (
      <View style={styles.mainContainer}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleSaveProfile} leftLabel={'Back'} title={'QR Scan'} rightLabel={'Save'} />
        <ScrollView style={styles.container}>
          <View>
            <QRCodeScanner
              onRead={this.onSuccess.bind(this)}
              topContent={
                <Text style={styles.centerText}>
                  Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                </Text>
              }
              bottomContent={
                <TouchableOpacity style={styles.buttonTouchable}>
                  <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
              }
              cameraType={'front'}
            />
          </View>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen}/>

      </View>
    )
  }
}



