![habu-logo](https://cloud.githubusercontent.com/assets/8162640/22945227/772ed4ac-f2c1-11e6-8a17-e3735d2ec7f6.png)

## Habu

#### Concise inline styles with theme and mixin support, powered by [aphrodite](https://github.com/Khan/aphrodite).

Habu is a utility that gives you the ability to write concise inline styles.
* Only dependency (peer-dep) is aphrodite
* Habu supports all front-end frameworks supported by aphrodite
* Total size, including aphrodite, is about 9kb gzipped
* Supports themes, mixins, media queries, pseudo-selectors, and css abbreviations

```
npm install --save aphrodite habu
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
During configuration, you can pass a theme, mixins, and abbreviations.  When calling the css function, the format of the strings are analyzed
to determine if it's a mediaQuery, mixin, pseudo-selector, or css rule.

* 'm:0' -> { margin: 0 }
* 'p:0' -> { padding: 0 }
* 'd:b' -> { display: block }
* 'd:ib' -> { display: inline-block }
* '>900px(d:ib, w:50%)' -> '@media(min-width: 900px)' { display: 'inline-block', width: '50%' }


## Css arguments
The arguments to the css function can be strings, arrays, and falsey values.  Falsey values are removed and nested arrays of any depth are flattened.

```
const lineItemStyle = css(
  'p:0',
  isSelected ? [':hover(c:#464747)', 'bg:#46a2d5'] : [':hover(c:#f0f0f2)', 'bg:#72c251'],
  isSelected && 'b:1px solid #d9611e'
);
```


## Configuration
cssProps and cssVals (css prop and value abbreviations) are stable and can be imported directly from habu.  You have to option of extending these objects if
you want to add more abbreviations.  Any breaking change to the abbreviations should only be possible during a major version release.

```
import { configureCss, cssProps, cssVals } from 'habu';
import theme from './theme';
import mixins from './mixins';

const css = configureCss({ theme, cssProps, cssVals, mixins });
export default css;
```


## Abbreviations
Any css property or value is checked against the abbreviation dictionaries in attempt to find a match.
If no match is found, the values are assumed to be valid css (css in js).  Abbreviations are not supported inside of shorthand css rules.
To better understand which abbreviations are supported, browse through the abbreviation files inside of src.
You can always extend/mutate the abbreviation objects before passing them to the configureCss function.

```
// this is ok
css('bs:s')   // { borderStyle: 'solid' }

// this is ok
css('b:1px solid #888')  // { border: '1px solid #888' }

// this is NOT ok
// might be a future enhancement
css('b: 1px s #888')   // { border: '1px s #888' }  invalid css
```


## Theme
Theme is an object that can have as many levels as you want, but no arrays.
A typical theme might have colors, breakpoints, and complex css values like shadows or transitions.

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
css('c:@colors.primary')  // { color: 'rgb(38, 177, 32)'}
```
If you add 'colors' to the prefixesToRemove array, you don't need to include colors in the path.

```
configureCss({ theme, prefixesToRemove: ['colors'] })
```

```
css('c:@primary')
```


### Examples of using theme variables
These examples assume you've included the corresponding abbreviations in the config.
```
css('c:@primary')           // { color: 'rgb(38, 177, 32)' }
css('>@bp.mobile(m:25)')    // '@media (min-width: 600px)' { margin: 25 }
css('b:1px solid @accent')  // { border: '1px solid rgb(214, 123, 237)' }
```


## Pseudo-selectors
```
css(':hover(bgc:#888)')      // { ':hover': { backgroundColor: '#888' } }
css(':active(bgc:#2592a1)')  // { ':active': { backgroundColor: '#2592a1' } }
```


## Media queries
If vw or vh is missing, it's assumed to be vw.

```
css('vw<40em(d:b)')  // '@media (max-width: 40em)': { display: 'block' }
css('<40em(d:b)')    // '@media (max-width: 40em)': { display: 'block' }
css('vh>100(d:b)')   // '@media (min-height: 100px)': { display: 'block' }
```


## Mixins
A mixin is a function with any arity, but all arguments must be strings.
The mixin should return an array of strings which are applied as arguments to the css function.
The strings can contain all the goodies that you can use in the css function.

```
// mixins.js

export function pngIcon(size) {
  return [
    ...square(size),
    'bgz:100% 100%',  // { backgroundSize: '100% 100%' }
    'bgr:n'           // { backgroundRepeat: 'no-repeat' }
  ];
}

export function square(size) {
  return [ `w:${size}`, `h:${size}` ];
}
```


### Using a mixin
```
css(`bg:url(${ICON_URL})`, 'pngIcon(40px)')
```


## Moving forward

Please create an issue for any bug report, feature-request, etc.
