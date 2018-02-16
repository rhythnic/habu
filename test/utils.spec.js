/* global test, expect */
import { trim, isNonEmptyString, find, flattenArray, flattenObject } from '../src/utils'

test('trim', () => {
  expect(trim('  a  ')).toBe('a')
  expect(trim('abc ')).toBe('abc')
  expect(trim(' abc')).toBe('abc')
})

test('isNonEmptyString', () => {
  expect(isNonEmptyString('a')).toBe(true)
  expect(isNonEmptyString('')).toBe(false)
  expect(isNonEmptyString(false)).toBe(false)
  expect(isNonEmptyString([])).toBe(false)
  expect(isNonEmptyString({})).toBe(false)
})

test('find', () => {
  const list = ['a', 'b']
  expect(find(x => !!x, list)).toBe('a')
  expect(find(x => x === 'c', list)).toBeUndefined()
})

test('flattenArray', () => {
  const list = ['a', 'b', ['c'], ['d', ['e']]]
  expect(flattenArray(list)).toEqual(['a', 'b', 'c', 'd', 'e'])
})

test('flattenObject', () => {
  const obj = { a: 'a', b: { c: 'c', d: [ 'd' ] } }
  expect(flattenObject(obj)).toEqual({ a: 'a', 'b.c': 'c', 'b.d.0': 'd' })
})
