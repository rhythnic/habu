/* global test, expect */
import StyleGenerator from '../src/generate-style'
import config from './config'

const styler = new StyleGenerator(config)

test('themeVar', () => {
  expect(styler.themeVar('@red')).toBe(config.theme.colors.red)
  expect(styler.themeVar('@sizes.mobile')).toBe(`${config.theme.sizes.mobile}`)
  expect(styler.themeVar('1px solid @green')).toBe(`1px solid ${config.theme.colors.green}`)
})

test('flattenTheme', () => {
  const expected = {
    red: 'rgb(247, 60, 48)',
    green: 'rgb(7, 125, 19)',
    'sizes.mobile': 500,
    'sizes.tablet': 900
  }
  expect(styler.flatTheme).toEqual(expected)
})

test('buildMediaQueryString', () => {
  let match = styler.MEDIA_QUERY_REGEX.exec('vw>20em(fx:1)')
  expect(styler.buildMediaQueryString(match)).toBe('@media (min-width: 20em)')
  match = styler.MEDIA_QUERY_REGEX.exec('vh<20em(fx:1)')
  expect(styler.buildMediaQueryString(match)).toBe('@media (max-height: 20em)')
  match = styler.MEDIA_QUERY_REGEX.exec('>20em(fx:1)')
  expect(styler.buildMediaQueryString(match)).toBe('@media (min-width: 20em)')
  match = styler.MEDIA_QUERY_REGEX.exec('<@sizes.mobile(fx:1; mr:20)')
  expect(styler.buildMediaQueryString(match)).toBe('@media (max-width: 500px)')
})

test('reduceStyleArray', () => {
  let expected = { display: 'inline-block', margin: 0 }
  expect(styler.reduceStyleArray(['d:ib', 'm:0'])).toEqual(expected)
  expected = { position: 'absolute', transform: 'translate(0, -50%)', top: '50%', right: 15 }
  expect(styler.reduceStyleArray(['center(vertical)', 'right:15'])).toEqual(expected)
  expected = { ':hover': { color: config.theme.colors.green }, padding: '10px 20px' }
  expect(styler.reduceStyleArray([':hover(c:@green)', 'p:10px 20px'])).toEqual(expected)
  expected = { display: 'block', '@media (min-width: 900px)': { display: 'inline-block' } }
  expect(styler.reduceStyleArray(['d:b', '>@sizes.tablet(d:ib)'])).toEqual(expected)
})

test('pseudoSelectorStyle', () => {
  let expected = { '::after': { content: '|' } }
  expect(styler.pseudoSelectorStyle('::after(content:|)')).toEqual(expected)
  expected = { ':nth-child(2)': { marginBottom: 10, color: config.theme.colors.red } }
  expect(styler.pseudoSelectorStyle(':nth-child(2)(mb:10; c:@red)')).toEqual(expected)
  expected = { ':focus': { backgroundColor: 'rgba(158,158,158,.4)', color: 'black' } }
  expect(styler.pseudoSelectorStyle(':focus(bgc:rgba(158,158,158,.4); c:black)')).toEqual(expected)
  expect(styler.pseudoSelectorStyle('m:0')).toBeUndefined()
})

test('mediaQueryStyle', () => {
  let expected = { '@media (max-height: 10em)': { width: '100%' } }
  expect(styler.mediaQueryStyle('vh<10em(w:100%)')).toEqual(expected)
  expected = { '@media (min-width: 500px)': { ':hover': { color: config.theme.colors.green } } }
  expect(styler.mediaQueryStyle('>@sizes.mobile(:hover(c:@green))')).toEqual(expected)
  expect(styler.mediaQueryStyle('m:0')).toBeUndefined()
})

test('mixinStyle', () => {
  let expected = { position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }
  expect(styler.mixinStyle('center(both)')).toEqual(expected)
  expect(styler.mixinStyle('m:0')).toBeUndefined()
  expected = { position: 'absolute', transform: 'translate(-50%, 0)', left: '50%' }
  expect(styler.mixinStyle('center()')).toEqual(expected)
})

test('cssRuleStyle', () => {
  expect(styler.cssRuleStyle('position:relative')).toEqual({ position: 'relative' })
  expect(styler.cssRuleStyle('mxw:300')).toEqual({ maxWidth: 300 })
  expect(styler.cssRuleStyle('cu:po')).toEqual({ cursor: 'pointer' })
  expect(styler.cssRuleStyle('bgc:@red')).toEqual({ backgroundColor: config.theme.colors.red })
  expect(styler.cssRuleStyle('invalid')).toBeUndefined()
})

test('generateStyle', () => {
  let expected = { '::after': { content: '|' } }
  expect(styler.generateStyle('::after(content:|)')).toEqual(expected)
  expected = { '@media (min-width: 500px)': { ':hover': { color: config.theme.colors.green } } }
  expect(styler.generateStyle('>@sizes.mobile(:hover(c:@green))')).toEqual(expected)
  expected = { position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }
  expect(styler.generateStyle('center(both)')).toEqual(expected)
  expected = { position: 'relative' }
  expect(styler.generateStyle('position:relative')).toEqual(expected)
})
