import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import './styles/userProfile.css';

const styles = theme => ({
  menu: {
    width: 200,
  },
  button: {
    width: "50%"
  }
})

const ageRange = {
  0: '0-13yrs',
  1: '14-16yrs',
  2: '17-19yrs',
  3: '20-22yrs',
  4: '23-25yrs',
  5: '26-28yrs',
  6: '29-30yrs',
  7: '+30yrs'


}


const malls = [
  {value: 1, label: 'Richmond Center'},
  {value: 2, label: 'MetroTown'}

]

const UserProfile = (props) => {
  const {classes} = props;
  const profile = props.user.profile;

  return(
      <Grid container>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <div className={'page-heading'}><h1>Profile</h1></div>
        </Grid>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <div style={{width: "100%"}}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="First Name"
                    secondary={profile.firstName || "not yet provided"}
                  />
                  <ListItemIcon> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Name"
                    secondary={profile.lastName || "not yet provided"}
                  />
                  <ListItemIcon> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={profile.email || "not yet provided"}
                  />
                  <ListItemIcon> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Age"
                    secondary={ageRange[profile.age] || "not yet provided"}
                  />
                  <ListItemIcon> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gender"
                    secondary={profile.gender}
                  />
                  <ListItemIcon> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Shopping Interests"
                    secondary={"not yet provided"}
                  />
                  <ListItemIcon> <EditIcon/></ListItemIcon>
                </ListItem>


              </List>
            </div>
            <div style={{width: "100%"}}>

           {/* <TextField
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
            </TextField>*/}
            </div>


          </form>
          <Grid item xs={12}>
            <div style={{textAlign: "center", paddingBottom: "18px", paddingTop: "18px"}}>
              <Button variant="contained" color="primary" className={classes.button} onClick={props.handleSaveProfile}>
                SAVE
              </Button>
            </div>
           </Grid>

        </Grid>


      </Grid>

  )


}

export default withStyles(styles)(UserProfile)