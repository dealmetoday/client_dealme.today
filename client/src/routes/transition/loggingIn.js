import React from 'react';
import queryString from 'query-string'
import { connect } from 'react-redux';
import {sendParams} from '../../actions/loggingIn'


class LoggingIn extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    let params = queryString.parse(this.props.location.hash)
    this.props.sendParams(params);

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
  sendParams
})

export default connect(mapStateToProps, mapDispatchToProps)(LoggingIn);