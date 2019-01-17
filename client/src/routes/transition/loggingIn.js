import React from 'react';
import queryString from 'query-string'
import { connect } from 'react-redux';
import {updateLogin} from '../../actions/Auth'


class LoggingIn extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    let params = queryString.parse(this.props.location.hash)
    this.props.updateLogin(params.user_id)
    this.props.history.push('/user/profile')

  }

  render() {
    return(
      <div>Loading</div>
    )

  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
  updateLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(LoggingIn);