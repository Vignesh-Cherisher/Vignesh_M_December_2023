/* eslint-env jest */
import * as unitFunctions from '../../src/js/formFunctions.js'

test('check zero padding when lesser than the length', () => {
  const testCase = '32'
  const testResult = '00000032'
  expect(unitFunctions.padZeros(testCase)).toEqual(testResult) // 00000032.
})

test('check if zero padding is not done when length is higher', () => {
  const testCase = '546898785'
  const testResult = '546898785'
  expect(unitFunctions.padZeros(testCase)).toEqual(testResult) // 546898785.
})

test('check zero padding when the length is at par', () => {
  const testCase = '85969855'
  const testResult = '85969855'
  expect(unitFunctions.padZeros(testCase)).toEqual(testResult) // 85969855.
})

test('check zero padding when length is 0', () => {
  const testCase = ''
  const testResult = '00000000'
  expect(unitFunctions.padZeros(testCase)).toEqual(testResult) // 00000000.
})