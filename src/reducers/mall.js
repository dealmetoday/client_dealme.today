import {GET_STORES} from "../actions/actionTypes";

const initialState ={
  address: "6138 Student Union Blvd, Vancouver, BC V6T 1Z1",
  id: 1,
  name: "UBC Nest",
  tags: [1,2,],
  parentCompany: null,
  numOfStores: 2,

  stores: [
    {
      _id: 1,
      name: "On The Fringe Hair Design",
      email: "otfubc@onthefringehairdesign.com",
      location: [49.267471,-123.2499748],
      description: "All the talent; None of the attitude!",
      parentCompany: null
    },
    {
      _id: 2,
      name: "The Deli UBC",
      email: null,
      location: [49.266591,-123.2496061],
      description: "Deli | Cafe | Take Out Restaurant ",
      parentCompany: "UBC"
    }
  ]
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state
      };
    default:
      return state;
  }
}