import React from 'react'
import axios from 'axios'
import "./main.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from "../store/configureStore";
const store = configureStore();
import Home from '../routes/Home/Home';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: null
    }
  }


    componentWillMount() {

    }


    render() {
        const { username } = this.state;
        return (
          <Provider store={store}>
            <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/dashboard' component={Home}/>
              </Switch>
            </Router>
          </Provider>

        );
    }
}

