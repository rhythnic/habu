import flatten from 'ramda/src/flatten'
import trim from 'ramda/src/trim'

export function isContentString (x) {
  return typeof x === 'string' && !!x.replace(/ /g, '')
}

export default class Habu {
  constructor ({ mixins, abbreviations = {} }) {
    this.mixins = mixins
    this.propAbbr = abbreviations.cssPropertyAbbreviations
    this.valAbbr = abbreviations.cssValueAbbreviations
    this.MIXIN_REGEX = /([^:( ]+)\(([^)]*)/
  }
  flattenStyles (list) {
    return flatten(list).filter(isContentString).map(trim)
  }
  replaceMixin (str) {
    if (!this.MIXIN_REGEX.test(str)) return str
    const match = new RegExp(this.MIXIN_REGEX).exec(str)
    const fnName = match[1]
    if (!(fnName in this.mixins)) return str
    const fnArgs = match[2] ? match[2].split(',').map(trim) : void 0
    const result = this.mixins[fnName](fnArgs)
    const colonIndex = str.indexOf(':')
    if (colonIndex > 0) {
      if (typeof result !== 'string') {
        console.warn(`Habu: mixins used in a css value must return a string.  Input: ${str}`)
      }
      return str.replace(match[0], result)
    }
    return result
  }
  expandCssRule (cssRule) {
    const propVal = cssRule.split(':')
    const prop = this.propAbbr[propVal[0]]
    if (!prop) return propVal
    propVal[0] = prop
    const valAbbr = this.valAbbr[prop]
    propVal[1] = (valAbbr && valAbbr[propVal[1]]) || propVal[1]
    return propVal
  }
  inlineStyleObject (flatList) {
    return this.flattenStyles(flatList.map(this.replaceMixin.bind(this)))
      .reduce((acc, cssRule) => {
        const [prop, value] = this.expandCssRule(cssRule)
        acc[prop] = value
        return acc
      }, {})
  }
  inlineStyleObjectMap (namedStylesObject) {
    return Object.keys(namedStylesObject).reduce((acc, x) => {
      acc[x] = this.expandStyles(namedStylesObject[x])
      return acc
    }, {})
  }
  expandStyles (arg) {
    if (typeof arg === 'string') arg = arg.split(';')
    if (Array.isArray(arg)) {
      return this.inlineStyleObject(this.flattenStyles(arg))
    }
    if (typeof arg === 'object') return this.inlineStyleObjectMap(arg)
    console.warn(`Habu expandStyles: Invalid argument type "${typeof arg}"`)
  }
}
