import React from 'react'
import UserProfile from './UserProfile';
import { connect } from 'react-redux';
import * as emailValidator from "email-validator/index";



class UserProfileContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleChange.bind(this)
    this.state = {
      defaultMall: null,
      firstName: null,
      lastName: null
    }
  }
  componentWillMount(){

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render(){
    return (
      <div className={'user-profile-Container'}>
        <UserProfile user={this.props.user} handleChange={this.handleChange} profile={this.state}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);