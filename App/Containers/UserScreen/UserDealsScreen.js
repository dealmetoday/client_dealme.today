import React, { Component } from "react";
import { ScrollView, View, Image, Modal, TouchableHighlight, DeviceEventEmitter } from "react-native";
import { Thumbnail, Text, Button, Left, Body, Right, List, ListItem, Content, Alert, Card, CardItem, Form, Label, Input, Item, Spinner } from "native-base";
import HeaderNav from "../../Components/HeaderNav";
import FooterNav from "../../Components/FooterNav";
import { connect } from "react-redux";
import axios from "axios";
import QRCode from "../../Images/frame.png";
import StoreLogo from '../../Images/storeLogo.png';
import Beacons from "react-native-beacons-manager";
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
  identifier: "Bath republic",
  uuid: "00000000-5c82-fd4b-dc2a-ed97be3bcaad",
  major: 10065,
  minor: 26049
};


const store2 = {
  identifier: "All Supermarket",
  uuid: "00000000-5c82-fd4b-1e9d-738b1b3bcb3d",
  major: 10065,
  minor: 26049
};

class UserDealsScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSigninInProgress: false,
      modalVisible: false,
      selectedStore: null,
      QRModalVisible: false,
      showCode: false,
      processBeacon: true,
      storePIN: "",
      selectedDeal: "",
      showSpinner: true
    };
    this.toggleSpinner.bind(this)
  }

  componentDidMount () {

    let tags = this.props.user.profile.tags.join(",");
    axios.get(`https://api.dealme.today/deals?available=true&mall=${this.props.user.profile.favouriteMalls[0]}&tags=${tags}`).then(resp => {
      const dealsGroups = resp.data;
      dealsGroups.sort((a, b) => (a._id > b._id) ? 1 : (a._id < b._id) ? -1 : 0);
      let storeIds = [];
      dealsGroups.map(dealGroup => {
        storeIds.push(dealGroup._id);
      });

      axios.get(`https://api.dealme.today/stores?_id=${storeIds.join(",")}`).then(resp => {
        let stores = resp.data;
        stores.sort((a, b) => (a._id > b._id) ? 1 : (a._id < b._id) ? -1 : 0);
        let finalDeals = [];
        stores.map((aStore, index) => {
          finalDeals.push({
            ...aStore,
            dealsList: dealsGroups[index].dealList
          });
        });
        this.props.getDeals(finalDeals);
        this.props.getStores(stores);
        this.props.initClaimedDeals(this.props.user.profile.dealHistory)
        this.toggleSpinner();


      }).catch(err => {
        this.toggleSpinner();
      });

      Beacons.requestWhenInUseAuthorization();
      Beacons.startMonitoringForRegion(store1);
      Beacons.startRangingBeaconsInRegion(store1);
      Beacons.startMonitoringForRegion(store2);
      Beacons.startRangingBeaconsInRegion(store2);
      Beacons.startUpdatingLocation();

      const subscription = DeviceEventEmitter.addListener(
        "beaconsDidRange",
        (data) => {
          if (this.state.processBeacon) {
            let uuid = data.region.uuid
            uuid = uuid.replace(/-/g, '')
            uuid = uuid.substr(8);
            uuid = uuid.toLowerCase()
            if (this.props.stores) {
              let storeToUpdate = this.props.stores.stores.find(aStore => {
                return aStore._id === uuid
              })
              if (storeToUpdate) {
                if (data.beacons.length !== 0) {
                  let theBeacon = data.beacons[0];
                  if ((theBeacon.proximity === "near" || theBeacon.proximity === "immediate") && theBeacon.accuracy < 3) {
                    this.props.storeInRange(this.props.stores.stores, uuid)
                    this.setState({
                      processBeacon: false,
                      beaconInterval: setTimeout(() => this.toggleProcessBeacon(), 10000)
                    })
                  }
                  else {
                    this.props.storeOutOfRange(this.props.stores.stores, uuid)
                  }
                }

              }
            }
          }
        })
    }).catch(err => {
      this.toggleSpinner();
    })
  }

  toggleProcessBeacon = () => {
   clearTimeout(this.state.beaconInterval)
    this.setState({
      processBeacon: true
    })
  }

  toggleSpinner = () => {
    this.setState({
      showSpinner: !this.state.showSpinner
    })
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
/*    this.props.resetDeals();
    this.props.resetMalls();
    this.props.resetStores();
    this.props.resetTags();
    this.props.resetUser();
    this.props.resetAuth();*/
    this.props.navigation.navigate("MainScreen")

  };

  openDealScreen = () => {
    this.props.navigation.navigate("UserDealsScreen");
  };

  openQRScreen = () => {
    this.props.navigation.navigate("UserQRScreen");
  };
  claimDeal = (dealID, userID) => {
    let params = {
      dealID,
      userID
    }
    console.log(params)
    axios.defaults.headers.common = this.props.config
    axios.put("https://api.dealme.today/deals/claim", params).then(resp => {
      console.log(resp.data)
      this.props.claimDeals(dealID)
      this.setState({
        showCode: false,
        selectedDead: "",
        storePIN: ""
      })
    })
  }
  handleInputChange (event, field) {
    this.setState({
      [ field ]: event.nativeEvent.text
    })
  }

  render () {
    let selectedStore
    if(this.state.selectedStore){
      selectedStore = this.props.stores.stores.find(aStore => {
        return aStore._id === this.state.selectedStore._id
      })
    }
    let todaysDate = moment();
    return (

      this.state.showSpinner ?
        <View style={{justifyContent: 'center',
          alignItems: 'center', width: "100%"}} testID={"User-Deal-Screen-Spinner"}>
          <View style={{marginTop: 300}}>
            <Spinner color="red" style={{width: 150, height: 150}}/>
          </View>
        </View>
        :
      this.props.user.profile.favouriteMalls[0] ?
      <View style={styles.mainContainer} testID={"UserDealScreenContainer"}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleLogout} leftLabel={"Back"}
                   title={"Deals"} rightLabel={"Logout"}/>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{ marginTop: 35, width: "100%"}} testID={'Deals-modal'}>{
            !this.state.showCode ?
              <View>
                {
                  this.state.selectedStore && this.state.selectedStore.dealsList.map((aDeal,index) => {
                    let timeLeft = moment.duration(todaysDate.diff(aDeal.expiryDate))
                    return (
                      <Card style={{ marginTop: 6 }} key={aDeal._id}>
                        <CardItem header>
                          <Left>
                            <View style={{display: "flex", flexDirection:"column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                              <View style={{ textAlign: "left"}} >
                                <Text style={{ fontWeight: 'bold'}} p testID={`promotion${index}_description`}>{aDeal.description}</Text>
                              </View>
                              <View style={{ textAlign: "left"}}>
                                <Text style={{ color: "#3C3C3C", fontSize: 12 }} p testID={`promotion${index}_expirey`}>
                                  {`Expires in : ${Math.floor(timeLeft.asDays())} days, ${timeLeft.hours()} hours, ${timeLeft.minutes()} mins`}
                                </Text>
                              </View>
                              <View style={{ textAlign: "left"}}>
                                <Text style={{ color: "green", fontSize: 12 }} p testID={`promotion${index}_quantity`}>{`${aDeal.usesLeft < 0 ? "unlimited" : aDeal.usesLeft} codes left!`}</Text>
                              </View>
                            </View>
                          </Left>
                          <Right>
                            <Button transparent onPress={() => {
                              this.setState({
                                showCode: true,
                                selectedDeal: aDeal._id
                              });
                            }}
                                    testID={`unlock-promotion${index}-button`}
                            >
                              <Text>{ this.props.deals.claimedDeals.indexOf(aDeal._id) !== -1 ? "CLAIMED" : selectedStore.isStoreInRange ? "view" : "locked"}</Text>
                            </Button>
                          </Right>
                        </CardItem>
                      </Card>
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
                      alignItems: 'center', marginTop: 35}}
                    testID={'promotions-close-button'}
                  >
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
                  <Text>Ask an Employee to scan your code</Text>
                </View>
                <View>
                  <Image source={QRCode} testID={'QR-Code'}/>
                </View>
                <View>
                  <Text>OR</Text>
                </View>
                <View>
                  <Form>
                    <Item floatingLabel style={{height: 75}}>
                      <Label>Store Pin Number</Label>
                      <Input value={this.state.storePIN}
                             testID={'store-pin'}
                             secureTextEntry

                             onChange={event => this.handleInputChange(event, 'storePIN')}
                      />
                    </Item>
                  </Form>
                  <Button
                    onPress={() => {
                      this.claimDeal(this.state.selectedDeal, this.props.user.profile._id)
                    }}
                    style={{width: 250, justifyContent: 'center',
                      alignItems: 'center', marginTop: 35}}
                    disabled={this.state.storePIN.length !== 4}
                    testID={'claim-button'}
                  >
                    <Text style={{textAlign: "center", width: "100%"}}>CLAIM</Text>
                  </Button>
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
                    primary
                    testID={'promotion-back-button'}
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
                this.props.deals.deals.map((aStore,index) => {
                  let mall;
                  let store;
                  if (this.props.stores.stores && this.props.malls.malls) {
                    store = this.props.stores.stores.find(a => a._id === aStore._id);
                    if (store) mall = this.props.malls.malls.find(a => a._id === store.mall);
                  }

                  return (
                    <ListItem thumbnail key={aStore._id}>
                    <Left>
                        <Thumbnail square source={StoreLogo}/>
                      </Left>
                      <Body>
                        <Text testID={`store${index}_NAME`}>{store ? store.name : "Store name unavailable"}</Text>
                        <Text note
                              numberOfLines={1}
                              testID={`store${index}_MALL`}
                        >{mall ? mall.name : "Mall name unavailable"}</Text>
                        <Text note numberOfLines={1}
                              style={{ color: "green", fontSize: 12 }}
                              testID={`store${index}_DEALNUM`}
                        >{aStore.dealsList.length + " Deals Available!"}</Text>
                      </Body>
                      <Right>
                        <Button transparent
                                onPress={() => {this.setModalVisible(true, aStore);}}
                                primary
                                testID={`store${index}_viewButton`}
                        >
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
      </View> :
        <View style={styles.mainContainer} testID={"UserDealScreenContainer-noMallSelected"}>
          <Text> Please select A mall from the profile page</Text>
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
  resetDeals: () => dispatch(DealActions.resetToInitialState()),
  resetStores: () => dispatch(StoreActions.resetToInitialState()),
  resetTags: () => dispatch(TagActions.resetToInitialState()),
  resetUser: () => dispatch(UserActions.resetToInitialState()),
  resetMalls: () => dispatch(MallActions.resetToInitialState()),
  resetAuth: () => dispatch(AuthActions.resetToInitialState()),
  storeInRange: (stores, uuid) => dispatch(StoreActions.storeInRange(stores,uuid)),
  storeOutOfRange: (stores, uuid) => dispatch(StoreActions.storeOutOfRange(stores,uuid)),
  claimDeals: (dealID) => dispatch(DealActions.claimDeal(dealID)),
  initClaimedDeals: (claimedDeals) => dispatch(DealActions.initClaimedDeals(claimedDeals))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDealsScreen);

//disabled={(this.props.deals.claimedDeals.indexOf(aDeal._id) !== -1) || !selectedStore.isStoreInRange}

//keyboardType={"number-pad"}