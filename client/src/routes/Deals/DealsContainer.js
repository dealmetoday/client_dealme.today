import React from 'react'
import {connect} from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import BottomNav from '../layout/BottomNav/BottomNav';
import {changePage} from "../../actions/App";
import Deals from './Deals';
import './styles/DealsContainers.css'



class DealsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  handleRouteChange = (path, value) => {
    this.props.history.push(path);
    this.props.changePage(value)
  }


  render() {
    const {stores} = this.props.mall
    return (
      <div className={'deals-container'}>
        <NavBar/>
        <Deals deals={this.props.deals.deals} stores={stores}/>
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