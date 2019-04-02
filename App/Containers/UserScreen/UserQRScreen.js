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

  openQRScreen = () => {
    this.props.navigation.navigate('UserQRScreen')
  }

  openProfileScreen = () => {
    this.props.navigation.navigate('UserProfileScreen')
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
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleSaveProfile} leftLabel={'Back'} title={'QR Scan'} rightLabel={'Logout'} />
        <ScrollView style={styles.container}>
          <View>
            <QRCodeScanner
              onRead={this.onSuccess.bind(this)}
              topContent={
                <View>
                    <Text style={{...styles.centerText, fontSize: 22, marginTop: 12, marginBottom: 12}}>
                     Coming soon!
                    </Text>
                </View>
              }
              bottomContent={
                <View style={{marginTop: 16}}>
                  <Text style={styles.centerText}>
                    Scan QR Codes to get even more deals!
                  </Text>
                </View>
              }
              cameraType={'back'}
            />
          </View>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen} openQRScreen={this.openQRScreen} active={'QRScreen'}/>

      </View>
    )
  }
}



