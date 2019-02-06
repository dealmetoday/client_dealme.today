import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as emailValidator from "email-validator";
import MenuItem from '@material-ui/core/MenuItem';



const lists = {
  age: [
      {value: 1, label: '0-13yrs'},
    {value: 2, label: '14-16yrs'},
    {value: 3, label: '17-19yrs'},
    {value: 4, label: '20-22yrs'},
    {value: 5, label: '23-25yrs'},
    {value: 6, label: '26-28yrs'},
    {value: 7, label: '29-30yrs'},
    {value: 8, label: '+30yrs'}
  ],
  gender: [
    {value: 1, label: 'female'},
    {value: 2, label: 'male'},
    {value: 3 , label: 'other'}
  ],
  default_mall: [
    {value: 1, label: 'Richmond Center'},
    {value: 2, label: 'MetroTown'}

  ],
  tags: [
    {value: 1, label: 'Haircuts'},
    {value: 2, label: 'Sandwiches'}

  ]

}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

class UserModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.handleChange.bind(this)
  }

  handleChange = name => event => {
   /* switch(name) {
      case 'age':
      case 'gender':
      case 'default_mall':
      case 'tags':
        name = 'listValue'
        break;
    }*/



    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    let inputComp;

    switch(this.props.id){
      case 'firstName':
      case 'lastName':
      case'email':
        inputComp = (
          <TextField
            id={this.props.id}
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange(this.props.id)}
          />
        )
        break
      case 'age':
      case 'gender':
      case 'default_mall':
      case 'tags':
        inputComp = (
          <TextField
            id={this.props.id}
            select
            label="Select an option"
            onChange={this.handleChange(this.props.id)}
            style={{width:"100%", paddingBottom: "25px"}}
            value={this.state[this.props.id]}
          >
            {lists[this.props.id].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )
        break
      default:
        inputComp =(<div></div>)



    }

    return (
      <div>
        <Modal
          open={this.props.openModal}
          onClose={this.props.handleClose}
          className={classes.modal}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {this.props.modalLabel}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {inputComp}
            </Typography>
            <Button variant="contained"
                    color="primary"
                    onClick={() => this.props.updateField(this.props.id, this.state[this.props.id])}
                    disabled={this.props.id === 'email' && !emailValidator.validate(this.state[this.props.id])}


            > SAVE</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

UserModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const UserModalWrapped = withStyles(styles)(UserModal);

export default UserModalWrapped;