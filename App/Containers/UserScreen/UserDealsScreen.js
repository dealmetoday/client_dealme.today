import React, { Component } from "react";
import { ScrollView, View, Image, Modal, TouchableHighlight, DeviceEventEmitter } from "react-native";
import { Thumbnail, Text, Button, Left, Body, Right, List, ListItem, Content, Alert, Card, CardItem } from "native-base";
import HeaderNav from "../../Components/HeaderNav";
import FooterNav from "../../Components/FooterNav";
import { connect } from "react-redux";
import axios from "axios";
import QRCode from "../../Images/frame.png";
import Beacons from "react-native-beacons-manager";
import Moment from 'react-moment'
import moment from 'moment'

// Styles
import styles from "../Styles/LaunchScreenStyles";
import DealActions from "../../Stores/Deals/Actions";
import StoreActions from "../../Stores/Stores/Actions";
import MallActions from '../../Stores/Malls/Actions'
import UserActions from '../../Stores/User/Actions'
import TagActions from '../../Stores/Tags/Actions'
import AuthActions from '../../Stores/Auth/Actions'

const store1 = {
  identifier: "Children's-mart",
  uuid: "00000000-5c82-fd4b-5497-0ebde13bcebf"
};


class UserDealsScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSigninInProgress: false,
      modalVisible: false,
      selectedStore: null,
      QRModalVisible: false,
      showCode: false
    };
  }

  componentDidMount () {
    let dealsParams = {
      expiryDate: "1970-01-18T23:08:08.395Z",
      active: true,
      mall: this.props.user.profile.favouriteMalls[0]
    };

    let tags = this.props.user.profile.tags.join(",");
    axios.get(`https://api.dealme.today/deals?expiryDate=${dealsParams.expiryDate}&available=true&mall=${dealsParams.mall}&tags=${tags}`).then(resp => {
      const dealsGroups = resp.data;
      dealsGroups.sort((a, b) => (a._id > b._id) ? 1 : (a._id < b._id) ? -1 : 0);
      let storeIds = [];
      dealsGroups.map(dealGroup => {
        storeIds.push(dealGroup._id);
      });

      axios.get(`https://api.dealme.today/stores?_id=${storeIds.join(",")}`).then(resp => {
        console.log(resp.data);
        let stores = resp.data;
        stores.sort((a, b) => (a._id > b._id) ? 1 : (a._id < b._id) ? -1 : 0);
        let finalDeals = [];

        stores.map((aStore, index) => {
          console.log(dealsGroups[index]);
          finalDeals.push({
            ...aStore,
            dealsList: dealsGroups[index].dealList
          });
        });
        console.log(finalDeals);

        this.props.getDeals(finalDeals);
        this.props.getStores(stores);

      });

      Beacons.requestWhenInUseAuthorization();
      /*  Beacons.startMonitoringForRegion(store3);
        Beacons.startRangingBeaconsInRegion(store3);
        Beacons.startMonitoringForRegion(store2);
        Beacons.startRangingBeaconsInRegion(store2);*/
      Beacons.startMonitoringForRegion(store1);
      Beacons.startRangingBeaconsInRegion(store1);
      Beacons.startUpdatingLocation();

      const subscription = DeviceEventEmitter.addListener(
        "beaconsDidRange",
        (data) => {
          let uuid = data.region.uuid
          uuid = uuid.replace(/-/g, '')
          uuid = uuid.substr(8);
          uuid = uuid.toLowerCase()
          console.log(uuid)
          if (this.props.stores) {
            let storeToUpdate = this.props.stores.stores.find(aStore=> {
              console.log(aStore._id)
              return aStore._id === uuid
            })
            console.log(storeToUpdate)
            if(storeToUpdate) {
              console.log(data.beacons)
              if (data.beacons.length === 0) {
                if(storeToUpdate.isStoreInRange) this.props.storeOutOfRange(this.props.stores.stores, uuid)
              }
              else {
                if(!storeToUpdate.isStoreInRange)this.props.storeInRange(this.props.stores.stores, uuid)
              }
            }
          }
        });

    }).catch(err => console.log(err));
  }

  setModalVisible (visible, store) {
    this.setState({
      modalVisible: visible,
      selectedStore: store,
      isStoreInRange: true
    });
  }

  handleBackButton = () => {
    this.props.navigation.pop();
  };

  openProfileScreen = () => {
    this.props.navigation.navigate("UserProfileScreen");
  };
  handleLogout = () => {
    console.log("logging out");
    this.props.resetDeals();
    this.props.resetMalls();
    this.props.resetStores();
    this.props.resetTags();
    this.props.resetUser();
    this.props.resetAuth();
    this.props.navigation.navigate("MainScreen")

  };

  openDealScreen = () => {
    this.props.navigation.navigate("UserDealsScreen");
  };

  openQRScreen = () => {
    console.log("HI");
    this.props.navigation.navigate("UserQRScreen");
  };

  render () {
    let store
    if(this.state.selectedStore){
      store = this.props.stores.stores.find(aStore => {
        return aStore._id === this.state.selectedStore._id
      })
    }
    let todaysDate = moment();

    return (
      <View style={styles.mainContainer} testID={"UserDealScreenContainer"}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleLogout} leftLabel={"Back"}
                   title={"Deals"} rightLabel={"Logout"}/>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{ marginTop: 35, width: "100%"}}>{
            !this.state.showCode ?
              <View>
                {

                  this.state.selectedStore && this.state.selectedStore.dealsList.map(aDeal => {
                    let timeLeft = moment.duration(todaysDate.diff(aDeal.expiryDate))
                    console.log(timeLeft)


                    return (
                      aDeal.usesLeft > 0 ?
                      <Card style={{ marginTop: 6 }}>
                        <CardItem header>
                          <Left>
                            <View style={{display: "flex", flexDirection:"column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                              <View style={{ textAlign: "left"}}>
                                <Text style={{ fontWeight: 'bold'}}p>{aDeal.description}</Text>
                              </View>
                              <View style={{ textAlign: "left"}}>
                                <Text style={{ color: "#3C3C3C", fontSize: 12 }} p>
                                  {`Expires in : ${Math.floor(timeLeft.asDays())} days, ${timeLeft.hours()} hours, ${timeLeft.minutes()} mins`}
                                </Text>
                              </View>
                              <View style={{ textAlign: "left"}}>
                                <Text style={{ color: aDeal.usesLeft > 0 ? "green" : "red", fontSize: 12 }} p>{`${aDeal.usesLeft} codes left!`}</Text>
                              </View>
                            </View>
                          </Left>
                          <Right>
                            <Button transparent disabled={!store.isStoreInRange} onPress={() => {
                              this.setState({
                                showCode: true
                              });
                            }}>
                              <Text>{ store.isStoreInRange ? "view" : "locked"}</Text>
                            </Button>
                          </Right>
                        </CardItem>
                      </Card> : null
                    );
                  })

                }
                <View style={{justifyContent: 'center',
                  alignItems: 'center', width: "100%"}}>
                  <View>
                  <Button
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={{width: 250, justifyContent: 'center',
                      alignItems: 'center', marginTop: 35}}>
                    <Text>CLOSE</Text>
                  </Button>
                  </View>
                </View>
              </View>
              :
              <View  style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View>
                  <Image source={QRCode}/>
                </View>
                <View>
                  <Button
                    onPress={() => {
                      this.setState({
                        showCode: false
                      });
                    }}
                    style={{width: 250, justifyContent: 'center',
                      alignItems: 'center', marginTop: 35}}
                  >
                    <Text style={{textAlign: "center", width: "100%"}}>BACK</Text>
                  </Button>
                </View>
              </View>
          }
          </View>
        </Modal>

        <ScrollView style={styles.container}>
          <Content>
            <List>
              {
                this.props.deals.deals.map(aStore => {
                  let mall;
                  let store;
                  if (this.props.stores.stores && this.props.malls.malls) {
                    store = this.props.stores.stores.find(a => a._id === aStore._id);
                    if (store) mall = this.props.malls.malls.find(a => a._id === store.mall);
                  }

                  return (
                    <ListItem thumbnail key={aStore._id}>
                    <Left>
                        <Thumbnail square
                                   source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }}/>
                      </Left>
                      <Body>
                      <Text>{store ? store.name : "Store name unavailable"}</Text>
                      <Text note
                            numberOfLines={1}>{mall ? mall.name : "Mall name unavailable"}</Text>
                      <Text note numberOfLines={1}
                            style={{ color: "green", fontSize: 12 }}>{aStore.dealsList.length + " Deals Available!"}</Text>
                      </Body>
                      <Right>
                        <Button transparent onPress={() => {
                          this.setModalVisible(true, aStore);
                        }}>
                          <Text>View</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  );
                })
              }
            </List>
          </Content>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen}
                   openQRScreen={this.openQRScreen} active={"DealsScreen"}/>
      </View>
    );
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

});

const mapDispatchToProps = (dispatch) => ({
  getDeals: (deals) => dispatch(DealActions.getDeals(deals)),
  getStores: (stores) => dispatch(StoreActions.getStores(stores)),
  getStores: (stores) => dispatch(StoreActions.getStores(stores)),
  resetDeals: () => dispatch(DealActions.resetToInitialState()),
  resetStores: () => dispatch(StoreActions.resetToInitialState()),
  resetTags: () => dispatch(TagActions.resetToInitialState()),
  resetUser: () => dispatch(UserActions.resetToInitialState()),
  resetMalls: () => dispatch(MallActions.resetToInitialState()),
  resetAuth: () => dispatch(AuthActions.resetToInitialState()),
  storeInRange: (stores, uuid) => dispatch(StoreActions.storeInRange(stores,uuid)),
  storeOutOfRange: (stores, uuid) => dispatch(StoreActions.storeOutOfRange(stores,uuid))


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDealsScreen);