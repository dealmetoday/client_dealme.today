import React from 'react';
import { connect } from 'react-redux';
import Auth from './components/Auth';
import {authFacebook, authGoogle} from "../../actions/Auth";


class AuthContainer extends React.Component {

  componentWillMount(){
    console.log("testing")
  }
  render(){
    return (
      <Auth authFacebook={this.props.authFacebook} authGoogle={this.props.authGoogle}/>
    )


  }


}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  authFacebook,
  authGoogle
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);