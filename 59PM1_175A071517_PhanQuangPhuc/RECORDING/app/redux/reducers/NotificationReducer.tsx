import { NOTIFICATION_CUSTOMER,NOTIFICATION_STUDIO } from "../actions/types";

const initialState = {
  data: 0,
  dataAdd:0,
  isLoading: false,
  error: null
};

export default function (state = initialState, action) {
  if (action.type ==  NOTIFICATION_CUSTOMER) {
    // let data =state.data+1;
    return {
      ...state,
      data: action.payload
    };
  }
  if (action.type ==NOTIFICATION_STUDIO  ) {
    // let data =state.data-1;
    return {
      ...state,
      dataAdd: action.payload
    };
  }
  return state;
}
