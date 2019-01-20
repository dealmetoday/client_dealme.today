import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit'
import './styles/userProfile.css';

const ageList = {
  1: '0-13yrs',
  2: '14-16yrs',
  3: '17-19yrs',
  4: '20-22yrs',
  5: '23-25yrs',
  6: '26-28yrs',
  7: '29-30yrs',
  8: '+30yrs'
}

const genderList = {
  1: 'female',
  2: 'male',
  3: 'other'

}

const tagsList = {
  1: 'Haircuts',
  2: 'Sandwiches'
  }

const styles = theme => ({
  menu: {
    width: 200,
  },
  button: {
    width: "50%"
  }
})


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
                  <ListItemIcon onClick={() => props.handleOpen({label: 'First Name', type: 'text', id: 'firstName'})}> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Name"
                    secondary={profile.lastName || "not yet provided"}
                  />
                  <ListItemIcon onClick={() => props.handleOpen({label: 'Last Name', type: 'text', id: 'lastName'})}> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={profile.email || "not yet provided"}
                  />
                  <ListItemIcon onClick={() => props.handleOpen({label: 'Email', type: 'text', id: 'email'})}> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Age"
                    secondary={ageList[profile.age] || "not yet provided"}
                  />
                  <ListItemIcon onClick={() => props.handleOpen({label: 'Age', type: 'text', id: 'age'})}> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gender"
                    secondary={genderList[profile.gender] ||'not yet provided'}
                  />
                  <ListItemIcon onClick={() => props.handleOpen({label: 'Gender', type: 'text', id: 'gender'})}> <EditIcon/></ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Shopping Interests"
                    secondary={tagsList[profile.tags] ||"not yet provided"}
                  />
                  <ListItemIcon onClick={() => props.handleOpen({label: 'Shopping Interests', type: 'text', id: 'tags'})}> <EditIcon/></ListItemIcon>
                </ListItem>


              </List>
            </div>
            <div style={{width: "100%"}}>
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