import {REG_EMAIL,REG_PHONE} from './Constant'


export function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }
  export function validateEmail(email) {
    if (!email) return false;
    return REG_EMAIL.test(email);
  }

  export function validatePhoneNumber(phone) {
    if (!phone) return false;
    return REG_PHONE.test(phone);
  }
  export function getCurrentDate(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minute = new Date().getMinutes();
    var seconds = new Date().getSeconds()
    return hours + ':' + minute + ':' +seconds+' '+ date + '-' + month + '-' + year;
  }