import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button'




const styles = theme => ({
  card: {
    marginTop: "2px",
    marginBottom: "2px"
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
  cardHeader: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }
});

class Deals extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  render() {
    const { classes,store } = this.props;
    console.log(store)


    return (
      <Card className={classes.card}>
        <CardHeader
          className={{title: classes.cardHeader}}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={this.props.deal.title}
          subheader={<span style={{fontSize: "11pt"}}>Expires <Moment from={this.props.deal.expiryDate} /></span>}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <Grid container>
                <Grid item xs={12}>
                  <p>Store: {store[0].name} <br/>
                    Description: {store[0].description}</p>
                </Grid>
                <Grid item xs={8} />
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    CLAIM
                  </Button>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Deals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deals);