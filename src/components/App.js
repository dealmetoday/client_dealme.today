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
import DealsContainer from "../routes/Deals/DealsContainer";

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
          <div className={'app-container'}>
            <Router>
              <Switch>
                <Route exact path='/' component={Home} location={this.props.location} history={this.props.history}/>
                <Route path='/dashboard' component={Home}/>
                <Route path='/loggingIn' component={LoggingIn}/>
                <Route path="/auth/success" component={AuthSuccess} />
                <PrivateRoute path='/user/profile' component={UserContainer} isAuthenticated={this.props.auth.isLoggedIn} location={this.props.location} history={this.props.history}/>
                <PrivateRoute path='/deals' component={DealsContainer} isAuthenticated={this.props.auth.isLoggedIn} location={this.props.location} history={this.props.history}/>

              </Switch>
            </Router>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App);