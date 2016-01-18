/* global describe,it */

import * as assert from 'assert'
import deepFreeze from 'deep-freeze'
import * as actions from '../src/frontend/state/actions'
import { scans } from '../src/frontend/state/reducers'

describe('Add scan', function () {
  it('should add a scan to the list of scans', function () {
    const data = {
      referenceNumber: '123',
      accountNumber: '234',
      amount: '34',
      referenceNumberCorrect: true,
      amountCorrect: true
    }
    const action = actions.addScan(data)
    const beforeState = []
    const afterState = [
      data
    ]

    deepFreeze(beforeState)
    deepFreeze(afterState)
    deepFreeze(data)

    assert.deepEqual(scans(beforeState, action), afterState)
  })
})
