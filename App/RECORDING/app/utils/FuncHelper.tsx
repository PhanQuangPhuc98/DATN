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
  export function CutOneArrayObject(array){
    let find=array.map((index,item)=>{
         return item._id
    }).indexOf(1)
    return find.splice(find,0)
  }