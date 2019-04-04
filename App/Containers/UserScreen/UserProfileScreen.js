import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Form, Item, Picker, Icon, Text, Input, Label, Toast, Spinner } from 'native-base'
import HeaderNav from '../../Components/HeaderNav'
import FooterNav from '../../Components/FooterNav'
import axios from 'axios'
import MultiSelect from 'react-native-multiple-select';

// SCREENS
// Styles
import styles from '../Styles/LaunchScreenStyles'
import { connect } from 'react-redux'
import AuthActions from '../../Stores/Auth/Actions'
import TagActions from '../../Stores/Tags/Actions'
import MallActions from '../../Stores/Malls/Actions'
import UserActions from '../../Stores/User/Actions'
import DealActions from "../../Stores/Deals/Actions";
import StoreActions from "../../Stores/Stores/Actions";


const genderList = [
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: "Male",
    label: 'Male'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]

class UserProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigninInProgress: false,
      age: 0,
      showToast: false,
      tags: [],
      favouriteMalls: "",
      showSpinner: true
    }
    this.handleInputChange.bind(this)
    this.onValueChange.bind(this)
    this.openQRScreen.bind(this)
    this.openDealScreen.bind(this)
    this.handleSaveProfile.bind(this)
  }

  componentDidMount(){

    let promiseArr = []
    promiseArr.push(axios.get('https://api.dealme.today/tags').then(resp => {
      this.props.getTags(resp.data)
    }))

    promiseArr.push(axios.get('https://api.dealme.today/malls').then(resp =>{
      this.props.getMalls(resp.data)
    }))


    Promise.all(promiseArr).then(resp => {
      const {email, first, last, gender, age, location, middle, tags, favouriteMalls, provider} = this.props.user.profile;
      this.setState({
        first: first,
        last: last,
        email: email,
        age,
        gender,
        location,
        middle,
        tags,
        favouriteMalls: favouriteMalls[0],
        showSpinner: false,
        provider
      })
      }
    )

  }

  onValueChange (value, field) {
    this.setState({
      [field]: value
    })
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

  handleInputChange (event, field) {
    this.setState({
      [ field ]: event.nativeEvent.text
    })
  }

  handleSaveProfile = () => {
    let oldProfile = this.props.auth.profile || {};
    let updatedMalls = []
    updatedMalls.push(this.state.favouriteMalls)

    let updatedProfile = {
      id: this.props.auth.id,
      first: this.state.first !== oldProfile.first ? this.state.first : oldProfile ? oldProfile.first : "",
      middle: this.state.middle !== oldProfile.middle ? this.state.middle : oldProfile ? oldProfile.middle : "",
      last: this.state.last !== oldProfile.last ? this.state.last :oldProfile ?  oldProfile.last : "",
      email: this.state.email !== oldProfile.email ? this.state.email : oldProfile ? oldProfile.email : "",
      age: this.state.age !== oldProfile.age ? this.state.age.toString() : oldProfile ? oldProfile.age.toString() : "",
      gender: this.state.gender !== oldProfile.gender ? this.state.gender : oldProfile ? oldProfile.gender : "",
      location: this.state.location !== oldProfile.location ? this.state.location : oldProfile ? oldProfile.location : "",
      tags: this.state.tags !== oldProfile.tags ? this.state.tags : oldProfile ? oldProfile.tags : [],
      favouriteMalls: updatedMalls

    }
    axios.defaults.headers.common = this.props.config

    axios.put('https://api.dealme.today/users', updatedProfile).then(resp => {
      axios.defaults.headers.common = this.props.config
      axios.get(`https://api.dealme.today/user/profile?id=${this.props.auth.id}`).then(resp => {
        this.props.getUserProfile(resp.data);
        Toast.show({
          text: "Profile Saved",
          buttonText: "Okay",
          duration: 10000
        })

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

          });

        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    }).catch(err => {
      console.log(err)
      Toast.show({
        text: "Error Saving Profile",
        buttonText: "Okay",
        duration: 10000

      })
    })
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({
      tags: selectedItems
    })
  };

  render () {

    return (
      this.state.showSpinner ?
        <View style={{justifyContent: 'center', alignItems: 'center', width: "100%"}} testID={"User-Deal-Screen-Spinner"}>
          <View style={{marginTop: 300}}>
            <Spinner color="red" style={{width: 150, height: 150}}/>
          </View>
        </View>
        :
      <View style={styles.mainContainer} testID={'UserProfileScreenContainer'}>
        <HeaderNav handleLeftButton={this.handleBackButton} handleRightButton={this.handleSaveProfile} leftLabel={'Back'} title={'Profile'} rightLabel={'Save'} />
        <ScrollView style={styles.container}>
          <View>
            <Form>
              <Item fixedLabel style={{height: 75}}>
              <Label>First Name</Label>
                <Input value={this.state.first} testID={'user-profile-first'} />
              </Item>
              <Item fixedLabel style={{height: 75}}>

              <Label>Middle Name</Label>
                <Input value={this.state.middle} onChange={event => this.handleInputChange(event, 'middle')} testID={'user-profile-middle'}/>
              </Item>
              <Item fixedLabel style={{height: 75}}>

              <Label>Last Name</Label>
                <Input value={this.state.last} testID={'user-profile-last'} />
              </Item>
              <Item fixedLabel style={{height: 75}}>

              <Label>Email</Label>
                <Input value={this.state.email} testID={'user-profile-email'} editable={false}/>
              </Item>
              <Item fixedLabel style={{height: 75}}>

              <Label>Age</Label>
                <Input keyboardType='numeric' value={this.state.age.toString()} onChange={event => this.handleInputChange(event, 'age')} testID={'user-profile-age'}/>
              </Item>
              <Item fixedLabel style={{height: 75}}>
                <Picker
                  mode="dropdown"
                  placeholder="Select your default Mall"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={this.state.favouriteMalls}
                  onValueChange={value => this.onValueChange(value, 'favouriteMalls')}
                  testID={'user-profile-favourite-mall'}
                >
                  {
                    this.props.malls.malls.map(aMall => {
                      return <Picker.Item key={aMall._id} label={aMall.name} value={aMall._id} />
                    })
                  }

                </Picker>
              </Item>
              <Item fixedLabel style={{height: 75}}>
                <Picker
                  note
                  mode='dropdown'
                  selectedValue={this.state.gender}
                  onValueChange={value => this.onValueChange(value, 'gender')}
                  placeholder='Select Gender'
                  style={{ width: undefined }}
                  iosIcon={<Icon name='arrow-down' />}
                  testID={'user-profile-gender'}
                >
                  {
                    genderList.map(anOption => {
                      return <Picker.Item key={anOption.value} label={anOption.label} value={anOption.value} />
                    })
                  }
                </Picker>
              </Item>
            </Form>
            <Item fixedLabel style={{height: 150, marginLeft: 16}}>
              <View style={{width: "100%"}}>
                <MultiSelect
                  items={this.props.tags.tagList}
                  uniqueKey="id"
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.tags}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  styleMainWrapper={{width: 500, paddingLeft: 16}}
                  styleInputGroup={{width: 500, paddingLeft: 16}}
                  fontSize={16}
                />
              </View>
            </Item>
          </View>
        </ScrollView>
        <FooterNav openDealsScreen={this.openDealScreen} openProfileScreen={this.openProfileScreen} openQRScreen={this.openQRScreen} active={'ProfileScreen'}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  config: state.auth.config,
  user: state.user,
  tags: state.tags,
  malls: state.malls

})

const mapDispatchToProps = (dispatch) => ({
  updateUserProfile: (id) => dispatch(AuthActions.updateUserProfile(id)),
  getTags: (tags) => dispatch(TagActions.getTags(tags)),
  getMalls: (malls) => dispatch(MallActions.getMalls(malls)),
  getUserProfile: (profile) => dispatch(UserActions.getUserProfile(profile)),
  getDeals: (deals) => dispatch(DealActions.getDeals(deals)),
  getStores: (stores) => dispatch(StoreActions.getStores(stores))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen)