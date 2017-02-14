export function trim(x) {
  return x.trim();
}

export function isNonEmptyString(x) {
  return typeof x === 'string' && !!x;
}

export function getProp(obj) {
  return prop => obj[prop];
}

export function find(fn, arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (!!fn(arr[i])) return arr[i];
  }
}

export function flattenArray(arr) {
  return arr.reduce((acc, x) => {
    if (Array.isArray(x)) acc.push(...flattenArray(x));
    else acc.push(x);
    return acc;
  }, []);
}

export function flattenObject(obj, path = '', result = {}) {
  if (typeof obj !== 'object') {
    result[path] = obj;
    return result;
  };
  return Object.keys(obj).reduce(
    (acc, x) => flattenObject(obj[x], path ? `${path}.${x}` : x, result),
    result
  );
}
