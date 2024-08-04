import { jwtDecode } from "jwt-decode";
import moment from "moment";

export const getTokenData = (token: string) => {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

// humanize date from now
export const humanizeDate = (date: string | Date) => {
  return moment(date).fromNow();
};

export const humanizeDateFormat = (date: string | Date | undefined | null) => {
  if(date == undefined){
    return null;
  }
  return moment(date).format("MMM Do YY")
};


export const getObjValue = <T = any>(key: string | number, obj: any) => {
  const keys = key.toString().split('.');
  let result = obj;
  for (const key of keys) {
     if (result && Object.prototype.hasOwnProperty.call(result, key)) {
        result = result[key];
     } else {
        return undefined;
     }
  }
  return result as T;
};

