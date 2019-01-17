import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem"
import Button from '@material-ui/core/Button'



const styles = theme => ({
  menu: {
    width: 200,
  },
  button: {
    width: "50%"
  }
})


const malls = [
  {value: 1, label: 'Richmond Center'},
  {value: 2, label: 'MetroTown'}

]

const UserProfile = (props) => {
  const {classes} = props

  return(
    <Paper elevation={2}>
      <Grid container>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <div><h1>Profile</h1></div>
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <form noValidate autoComplete="off">
            <div style={{width: "100%"}}>
            <TextField
              id="outlined-firstName"
              label="First Name"
              value={props.profile.firstName}
              onChange={props.handleChange('firstName')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-lastName"
              label="Last Name"
              value={props.profile.lastName}
              onChange={props.handleChange('lastName')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-email"
              label="email"
              value={props.profile.email}
              onChange={props.handleChange('email')}
              margin="normal"
              variant="outlined"
            />
            </div>
            <div style={{width: "100%"}}>

            <TextField
              id="standard-select-currency"
              select
              label="Select Default Mall"
              value={props.profile.defaultMall}
              onChange={props.handleChange('defaultMall')}
              style={{width:"100%", paddingBottom: "25px"}}
            >
              {malls.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </div>


          </form>
          <Grid item xs={12}>
            <div style={{textAlign: "center", paddingBottom: "18px"}}>
              <Button variant="contained" color="primary" className={classes.button} onClick={props.handleSaveProfile}>
                SAVE
              </Button>
            </div>
           </Grid>

        </Grid>


      </Grid>
    </Paper>


  )


}

export default withStyles(styles)(UserProfile)