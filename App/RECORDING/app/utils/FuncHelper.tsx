import {REG_EMAIL} from './Constant'


export function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }
  export function validateEmail(email) {
    if (!email) return false;
    return REG_EMAIL.test(email);
  }
  