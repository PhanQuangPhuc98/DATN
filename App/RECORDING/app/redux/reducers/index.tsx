import {combineReducers} from "redux"
import UserReducer from './UserReducer'
import ChatReducer from './ChatReducer';

import { RESET } from "../actions/types";

const appReducer = combineReducers({
    userReducer:UserReducer,
    chatReducer:ChatReducer
  });

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
    if (action.type === RESET) {
      state = initialState
    }
  
    return appReducer(state, action)
  }
export default rootReducer