import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import "./styles/Deals.css"
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import DealCard from "./components/DealCard";




const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Deals extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  render() {
    const { classes, deals } = this.props;

    return (
      <div className={'deal-cards-list'}>
        {
          deals.map((aDeal, index) => {
            let store = this.props.stores.filter(aStore => {
              return aStore["_id"] === aDeal.store
            })
           return( <DealCard key={'_deal'+index} deal={aDeal} store={store}/>)
          })
        }


      </div>
    );
  }
}

Deals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deals);