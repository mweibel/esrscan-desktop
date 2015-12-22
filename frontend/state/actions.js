/**
 * actions for state
 */

export const ADD_SCAN = 'ADD_SCAN';

export function addScan(data) {
  return {
    type: ADD_SCAN,
    scan: data
  };
}
