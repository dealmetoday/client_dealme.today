import React from 'react'
import {connect} from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import BottomNav from '../layout/BottomNav/BottomNav';
import {changePage} from "../../actions/App";
import Deals from './Deals';
import './styles/DealsContainers.css'
import ClaimDealModal from "./components/ClaimDealModal";



class DealsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      claimsModalOpen: false
    }
  }

  handleRouteChange = (path, value) => {
    this.props.history.push(path);
    this.props.changePage(value)
  }

  handleOpenClaims = () => {
    this.setState({
      claimsModalOpen: true
    })
  }

  handleCloseClaims = () => {
    this.setState({
      claimsModalOpen: false
    })
  }

  render() {
    const {stores} = this.props.mall
    return (
      <div className={'deals-container'}>
        <ClaimDealModal isOpened={this.state.claimsModalOpen} handleCloseClaims={this.handleCloseClaims}/>
        <NavBar/>
        <Deals deals={this.props.deals.deals} stores={stores} handleOpenClaims={this.handleOpenClaims} handleCloseClaims={this.handleCloseClaims}/>
        <BottomNav handleChange={this.handleRouteChange}/>
      </div>
    )


  }


}


const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  deals: state.deals,
  mall: state.mall
});

const mapDispatchToProps = ({
  changePage
})

export default connect(mapStateToProps, mapDispatchToProps)(DealsContainer);