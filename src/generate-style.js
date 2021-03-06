import { trim, flattenObject, find, flattenArray, isNonEmptyString } from './utils'

export default class StyleGenerator {
  constructor (config) {
    this.VARIABLE_REGEX = /@[^ \(]+/g
    this.NUMBER_REGEX = /^-?[0-9]+$/
    this.MIXIN_REGEX = /^([^\(]+)\(([^\)]*)/
    this.MEDIA_QUERY_REGEX = /^(vw|vh)?(>|<)([^\(]+)\((.*)\)/
    this.PSEUDO_SEL_REGEX = /^(:[^\(]*)(\(.*\))?\((.*)\)/

    Object.assign(this, config)
    this.flatTheme = this.flattenTheme(config)
  }

  themeVar (txt) {
    return txt.replace(this.VARIABLE_REGEX, x => this.flatTheme[x.slice(1)])
  }

  flattenTheme ({ theme, prefixesToRemove = [] }) {
    const flatTheme = flattenObject(theme)
    return Object.keys(flatTheme).reduce((acc, path) => {
      const value = flatTheme[path]
      const prefix = find(x => path.indexOf(x) === 0, prefixesToRemove)
      const key = prefix ? path.slice(prefix.length + 1) : path
      acc[key] = value
      return acc
    }, {})
  }

  buildMediaQueryString (match) {
    const orientation = match[1] === 'vh' ? 'height' : 'width'
    const minMax = match[2] === '<' ? 'max' : 'min'
    let size = match[3]
    if (size.indexOf('@') === 0) size = this.themeVar(size)
    if (this.NUMBER_REGEX.test(size)) size = `${size}px`
    return `@media (${minMax}-${orientation}: ${size})`
  }

  pseudoSelectorStyle (styleTxt) {
    const match = this.PSEUDO_SEL_REGEX.exec(styleTxt)
    if (!match) return
    const selector = `${match[1]}${match[2] || ''}`
    const styleArray = match[3].split(';').map(trim)
    const styles = this.reduceStyleArray(styleArray)
    return { [selector]: styles }
  }

  mediaQueryStyle (styleTxt) {
    const match = this.MEDIA_QUERY_REGEX.exec(styleTxt)
    if (!match) return
    const styleArray = match[4].split(';').map(trim)
    const mediaQuery = this.buildMediaQueryString(match)
    return { [mediaQuery]: this.reduceStyleArray(styleArray) }
  }

  mixinStyle (styleTxt) {
    const [prop, val] = styleTxt.split(':').map(trim)
    if (val != null) return
    const match = this.MIXIN_REGEX.exec(prop)
    if (!match) return
    const fnName = match[1]
    if (typeof this.mixins[fnName] !== 'function') return
    let styleArray = this.mixins[fnName].apply(
      { mixins: this.mixins },
      match[2] ? match[2].split(';').map(trim) : void 0
    )
    styleArray = flattenArray(styleArray).filter(isNonEmptyString)
    return this.reduceStyleArray(styleArray)
  }

  cssRuleStyle (styleTxt) {
    const { cssProps, cssVals } = this
    let [prop, val] = styleTxt.split(':').map(trim)
    if (prop == null || val == null) return
    if (cssProps[prop]) prop = cssProps[prop]
    if (cssVals[prop] && cssVals[prop][val]) {
      val = cssVals[prop][val]
    } else {
      if (val.indexOf('@') > -1) val = this.themeVar(val)
      if (this.NUMBER_REGEX.test(val)) val = parseInt(val, 10)
    }
    return { [prop]: val }
  }

  generateStyle (styleTxt) {
    return this.pseudoSelectorStyle(styleTxt) ||
      this.mediaQueryStyle(styleTxt) ||
      this.mixinStyle(styleTxt) ||
      this.cssRuleStyle(styleTxt)
  }

  reduceStyleArray (styleArray) {
    return styleArray.reduce((acc, x) => Object.assign(acc, this.generateStyle(x)), {})
  }
}
