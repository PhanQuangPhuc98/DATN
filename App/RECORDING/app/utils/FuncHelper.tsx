import {REG_EMAIL,REG_PHONE} from './Constant'

import { Platform } from 'react-native';
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
  // export function formatNumberToString(value) {
  //   if (!value) return '';
  //   return value
  //     .toString()
  //     .split(',')
  //     .join('');
  // }
  
  export function getCurrentDate(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minute = new Date().getMinutes();
    var seconds = new Date().getSeconds()
    return  date + '/' + month + '/' + year;
  }
  export function formatPrice(value) {
    // if (Platform.OS === 'android') {
    //   require('intl'); // import intl object
    //   require('intl/locale-data/jsonp/en'); // load the required locale details
    // }
    // return new Intl.NumberFormat('en-ES').format(formatNumberToString(value));
  }