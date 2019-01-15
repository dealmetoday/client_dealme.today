import React from 'react'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import UserProfileContainer from './components/UserProfile/UserProfileContainer'



class UserContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillmounte(){

  }

  render(){
    return (
      <div className={'user-container'}>
        <Grid container>
          <Grid item xs={12}>
            <div style={{textAlign: "center"}}>
              <h1>Welcome {this.props.user.firstName}</h1>
            </div>
          </Grid>
          <Grid item xs={12}>
            <UserProfileContainer/>
          </Grid>
        </Grid>
      </div>

    )


  }



}


const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

