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
      return 1 + '/' + `${date}` + '/' + getCurrentYear()
} 
export function getFullEndDate(date) {
  switch (date) {
    case 1:
      return 31 + '/' + `${date}`+ '/' + getCurrentYear()
    case 2:
      return 28 + '/' + `${date}` + '/' +  getCurrentYear()
    case 3:
      return 31 + '/' + `${date}` + '/' +  getCurrentYear()
    case 4:
      return 30 + '/' + `${date}` + '/' +  getCurrentYear()
    case 5:
      return 31 + '/' + `${date}` + '/' +  getCurrentYear()
    case 6:
      return 30 + '/' + `${date}` + '/' +  getCurrentYear()
    case 7:
      return 31 + '/' + `${date}` + '/' +  getCurrentYear()
    case 8:
      return 31 + '/' + `${date}` + '/' +  getCurrentYear()
    case 9:
      return 30 + '/' + `${date}` + '/' +  getCurrentYear()
    case 10:
      return 31 + '/' + `${date}` + '/' +  getCurrentYear()
    case 11:
      return 30 + '/' + `${date}` + '/' +  getCurrentYear()
    case 12:
      return 31 + '/' + `${date}` + '/' +  getCurrentYear()
    default:
      break;
  }
}
export function getFullStartWeek(week) {
  switch (week) {
    case 1:
      return 1 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 2:
      return 8 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 3:
      return 15 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 4:
      return 22 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 5:
      return 29 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    default:
      break;
  }
} 
export function getFullEndWeek(week,month) {
  switch (week) {
    case 1:
      return 7 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 2:
      return 14 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 3:
      return 21 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 4:
      return 28 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
    case 5:
      if(month % 2===0){
        return 30 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
      }
      if(month===2){
        return 29 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
      }
      else{
        return 31 + '/' + getCurrentMonth()+ '/' + getCurrentYear()
      }
    default:
      break;
  }
} 
export function setWeek(Date) {
  if(Date<8){
    return 1;
  }
  if(Date>7&&Date<15){
    return 2;
  }
  if(Date>14&&Date<22){
    return 3;
  }
  if(Date>21&&Date<29){
    return 4;
  }
  if(Date>28&&Date<=31){
    return 5;
  }
}