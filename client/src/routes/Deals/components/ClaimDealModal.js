import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import QrReader from "react-qr-reader";
import axios from 'axios'


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ClaimDealModal extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      result: "Scan the Store's QR code to claim this deal!",
      claimed: false
    }
    this.handleScan = this.handleScan.bind(this);
  }
  
  handleError(err) {
    console.error(err);
  }

  handleScan(data) {
    if (data) {
      axios.put(data).then(res => {
        console.log(res)
        this.setState({
          result: `Deal Claimed!  ${data}`,
          claimed: true
        });
      })
    }
  }

  componentDidMount(){
    if(navigator.getUserMedia){
      navigator.getUserMedia(
        {
          video: true
        },
        function(localMediaStream){},
        function(err){
          alert('The following error occurred when trying to access the camera: ' + err);
        }
      );
    } else {
      alert('Sorry, browser does not support camera access');
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.isOpened}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "100%" }}
            />
            <p>{this.state.result}</p>
            <Button onClick={this.props.handleCloseClaims}>CLOSE</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

ClaimDealModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ClaimDealModalWrapped = withStyles(styles)(ClaimDealModal);

export default ClaimDealModalWrapped;