export function getValue(obj: any, keys: string[]): any | undefined {
  return keys.reduce((currentObj, key) => {
    return currentObj && typeof currentObj === 'object' && key in currentObj
      ? currentObj[key]
      : undefined;
  }, obj);
}
