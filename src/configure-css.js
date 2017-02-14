import { StyleSheet, css as aphroditeCss } from 'aphrodite';
import { getProp, isNonEmptyString, flattenArray } from './utils';
import StyleGenerator from './generate-style';



export default function configureCss(config) {
  let stylesheetCache = {}, cssCache = {};
  const styler = new StyleGenerator(config);
  const getStylesheet = getProp(stylesheetCache);
  const notCached = x => !getStylesheet(x);

  return function css(...styleArray) {

    const cacheKey = styleArray.join('_');
    if (cssCache[cacheKey]) return cssCache[cacheKey];

    styleArray = flattenArray(styleArray).filter(isNonEmptyString);
    const formattedClasses = styleArray.map(styler.formatStyleClassName);

    const newStyles = styleArray.reduce((acc, x, i) => {
      if (notCached(formattedClasses[i])) acc.push(x);
      return acc;
    }, []);

    if (newStyles.length) {
      Object.assign(stylesheetCache, StyleSheet.create(styler.stylesheetInput(newStyles)));
    }

    cssCache[cacheKey] = aphroditeCss(formattedClasses.map(getStylesheet));
    return cssCache[cacheKey];
  }
}
