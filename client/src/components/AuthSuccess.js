import React, { Component } from 'react';

export default class AuthSuccess extends Component {
  constructor(props){
    super(props)
    this.setState({
      user: props.user
    })
  }
  componentDidMount() {
    console.log(this.props.location.hash.slice(1))
    const url = `/loggingIn#${this.props.location.hash.slice(1)}`;
    window.opener.open(url, '_self');
    window.opener.focus();
    window.close();
  }

  render() {
    return (
      <div>
        AUTH SUCCESS!
      </div>
    );
  }
}
