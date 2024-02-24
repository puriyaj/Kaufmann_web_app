const oneDigit: { [key: number]: string } = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
const twoDigits: { [key: number]: string } = {
  10: "ده",
  11: "یازده",
  12: "دوازده",
  13: "سیزده",
  14: "چهارده",
  15: "پانزده",
  16: "شانزده",
  17: "هفده",
  18: "هجده",
  19: "نوزده",
  20: "بیست",
  30: "سی",
  40: "چهل",
  50: "پنجاه",
  60: "شصت",
  70: "هفتاد",
  80: "هشتاد",
  90: "نود",
};
const threeDigits: { [key: number]: string } = {
  100: "صد",
  200: "دویست",
  300: "سیصد",
  400: "چهارصد",
  500: "پانصد",
  600: "شش صد",
  700: "هفت صد",
  800: "هشت صد",
  900: "نه صد",
};

const types = ["تلیارد", "میلیارد", "میلیون", "هزار", ""];
const decimalTypes = ["دهم", "صدم", "هزارم", "ده هزارم"];

//Convert Number To Words
export const convertNumToAlpha = (number: number) => {
  let num = Math.floor(number / 10);
  let numbers: number[] = [];

  while (num >= 1000) {
    numbers.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  numbers.push(num);
  numbers = numbers.reverse();

  return calculateDigits(numbers);
};

//Processing on Digits of A Number
const calculateDigits = (arrNum: number[]) => {
  let result = "";
  for (let i = 0; i < arrNum.length; i++) {
    let number = arrNum[i];
    let sadgan = Math.floor(number / 100) * 100;
    number = number % 100;
    let dahgan = Math.floor(number / 10) * 10;
    let yekan = number % 10;
    result += i !== 0 && number ? " و " : " ";

    result += getPersian(sadgan, dahgan, yekan, i, arrNum) + " " + getType(i, arrNum);
  }

  return result.trim();
};

//getting The Type Of Each Number (Billion, Million,...)
const getType = (i: number, numbers: number[]) => {
  let parsedNum = numbers[i];
  if (isNaN(parsedNum)) return "";
  if (!parsedNum) return "";
  let length = numbers.length - i;
  let index = types.length - length;
  return types[index];
};

//Main Process That Turn a Number Into a String(122=>100+20+2)
const getPersian = (sadgan: number, dahgan: number, yekan: number, index: number, numbers: number[]) => {
  let flag = false;
  let result = "";
  let dahganPlusYekan = dahgan + yekan;

  if (threeDigits[sadgan]) {
    result += yekan > 0 || dahgan > 0 ? threeDigits[sadgan] + " و " : threeDigits[sadgan];
  }

  if (twoDigits[dahganPlusYekan]) {
    result += twoDigits[dahganPlusYekan] + " ";
    return result;
  }

  if (twoDigits[dahgan]) {
    result += twoDigits[dahgan] + " و ";
  }

  if (numbers.length === 2 && index === 0 && yekan === 1 && dahgan === 0 && sadgan === 0) {
    return result;
  }

  if (numbers.length > 2 && index === numbers.length - 2 && yekan === 1 && dahgan === 0 && sadgan === 0) {
    return result;
  }

  if (yekan > 0) result += oneDigit[yekan] + " ";

  return result;
};
