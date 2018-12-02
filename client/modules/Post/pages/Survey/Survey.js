import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Components

// Import Actions
// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';
import PropTypes from 'prop-types';
import './survey.css';


class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }
  render() {
    return (
      <div style={{height: "100%"}}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfPDQsk2b1PGHdRyFOafNigmYWcs16_E19PLe9p8vszxk6gTg/viewform?embedded=true"
          width="640" height="2351" frameBorder="0" marginHeight="0" marginWidth="0">Loading...
        </iframe>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

Survey.propTypes = {
};

Survey.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Survey);
