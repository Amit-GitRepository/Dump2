export const isValidMSISDN = (number) => {
  if ((number) && (isMSISDNCorrect(number))) {
    return true;
  }
  return false;
};

// TODO: Update condition to validate MSISDN
const isMSISDNCorrect = (number) => {
  if ((number.length === 10) && (/^\d+$/.test(number))) {
    return true;
  }
  return false;
};
