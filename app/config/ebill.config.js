export const accountTypeMap = {
  'tmhPostpaid': 'True Move H postpaid', // True Move H postpaid
  'tol': 'True online', // true online
  'tvs': 'True vision', // true vision
  'conv': 'True convergence', // true convergence
  'tmhPrepaid': 'Prepaid' // prepaid
};

export const ebillFormatOptions = [
  {
    id: 'SMS',
    name: 'SMS'
  }, {
    id: 'EMAIL',
    name: 'Email'
  }
];

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const msisdnRegex = /^\d{10}$/;

export const billFormats = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
  PAPER: 'PAPER'
};
