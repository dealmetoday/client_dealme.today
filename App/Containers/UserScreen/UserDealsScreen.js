import React, { Component } from 'react'
import { ScrollView, View, Image, Modal, TouchableHighlight} from 'react-native'
import { Thumbnail, Text, Button, Left, Body, Right, List, ListItem, Content, Alert,  Card, CardItem} from 'native-base'
import FringeLogo from '../../Images/onTheFringe.png'
import FringeBanner from '../../Images/onTheFringeBanner.png'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'
import { connect } from 'react-redux'
import axios from 'axios'

// Styles
import styles from '../Styles/LaunchScreenStyles'
import DealActions from '../../Stores/Deals/Actions'
import StoreActions from '../../Stores/Stores/Actions'


class UserDealsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigninInProgress: false,
      modalVisible:false,
      selectedStore: null
    }
  }

  componentDidMount(){
    let dealsParams = {
      expiryDate: "1970-01-18T23:08:08.395Z",
      active: true,
      mall: this.props.user.profile.favouriteMalls[0]
    }

    let tags = this.props.user.profile.tags.join(",")
      axios.get(`https://api.dealme.today/deals?expiryDate=${dealsParams.expiryDate}&available=true&mall=${dealsParams.mall}&tags=${tags}`).then(resp => {
        const dealsGroups = resp.data;
        dealsGroups.sort((a,b) => (a._id > b._id) ? 1 : (a._id < b._id) ? -1 : 0)
        let storeIds = []
        dealsGroups.map(dealGroup => {
          storeIds.push(dealGroup._id)
        })

        axios.get(`https://api.dealme.today/stores?_id=${storeIds.join(',')}`).then(resp => {
          console.log(resp.data)
          let stores = resp.data
          stores.sort((a,b) => (a._id > b._id) ? 1 : (a._id < b._id) ? -1 : 0)
          let finalDeals = []

          stores.map((aStore,index) => {
            console.log(dealsGroups[index])
            finalDeals.push({
              ...aStore,
              dealsList: dealsGroups[index].dealList
            })
          })
          console.log(finalDeals)

          this.props.getDeals(finalDeals)
          this.props.getStores(stores)

        })



      }).catch(err =>console.log(err))
  }

  setModalVisible(visible, store) {
    this.setState({
      modalVisible: visible,
      selectedStore: store
    });
  }


  handleBackButton = () => {
    this.props.navigation.pop()
  }

  openProfileScreen = () => {
    this.props.navigation.navigate('UserProfileScreen')
  }
  handleLogout = () => {
    console.log("logging out")
  }

  openDealScreen = () => {
    this.props.navigation.navigate('UserDealsScreen')
  }

  openQRScreen = () => {
    console.log('HI')
    this.props.navigation.navigate('UserQRScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleLogout} leftLabel={'Back'} title={'Deals'} rightLabel={'Logout'} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 35}}>
            <View>
                {
                  this.state.selectedStore && this.state.selectedStore.dealsList.map(aDeal => {
                    return(
                      <Card style={{marginTop: 6}}>
                        <CardItem header button onPress={() => alert("This is Card Header")}>
                          <Left><Text>{aDeal.description}</Text></Left>
                          <Right>
                            <Button transparent  onPress={() => {
                            }}>
                              <Text>Unlock</Text>
                            </Button>
                          </Right>
                        </CardItem>
                      </Card>
                    )
                  })


                }
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <ScrollView style={styles.container}>
          <Content>
          <List>
            {
              this.props.deals.deals.map( aStore =>{
                let mall;
                let store
                if(this.props.stores.stores && this.props.malls.malls) {
                  store = this.props.stores.stores.find(a => a._id === aStore._id)
                  if (store) mall = this.props.malls.malls.find(a => a._id === store.mall)
                }

              return(
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                  </Left>
                  <Body>
                  <Text>{store ? store.name : "Store name unavailable"}</Text>
                  <Text note numberOfLines={1}>{mall ? mall.name: "Mall name unavailable"}{aStore.dealsList.length + " Deals Available!"}</Text>
                  <Text note numberOfLines={1} style={{color: 'green'}}>{aStore.dealsList.length + " Deals Available!"}</Text>
                  </Body>
                  <Right>
                    <Button transparent  onPress={() => {
                      this.setModalVisible(true, aStore);
                    }}>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              )
            })

            }

          </List>
          </Content>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen} openQRScreen={this.openQRScreen} active={'DealsScreen'}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  config: state.auth.config,
  user: state.user,
  tags: state.tags,
  malls: state.malls,
  deals: state.deals,
  stores: state.stores

})

const mapDispatchToProps = (dispatch) => ({
  getDeals: (deals) => dispatch(DealActions.getDeals(deals)),
  getStores: (stores) => dispatch(StoreActions.getStores(stores))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDealsScreen)