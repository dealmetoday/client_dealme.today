import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import {changePage} from "../../../actions/App";


const styles = {
  root: {
    width: "100%",
    bottom: "0"
  },
};

class BottomNav extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    }
    this.handleChange.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({ value });

    switch(value){
      case 0:
        this.props.handleChange("/deals", value);
        break;
      case 1:
        this.props.handleChange("/user/profile", value)
        break;
      case 2:
        this.props.handleChange("/about", value)
        break
    }

  };

  render() {
    const { classes } = this.props;
    const value  = this.props.app.pageValue;
    console.log(this.props)

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Deals" icon={<MoneyIcon/>} />
        <BottomNavigationAction label="Profile" icon={<SettingsIcon />} />
        <BottomNavigationAction label="About" icon={<InfoIcon/>} />
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = ({
  changePage
})

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps)(BottomNav)

export default withStyles(styles)(reduxWrapper);