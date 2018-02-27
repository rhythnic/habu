import { StyleSheet, css } from 'aphrodite'
import flatten from 'ramda/src/flatten'

export default function extendHabu (Habu) {
  return class HabuAphrodite extends Habu {
    constructor () {
      this.MEDIA_QUERY_PREFIX_REGEXP = /^(vw|vh)?(>|<)(.+)$/
      this.NUMBER_REGEX = /^-?[0-9]+$/
      this.classNameCache = {}
    }
    buildMediaQueryString (match) {
      const orientation = match[1] === 'vh' ? 'height' : 'width'
      const minMax = match[2] === '<' ? 'max' : 'min'
      let size = match[3]
      if (this.NUMBER_REGEX.test(size)) size = `${size}px`
      return `@media (${minMax}-${orientation}: ${size})`
    }
    buildPrefixedStyleObject (flatList) {
      return flatList
        .filter(x => typeof x === 'object'))
        .reduce((acc, obj) => {
          Object.keys(obj).forEach(prefix => {
            const mediaQueryMatch = new RegExp(this.MEDIA_QUERY_PREFIX_REGEXP).exec(prefix)
            if (mediaQueryMatch) prefix = this.buildMediaQueryString(mediaQueryMatch)
            acc[prefix] = Object.assign(acc[prefix] || {}, super.expandStyles(obj[prefix]))
          })
          return acc
        }, {})
    }
    inlineStyleObject (flatList) {
      return Object.assign(
        super.inlineStyleObject(flatList.filter(x => typeof x === 'string')),
        this.buildPrefixedStyleObject(flatList)
      )
    }
    styleListClassName (flatList) {
      const key = JSON.stringify(flatList)
      if (this.classNameCache[key]) return this.classNameCache[key]
      const className = css(new StyleSheet({ habu: this.inlineStyleObject(flatList) }))
      this.classNameCache[key] = className
      return className
    }
    expandStyles (arg) {
      if (typeof arg === 'string') arg = arg.split(';')
      if (Array.isArray(arg)) {
        return this.styleListClassName(this.flattenStyles(arg))
      }
      if (typeof arg === 'object') return this.inlineStyleObjectMap(arg)
      console.warn(`Habu expandStyles: Invalid argument type "${typeof arg}"`)
    }
  }
}
