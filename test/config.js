import { cssProps, cssVals } from '../src/index';
import { center } from './mixins';

export default {
  theme: {
    colors: {
      'red': 'rgb(247, 60, 48)',
      'green': 'rgb(7, 125, 19)'
    },
    sizes: {
      mobile: 500,
      tablet: 900
    }
  },
  prefixesToRemove: ['colors'],
  mixins: { center },
  cssProps,
  cssVals
}
