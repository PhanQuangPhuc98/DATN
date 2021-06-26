import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "../actions/types";

const initialState = {
  data: {},
  isLoading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload.error
      };
    default:
      break;
  }
  return state;
}
