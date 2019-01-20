import React from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import UserProfileContainer from './components/UserProfile/UserProfileContainer'
import NavBar from './components/NavBar/NavBar'
import BottomNav from '../layout/BottomNav/BottomNav'
import './styles/userContainer.css'




class UserContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleRouteChange.bind(this)
  }

  componentWillmounte(){

  }
  handleRouteChange = (path) => {
    this.props.history.push(path)
  }

  render(){
    return (
      <div className={'user-container'}>
        <NavBar/>
        <UserProfileContainer/>
        <BottomNav handleChange={this.handleRouteChange}/>
      </div>

    )


  }



}


const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

