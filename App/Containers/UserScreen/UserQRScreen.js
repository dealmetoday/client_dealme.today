import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text, Input } from 'native-base'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'



// SCREENS
// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});


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

  render () {

    return (
      <View style={styles.mainContainer}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleSaveProfile} leftLabel={'Back'} title={'QR Scan'} rightLabel={'Save'} />
        <ScrollView style={styles.container}>
          <View>

          </View>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen}/>

      </View>
    )
  }
}

