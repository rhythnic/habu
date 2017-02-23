const borderStyle = {
  n: 'none',
  h: 'hidden',
  dt: 'dotted',
  ds: 'dashed',
  s: 'solid',
  db: 'double',
  g: 'groove',
  r: 'ridge',
  i: 'inset',
  o: 'outset'
};

const textDecorationStyle = {
  s: 'solid',
  db: 'double',
  dt: 'dotted',
  d: 'dashed',
  w: 'wavy'
};

const textDecorationLine = {
  n: 'none',
  u: 'underline',
  o: 'overline',
  l: 'line-through'
};

const alignItems = {
  fs: 'flex-start',
  fe: 'flex-end',
  c: 'center',
  bl: 'baseline',
  s: 'stretch'
};

const overflow = {
  a: 'auto',
  v: 'visible',
  h: 'hidden',
  s: 'scroll'
};

const timingFunction = {
  e: 'ease',
  ei: 'ease-in',
  eo: 'ease-out',
  eio: 'ease-in-out',
  l: 'linear',
  ss: 'step-start',
  se: 'step-end'
};

const listStyleType = {
  d: 'disc',
  c: 'circle',
  s: 'square',
  de: 'decimal',
  g: 'georgian',
  cj: 'cjk-ideographic',
  k: 'kannada'
};

const none = {
  n: 'none'
};


export default {

  boxSizing: {
    c: 'content-box',
    b: 'border-box'
  },

  position: {
    s: 'static',
    r: 'relative',
    a: 'absolute',
    f: 'fixed',
    s: 'sticky'
  },

  float: {
    l: 'left',
    r: 'right',
    n: 'none',
    is: 'inline-start',
    ie: 'inline-end'
  },

  textAlign: {
    l: 'left',
    r: 'right',
    c: 'center',
    j: 'justify',
    ja: 'justify-all',
    s: 'start',
    e: 'end',
    m: 'match-parent'
  },

  verticalAlign: {
    t: 'top',
    m: 'middle',
    bt: 'bottom',
    bl: 'baseline',
    sb: 'sub',
    sp: 'super',
    tt: 'text-top',
    tb: 'text-bottom'
  },

  clear: {
    n: 'none',
    l: 'left',
    r: 'right',
    b: 'both',
    is: 'inline-start',
    ie: 'inline-end'
  },

  borderStyle,
  borderBottomStyle: borderStyle,
  borderTopStyle: borderStyle,
  borderLeftStyle: borderStyle,
  borderRightStyle: borderStyle,

  borderCollapse: {
    c: 'collapse',
    s: 'separate'
  },

  backgroundPosition: {
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    c: 'center'
  },

  backgroundClip: {
    bb: 'border-box',
    pb: 'padding-box',
    cb: 'content-box',
    t: 'text'
  },

  backgroundSize: {
    a: 'auto',
    cv: 'cover',
    cn: 'contain'
  },

  fontWeight: {
    b: 'bold',
    n: 'normal',
    l: 'lighter',
    br: 'bolder'
  },

  fontSize: {
    l: 'large'
  },

  fontStyle: {
    n: 'normal',
    i: 'italic',
    o: 'oblique'
  },

  fontSmoothing: {
    a: 'auto',
    n: 'never',
    al: 'always'
  },

  textDecoration: textDecorationLine,
  textDecorationLine,
  textDecorationStyle,

  textTransform: {
    c: 'capitalize',
    u: 'uppercase',
    l: 'lowercase',
    n: 'none',
    f: 'full-width'
  },

  whiteSpace: {
    n: 'normal',
    nw: 'nowrap',
    p: 'pre',
    pw: 'pre-wrap',
    pl: 'pre-line'
  },

  textOverflow: {
    c: 'clip',
    e: 'ellipsis'
  },

  wordBreak: {
    n: 'normal',
    b: 'break-all',
    k: 'keep-all'
  },

  textRendering: {
    a: 'auto',
    os: 'optimizeSpeed',
    ol: 'optimizeLegibility',
    g: 'geometricPrecision'
  },

  flexFlow: {
    rw: 'row wrap',
    rn: 'row nowrap',
    cw: 'column wrap',
    cn: 'column nowrap'
  },

  justifyContent: {
    fs: 'flex-start',
    fe: 'flex-end',
    c: 'center',
    sb: 'space-between',
    sa: 'space-around'
  },

  alignItems,
  alignSelf: alignItems,

  alignContent: {
    fs: 'flex-start',
    fe: 'flex-end',
    c: 'center',
    sb: 'space-between',
    sa: 'space-around',
    s: 'stretch'
  },

  flex: {
    '0': '0 1 auto',
    '1': '1 1 auto'
  },

  cursor: {
    a: 'auto',
    d: 'default',
    n: 'none',
    h: 'help',
    po: 'pointer',
    pr: 'progress',
    w: 'wait',
    al: 'alias',
    cp: 'copy',
    m: 'move',
    nd: 'no-drop',
    na: 'not-allowed',
    as: 'all-scroll',
    cr: 'col-resize',
    rr: 'row-resize',
    zi: 'zoom-in',
    zo: 'zoom-out',
    g: 'grab',
    gn: 'grabbing'
  },

  pointerEvents: {
    n: 'none',
    a: 'auto'
  },

  overflow,
  overflowX: overflow,
  overflowY: overflow,

  overflowWrap: {
    n: 'normal',
    b: 'break-word'
  },

  transitionTimingFunction: timingFunction,
  animationTimingFunction: timingFunction,

  transform: none,

  display: {
    b: 'block',
    ib: 'inline-block',
    i: 'inline',
    fx: 'flex'
  },

  listStyle: listStyleType,
  listStyleType,

  userSelect: {
    n: 'none',
    a: 'auto',
    t: 'text',
    c: 'contain'
  },

  tableLayout: {
    a: 'auto',
    f: 'fixed'
  },

  quotes: none,

  touchAction: {
    a: 'auto',
    n: 'none',
    px: 'pan-x',
    pl: 'pan-left',
    pr: 'pan-right',
    py: 'pan-y',
    pu: 'pan-up',
    pd: 'pan-down',
    pz: 'pinch-zoom',
    m: 'manipulation'
  }

};
