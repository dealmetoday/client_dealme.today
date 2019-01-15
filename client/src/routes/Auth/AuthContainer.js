import React from 'react';
import { connect } from 'react-redux';
import Auth from './components/Auth';
import {authFacebook, authGoogle, authEmail} from "../../actions/Auth";
import * as emailValidator from "email-validator";


class AuthContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleChange.bind(this)
    this.handleFormLogin.bind(this)
    this.state = {
      email: null,
      password: null,
      isFormValid: false
    }
  }


  componentWillMount(){
  }

  handleChange = name => event => {
    console.log(emailValidator.validate(this.state.email))
    this.setState({
      [name]: event.target.value,
      isFormValid: (emailValidator.validate(this.state.email))
    });
  };

  handleFormLogin = () => {
    let credentials = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(credentials)
    this.props.authEmail(credentials)

  }


  render(){
    return (
      <Auth authFacebook={this.props.authFacebook}
            authGoogle={this.props.authGoogle}
            handleChange={this.handleChange}
            isFormValid={this.state.isFormValid}
            handleFormLogin={this.handleFormLogin}
      />
    )


  }


}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  authFacebook,
  authGoogle,
  authEmail
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);