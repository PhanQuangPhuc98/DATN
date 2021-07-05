
import {GET_USER,REGISTER_ROOM,NOTIFICATION_CUSTOMER,NOTIFICATION_STUDIO} from './types';

export const getUserInfo = data => ({
    type: GET_USER,
    payload: data
  })
export const UpdateKeyRom = roomKey=>({
    type:REGISTER_ROOM,
    payload:roomKey
})
export const NotificationCustomer =(data)=>({
  type: NOTIFICATION_CUSTOMER,
  payload: data
})
export const NotificationStudio =(data)=>({
  type: NOTIFICATION_STUDIO,
  payload: data
})