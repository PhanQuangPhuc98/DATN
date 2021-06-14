export const SCREEN_ROUTER = {
  MAIN: 'MAIN',
  AUTH: 'AUTH',
  SPLASH: 'SPLASH',
  APP: 'APP',
  MAIN_ADMIN: 'MAIN_ADMIN',
  APPADD: 'APPADD'
}
export const SCREEN_ROUTER_AUTH = {
  LOGIN: 'LOGIN',
  FORGOT_PASS: 'FORGOT_PASS',
  REGISTER: 'REGISTER'
};
export const SCREEN_ROUTER_APP = {
  HOME: 'HOME',
  PRODUCT: 'PRODUCT',
  PUTCALENDAR: 'PUTCALENDAR',
  NOTIFY: 'NOTIFY',
  USER: 'USER',
  SEARCH: 'SEARCH',
  LISTCHAT: 'LISTCHAT',
  CHAT: 'CHAT',
  CHANGEPASS: 'CHANGEPASS',
  INFORUSER: 'INFORUSER',
  ADPOST: 'ADPOST',
  UPDATEUSER: 'UPDATEUSER',
  DETAILPUTCALENDAR: 'DETAILPUTCALENDAR',
  MAP: 'MAP',
  INTRO: "INTRO",
  HISTORYPUT:"HISTORYPUT"
};
export const SCREEN_ROUTER_APP_ADD = {
  MANYUSER: 'MANYUSER',
  DETAILUSER: 'DETAILUSER',
  LISTCHATADD: 'LISTCHAT',
  CHATADD: 'CHAT',
  NOTIFICATION: "NOTIFICATION",
  USERADD:'USERADD',
  INFORUSERADD:'INFORUSERADD',
  CHANGEPASSADD:'CHANGEPASSADD',
  REVENUEADD:'REVENUEADD',
  UPDATEINTROADD:'UPDATEINTROADD',
  UPDATEPRICEADD:'UPDATEPRICEADD',
  UPDATEUSERADD:'UPDATEUSERADD',
}
export const REG_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REG_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;