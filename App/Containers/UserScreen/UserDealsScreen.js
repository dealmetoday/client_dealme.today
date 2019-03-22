import React, { Component } from "react";
import { ScrollView, View, Image, Modal, TouchableHighlight } from "react-native";
import { Thumbnail, Text, Button, Left, Body, Right, List, ListItem, Content, Alert, Card, CardItem } from "native-base";
import HeaderNav from "../../Components/HeaderNav";
import FooterNav from "../../Components/FooterNav";
import { connect } from "react-redux";
import axios from "axios";
import QRCode from "../../Images/frame.png";

// Styles
import styles from "../Styles/LaunchScreenStyles";
import DealActions from "../../Stores/Deals/Actions";
import StoreActions from "../../Stores/Stores/Actions";
import MallActions from '../../Stores/Malls/Actions'
import UserActions from '../../Stores/User/Actions'
import TagActions from '../../Stores/Tags/Actions'
import AuthActions from '../../Stores/Auth/Actions'


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

    }).catch(err => console.log(err));
  }

  setModalVisible (visible, store) {
    this.setState({
      modalVisible: visible,
      selectedStore: store
    });
  }

  setQRModalVisible (visible) {
    this.setState({
      QRModalVisible: visible
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
    return (
      <View style={styles.mainContainer} testID={"UserDealScreenContainer"}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleLogout} leftLabel={"Back"}
                   title={"Deals"} rightLabel={"Logout"}/>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={{ marginTop: 35 }}>{
            !this.state.showCode ?
              <View>
                {
                  this.state.selectedStore && this.state.selectedStore.dealsList.map(aDeal => {
                    return (
                      <Card style={{ marginTop: 6 }}>
                        <CardItem header button onPress={() => alert("This is Card Header")}>
                          <Left>
                            <View style={{ textAlign: "left" }}>
                              <Text p>{aDeal.description}</Text>
                              <Text style={{ color: aDeal.usesLeft > 0 ? "green" : "red" }}
                                    p>{aDeal.usesLeft > 0 ? `${aDeal.usesLeft} codes left!` : "unavailable"}</Text>
                            </View>
                          </Left>
                          <Right>
                            <Button transparent disabled={false} onPress={() => {
                              this.setState({
                                showCode: true
                              });
                            }}>
                              <Text>{"view"}</Text>
                            </Button>
                          </Right>
                        </CardItem>
                      </Card>
                    );
                  })

                }
                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>CLOSE</Text>
                </Button>
              </View>
              :
              <View style={{ textAlign: "center" }}>
                <Image source={QRCode}/>
                <Button
                  onPress={() => {
                    this.setState({
                      showCode: false
                    });
                  }}>
                  <Text>BACK</Text>
                </Button>
              </View>
          }
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.QRModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={{ marginTop: 35 }}>
            <Image soruce={QRCode}/>
          </View>
          <Button
            onPress={() => {
              this.setQRModalVisible(!this.state.QRModalVisible);
            }}>
            <Text>Hide Modal</Text>
          </Button>

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
                            numberOfLines={1}>{mall ? mall.name : "Mall name unavailable"}{aStore.dealsList.length + " Deals Available!"}</Text>
                      <Text note numberOfLines={1}
                            style={{ color: "green" }}>{aStore.dealsList.length + " Deals Available!"}</Text>
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
  resetAuth: () => dispatch(AuthActions.resetToInitialState())


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDealsScreen);