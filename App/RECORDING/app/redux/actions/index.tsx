
import {GET_USER} from './types';

export const getUserInfo = data => ({
    type: GET_USER,
    payload: data
  })