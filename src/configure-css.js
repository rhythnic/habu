import { StyleSheet, css as aphroditeCss } from 'aphrodite'
import { isNonEmptyString, flattenArray } from './utils'
import StyleGenerator from './generate-style'

export default function configureCss (config) {
  const classNameCache = {}
  const stylesheetCache = {}
  const styler = new StyleGenerator(config)

  function css (...styleArray) {
    styleArray = flattenArray(styleArray).filter(isNonEmptyString)
    const cacheKey = JSON.stringify(styleArray)
    if (classNameCache[cacheKey]) return classNameCache[cacheKey]
    const stylesheet = StyleSheet.create({ habu: styler.reduceStyleArray(styleArray) })
    classNameCache[cacheKey] = aphroditeCss(stylesheet.habu)
    return classNameCache[cacheKey]
  }

  css.styles = (...styleArray) => {
    styleArray = flattenArray(styleArray).filter(isNonEmptyString)
    const cacheKey = JSON.stringify(styleArray)
    if (stylesheetCache[cacheKey]) return stylesheetCache[cacheKey]
    const stylesheet = StyleSheet.create({ habu: styler.reduceStyleArray(styleArray) })
    stylesheetCache[cacheKey] = stylesheet.habu
    return stylesheetCache[cacheKey]
  }

  return css
}
