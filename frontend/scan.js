export default class Scan {
  constructor(scan) {
    this.referenceNumber = scan.referenceNumber;
    this.accountNumber = scan.accountNumber;
    this.amount = scan.amount;
    this.referenceNumberCorrect = scan.referenceNumberCorrect;
    this.amountCorrect = scan.amountCorrect;
  }
}
