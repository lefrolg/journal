export const dateToYYMM = (date) => {
  if (!(date instanceof Date)) {
    return "";
  }
  return (date.getFullYear() % 100) * 100 + (date.getMonth() + 1);
};

export const dateToYYYY_MM = (date) => {
  if (!(date instanceof Date)) {
    return "";
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return date.getFullYear() + "-" + month;
};

export const YYMMtoDate = (YYMM) => {
  const year = +(20 + YYMM.substring(0, 2));
  const month = +YYMM.substring(2, 4) - 1;
  return new Date(year, month);
};
