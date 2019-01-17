import React from 'react'
import UserProfile from './UserProfile';
import { connect } from 'react-redux';
import "./userProfileContainer.css";



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
    console.log(this.props.user)
    return (
      <div className={'user-profile-Container'}>
        <UserProfile user={this.props.user} handleChange={this.handleChange}/>
      </div>
    )
  }




}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);