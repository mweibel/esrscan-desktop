/**
 * Reducers
 */
import { ADD_SCAN } from './actions';
import { combineReducers } from 'redux';

function newScan(data) {
  return {
    referenceNumber: data.referenceNumber,
    accountNumber: data.accountNumber,
    amount: data.amount,
    referenceNumberCorrect: data.referenceNumberCorrect,
    amountCorrect: data.amountCorrect
  };
}

var testState = [
  {
    amount: '50.00',
    referenceNumber: '2 50000 00003 58803',
    accountNumber: '01-53308-0',
    amountCorrect: true,
    referenceNumberCorrect: true
  },
  {
    referenceNumber: '3 90000 00003 58804',
    accountNumber: '01-53408-0',
    referenceNumberCorrect: true
  },
  {
    amount: '234.00',
    referenceNumber: '4 15000 00003 58805',
    accountNumber: '01-53332-1',
    amountCorrect: false,
    referenceNumberCorrect: false
  },
  {
    amount: '7000.00',
    referenceNumber: '5 23000 00003 58806',
    accountNumber: '01-32308-0',
    amountCorrect: true,
    referenceNumberCorrect: true
  },
  {
    amount: '1.00',
    referenceNumber: '6 90000 00003 58807',
    accountNumber: '01-53248-0',
    amountCorrect: true,
    referenceNumberCorrect: false
  }
];

export function scans(state = testState, action) {
  switch (action.type) {
    case ADD_SCAN:
      return [
        newScan(action.scan),
        ...state
      ];
    default:
      return state;
  }
}

export const reducers = combineReducers({
  scans
});
