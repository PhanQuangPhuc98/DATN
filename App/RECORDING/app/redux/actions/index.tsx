
import {GET_USER,REGISTER_ROOM} from './types';

export const getUserInfo = data => ({
    type: GET_USER,
    payload: data
  })
export const UpdateKeyRom = roomKey=>({
    type:REGISTER_ROOM,
    payload:roomKey
})