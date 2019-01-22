import {GET_USER_PROFILE} from '../actions/actionTypes';
const initialState ={
  userId: 123,
  provider: 'google',
  profile: {
    firstName: 'Alfred',
    lastName: 'Hong',
    email: "alf.hong91@gmail.com",
    default_mall: 1,
    tags: [1,3],
    age: 3,
    gender: "male",
    birthday: 693561600
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state
      };
    default:
      return state;
  }
}
