const creditCard = {
  maxLength: {
    cardNo: 19,  // https://en.wikipedia.org/wiki/Payment_card_number
    cvv: 4,
    name: 26,   // https://stackoverflow.com/questions/2004532/credit-card-validation-can-card-name-contain-non-ascii-characters
    date: 7
  }
};

export default creditCard;
