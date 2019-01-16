import React from 'react'
import "./main.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from "../store/configureStore";
const store = configureStore();
import Home from '../routes/Home/Home';
import LoggingIn from '../routes/transition/loggingIn'
import UserContainer from '../routes/User/UserContainer';
import AuthSuccess from "./AuthSuccess";
import {PrivateRoute} from './PrivateRoute';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: null
    }
  }


    componentWillMount() {

    }


    render() {
        return (
            <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/dashboard' component={Home}/>
                <Route path='/loggingIn' component={LoggingIn}/>
                <Route path="/auth/success" component={AuthSuccess} />
                <PrivateRoute path='/user/profile' component={UserContainer} isAuthenticated={this.props.auth.isLoggedIn}/>
              </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App);