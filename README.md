![habu-logo](https://cloud.githubusercontent.com/assets/8162640/22945227/772ed4ac-f2c1-11e6-8a17-e3735d2ec7f6.png)

## Habu

#### Concise inline styles with theme and mixin support, powered by [aphrodite](https://github.com/Khan/aphrodite).

Habu is small utility that gives you the ability to write concise inline styles.
* Only dependency (peer-dep) is aphrodite
* Habu supports all front-end frameworks supported by aphrodite
* Total size, not gzipped, is 28kb (20kb aphrodite, 8kb habu)
* Supports themes, mixins, media queries, pseudo-selectors, and css abbreviations

```
npm install --save habu
```

### Example (React)
```
function MyComponent(props, { css }) {
  const itemStyle = css('d:b', '>900px(d:ib, w:50%)', ':hover(bg:@accentColor)');

  return (
    <ul className={css('p:0', 'm:0', 'lineHeight:1.5')}>
      {props.items.map((item, i) => (
        <li key={i} className={itemStyle}>{item}</li>  
      ))}
    </ul>
  );
}
```

#### Explanation
In the example, the css function is on the React context.  If you're not familiar with React, just ignore this.
What matters is that the css function inside of the component has been configured.
During configuration, you can pass a theme, mixins, and abbreviations.  Any css property or value is checked against
the abbreviation dictionaries in attempt to find a match.  If no match is found, the values are assumed to be valid css (css in js).

* 'd:b' -> display: block
* 'd:ib' -> display: inline-block
* '>900px' -> @media(min-width: 900px)

## Configuration
I expect that in the early days of this library that the css property and value abbreviations will evolve while we support more css rules and find the right balance of brevity and legibility.  I recommend copying the abbreviations in the src folder into your own code as a starting point, and don't import them from Habu until they are more stable.

```
import configureCss from 'habu/configure-css';
import theme from './theme';
import mixins from './mixins';
import cssProps from ./css-props;
import cssVals from './css-vals'

const css = configureCss({ theme, cssProps, cssVals, mixins });
export default css;
```

## Theme
Theme is an object that can have as many levels as you want, but no arrays.  A typical theme might have colors, breakpoints, and complex css values like shadows or transitions.
```
const theme = {
  colors: {
    primary: 'rgb(38, 177, 32)',
    accent: 'rgb(214, 123, 237)'
  },
  bp: {
    mobile: 600  // can also be a string (e.g. 10em)
  },
  trans: {
    fade: 'opacity 0.5s ease-out'
  }
};
```

### Configuring css with the theme
In addition to the theme, config accepts an array 'prefixesToRemove'.
Normally when using a theme variable, you would write the whole path.
```
css('color:@colors.primary')
```
If you add 'colors' to the prefixesToRemove array, you don't need to include colors in the path.

```
configureCss({ theme, prefixesToRemove: ['colors'] })
```

```
css('color:@primary')
```

### Examples of using theme variables
These examples assume you've included the corresponding abbreviations in the config.
```
css('c:@primary') // color: rgb(38, 177, 32)
css('>@bp.mobile(m:25)') // @media (min-width: 600px)
css('border:1px solid @accent') // border: 1px solid rgb(214, 123, 237)
```

## Pseudo-selectors
```
css(':hover(bgc:#888)')
css(':active(bgc:#2592a1)')
```

## Media queries
```
// d:b is display: 'block'
// if vw or vh is missing, it's assumed to be vw
css('vw<40em(d:b)') // @media (max-width: 40em)
css('<40em(d:b)')   // @media (max-width: 40em)
css('vh>100(d:b)')  // @media (min-height: 100px)
```

## Mixins
A mixin is a function with any arity, but all arguments must be strings.
The mixin should return an array of strings.  The strings can contain all the goodies that you can use in the css function.

```
// mixins.js

export function pngIcon(size) {
  const dimensions = square(size);
  return [
    ...dimensions,
    bgs: '100% 100%',  // background-size
    bgr: 'no-repeat'   // background-repeat
  ];
}

export function square(size) {
  return [ `width:${size}`, `height:${size}` ];
}
```

### Using a mixin
```
css(`bg:url(${ICON_URL})`, 'pngIcon(40px)')
```


## Moving forward

Please create an issue for any bug report, feature-request, etc.
I will continue to work on improving the abbreviations, building a docs page, and creating some usage examples.
