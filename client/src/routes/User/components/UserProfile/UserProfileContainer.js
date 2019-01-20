import React from 'react'
import UserProfile from './UserProfile';
import { connect } from 'react-redux';
import "./userProfileContainer.css";
import UserModal from './userModal';


class UserProfileContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleChange.bind(this)
    this.state = {
      defaultMall: null,
      firstName: null,
      lastName: null,
      openModal: false,
      modalLabel: null,
      modalInputType: 'text',
      modalId: null,
      listValue: 1
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.setState({
      profile: this.props.user.profile
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSaveProfile = () => {
    let newProfile = {
    }

  }

  handleModalOpen = (params) => {

    this.setState({
      openModal: true,
      modalLabel: params.label,
      modalInputType: params.type,
      modalId: params.id,
    });
  };

  handleModalClose = () => {
    this.setState({ openModal: false });
  };

  updateField = (field, value) => {
    let profile = this.state.profile;

    profile[field] = value

    this.setState({
      profile,
      openModal: false,
      modalLabel: null,
      modalInputType: null,
      modalId: null,
    })
  }

  render(){
    console.log(this.props.user)
    return (
      <div className={'user-profile-Container'}>
        <UserModal
          handleOpen={this.handleModalOpen}
          handleClose={this.handleModalClose}
          openModal={this.state.openModal}
          modalLabel={this.state.modalLabel}
          modalInputType={this.state.modalInputType}
          id={this.state.modalId}
          handleChange={this.handleChange}
          updateField={this.updateField}
          list={this.state.list || null}
          listValue={this.state.listValue}
        />
        <UserProfile user={this.props.user} handleChange={this.handleChange} handleOpen={this.handleModalOpen} />
      </div>
    )
  }




}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);