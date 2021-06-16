import { REG_EMAIL, REG_PHONE } from './Constant'

import { Platform } from 'react-native';
import { Switch } from 'native-base';
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
export function getCurrentDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours();
  var minute = new Date().getMinutes();
  var seconds = new Date().getSeconds()
  return date + '/' + month + '/' + year;
}
export function getCurrentDay() {
  var date = new Date().getDate();
  return `${date}`;
}
export function getCurrentMonth() {
  var month = new Date().getMonth() + 1;
  return `${month}`;
}
export function getCurrentYear() {
  var year = new Date().getFullYear();
  return `${year}`;
}
export function getFullStartDate(date) {
  var year = new Date().getFullYear();
  switch (date) {
    case 1:
      return 1 + '/' + 1 + '/' + year
    case 2:
      return 1 + '/' + 2 + '/' + year
    case 3:
      return 1 + '/' + 3 + '/' + year
    case 4:
      return 1 + '/' + 4 + '/' + year
    case 5:
      return 1 + '/' + 5 + '/' + year
    case 6:
      return 1 + '/' + 6 + '/' + year
    case 7:
      return 1 + '/' + 7 + '/' + year
    case 8:
      return 1 + '/' + 8 + '/' + year
    case 9:
      return 1 + '/' + 9 + '/' + year
    case 10:
      return 1 + '/' + 10 + '/' + year
    case 11:
      return 1 + '/' + 11 + '/' + year
    case 12:
      return 1 + '/' + 12 + '/' + year
    default:
      break;
  }
} export function getFullEndDate(date) {
  var year = new Date().getFullYear();
  switch (date) {
    case 1:
      return 31 + '/' + 1 + '/' + year
    case 2:
      return 28 + '/' + 2 + '/' + year
    case 3:
      return 31 + '/' + 3 + '/' + year
    case 4:
      return 30 + '/' + 4 + '/' + year
    case 5:
      return 31 + '/' + 5 + '/' + year
    case 6:
      return 30 + '/' + 6 + '/' + year
    case 7:
      return 31 + '/' + 7 + '/' + year
    case 8:
      return 31 + '/' + 8 + '/' + year
    case 9:
      return 30 + '/' + 9 + '/' + year
    case 10:
      return 31 + '/' + 10 + '/' + year
    case 11:
      return 30 + '/' + 11 + '/' + year
    case 12:
      return 31 + '/' + 11 + '/' + year
    default:
      break;
  }
}