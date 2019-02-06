import React from 'react'
import axios from 'axios'
import "./styles/main.css"
import Grid from "@material-ui/core/Grid"
import AuthContainer from '../Auth/AuthContainer'
import { connect } from 'react-redux';
import {authEmail, authFacebook, authGoogle} from "../../actions/Auth";



class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: null
    }
  }


  componentWillMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.auth.isLoggedIn)
    this.props.history.push('/deals');

  }

  render() {
    return (
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6} style={{textAlign: "center"}}>
          <h1>Deal.io</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}/>
            <Grid item xs={10}>
              <AuthContainer history={this.props.history}/>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)