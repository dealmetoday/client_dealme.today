import {GET_DEALS} from "../actions/actionTypes";

const initialState ={

  deals: [
    {
      _id: 1,
      tags: [1,2],
      description: "Great rates on Men's Haircuts",
      creationDate: 1548001800,
      expiryDate: 1548001800000,
      format: "format",
      usesLeft: 10,
      views: 100,
      mall: 1,
      store: 1,
      title: '$2 off your next haircut'
    },
    {
      _id: 2,
      tags: [1],
      description: "Best Deli in town",
      creationDate: 1548001800,
      expiryDate: 1548001800000,
      format: "format",
      usesLeft: 25,
      views: 60,
      mall: 1,
      store: 2,
      title: "Buy a Veggi wrap and get a free samosa"
    }
  ]
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEALS:
      return {
        ...state
      };
    default:
      return state;
  }
}