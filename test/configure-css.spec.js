/* global test, expect */
import configureCss from '../src/configure-css'
import config from './config'

const css = configureCss(config)

test('same class for same input', () => {
  let styleArray = ['d:ib', ':hover(bgc:@red)']
  expect(css(...styleArray)).toBe(css(...styleArray))
})

test('accepts falsy values', () => {
  let styleArray = ['d:ib', false && 'm:0']
  expect(css(...styleArray)).toMatch(/[^m][^0]/g)
})

test('accepts arrays as arguments', () => {
  let styleArray = ['d:ib', false && 'm:0', ['p:0']]
  const result = css(...styleArray)
  expect(result.indexOf('habu')).toBe(0)
})
