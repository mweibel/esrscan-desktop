export default class Scan {
  constructor(scan) {
    this.rawReferenceNumber = scan.referenceNumber;
    this.rawAccountNumber = scan.accountNumber;
    this.rawAmount = scan.amount;
    this.referenceNumberCorrect = scan.referenceNumberCorrect;
    this.amountCorrect = scan.amountCorrect;
  }

  referenceNumber() {
    let str = '';
    let l = this.rawReferenceNumber.length;
    for(let i = l - 1; i >= 0; i--) {
      str = this.rawReferenceNumber[i] + str;
      if((l - i) % 5 === 0) {
        str = ' ' + str;
      }
    }
    return str;
  }

  accountNumber() {
    let prefix = this.rawAccountNumber.substr(0, 2);
    let center = this.rawAccountNumber.substr(2, this.rawAccountNumber.length).replace(/^0+/, '');
    let postfix = this.rawAccountNumber[this.rawAccountNumber.length - 1];

    return [prefix, center, postfix].join('-');
  }

  amount() {
    if(!this.rawAmount) {
      return 0.00;
    }
    return parseInt(this.rawAmount, 10).toFixed(2);
  }
}
