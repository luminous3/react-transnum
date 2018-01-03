import {ones, teens, tens,
  denominations, billion, million,
  thousand, hundred, ten} from'./vars';

export const LIMIT = 999999999999;

export function isInvalid(number) {
  if(isNaN(Number(number)) ||
    number < 0 || number > LIMIT) {
      return true;
    }
  return false;
}

export function convert(number){
  let currTrans = "";
  let currValue = parseInt(number, 10);
  let resH = Math.floor(divide(currValue, hundred));
  currValue = number - resH * hundred;
  let res10 = Math.floor(divide(currValue, ten));
  let res1 = currValue - res10 * ten;

  //hundreds
  if(resH) {
    currTrans = ones[resH] + " " + denominations[hundred];
  }
  // tens
  if(res10) {
    if(resH) {
      currTrans += " and ";
    }
    if(res10 > 1) {
      currTrans += tens[res10];
    } else if(res10 === 1) {
      if(res1 === 0) {
        return currTrans += tens[res10];
      } else { // teens
        return currTrans += teens[res1];
      }
    }
  }
  // ones
  if(res1) {
    if(resH && !res10) {
      currTrans += " and";
    }
    currTrans += " " + ones[res1];
  }

  return currTrans.trim();
}

export function processNumber(number) {
  let currValue = number;
  let values = [billion, million, thousand];
  let res = 0;
  let trans = "";

  values.map((denom) => {
    res = Math.floor(divide(currValue, denom));
    if(res) {
      trans += convert(res) + " " + denominations[denom] + " ";
    }
    return currValue -= res * denom;
  })

  if(currValue) {
    if(trans !== "") {
      trans += convert(currValue);
    } else {
      trans += " " + convert(currValue);
    }
  }

  let newTrans = trans.trim();
  newTrans = newTrans.charAt(0).toUpperCase() + newTrans.slice(1);
  return newTrans;
}

function divide(num, set) {
  if(set !== 0) {
    return num / set;
  }
}
