export {};
declare global {
  interface String {
    capitalizeFirstLetter(): string;
  }
  interface Array<T> {
    groupBy(callback: (item: T) => string): Record<string, T[]>;
    groupByKey(key: string): Record<string, T[]>;
    distinct(): T[];
    distinctByKey(key: string): T[];
    sortBy(callback: (item: T) => any): T[];
    sortByKey(key: string): T[];
    sum(callback: (item: T) => number): number;
    sumByKey(key: string): number;
    chunk(size: number): T[][];
    unique(): T[];
    uniqueBy(key: string): T[];
    remove(item: T): T[];
    removeByKeyValue(key: string, value: any): T[];
    findIndexByKeyValue(key: string, value: any): number;
    findByKeyValue(key: string, value: any): T | undefined;
    findValueByKeyValue(
      key: string,
      value: any,
      retrieveKey: string,
    ): any | undefined;
  }
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.groupBy = function <T>(
  callback: (item: T) => string,
): Record<string, T[]> {
  return this.reduce((acc, item) => {
    const key = callback(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};
Array.prototype.groupByKey = function <T>(
  keyName: string,
): Record<string, T[]> {
  return this.reduce((acc, item) => {
    const key = item[keyName];
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};
Array.prototype.distinct = function <T>(): T[] {
  return [...new Set(this)];
};
Array.prototype.distinctByKey = function <T>(key: string): T[] {
  const uniqueKeys = new Set();
  return this.filter((item) => {
    const itemKey = (item as any)[key];
    if (!uniqueKeys.has(itemKey)) {
      uniqueKeys.add(itemKey);
      return true;
    }
    return false;
  });
};
Array.prototype.sortBy = function <T>(callback: (item: T) => any): T[] {
  return [...this].sort((a, b) => {
    const keyA = callback(a);
    const keyB = callback(b);
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
};
Array.prototype.sortByKey = function <T>(key: string): T[] {
  return [...this].sort((a, b) => {
    const keyA = a[key];
    const keyB = b[key];
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
};
Array.prototype.sum = function <T>(callback: (item: T) => number): number {
  return this.reduce((acc, item) => acc + callback(item), 0);
};
Array.prototype.sumByKey = function <T>(key: string): number {
  return this.reduce((acc, item) => acc + item[key], 0);
};
Array.prototype.chunk = function <T>(size: number): T[][] {
  return Array.from({ length: Math.ceil(this.length / size) }, (__, index) =>
    this.slice(index * size, index * size + size),
  );
};
Array.prototype.unique = function <T>(): T[] {
  return Array.from(new Set(this));
};
Array.prototype.uniqueBy = function <T>(key: string): T[] {
  const uniqueKeys = new Set();
  return this.filter((item) => {
    const itemKey = (item as any)[key];
    if (!uniqueKeys.has(itemKey)) {
      uniqueKeys.add(itemKey);
      return true;
    }
    return false;
  });
};
Array.prototype.remove = function <T>(item: T): T[] {
  return this.filter((i) => i !== item);
};
Array.prototype.removeByKeyValue = function <T>(key: string, value: any): T[] {
  return this.filter((item) => (item as any)[key] !== value);
};
Array.prototype.findIndexByKeyValue = function <T>(
  key: string,
  value: any,
): number {
  for (let i = 0; i < this.length; i++) {
    if ((this[i] as any)[key] === value) {
      return i;
    }
  }
  return -1;
};
Array.prototype.findByKeyValue = function <T>(
  key: string,
  value: any,
): T | undefined {
  return this.find((item) => (item as any)[key] === value);
};
Array.prototype.findValueByKeyValue = function <T>(
  key: string,
  value: any,
  retrieveKey: string,
): any | undefined {
  const foundItem = this.find((item) => (item as any)[key] === value);
  if (foundItem) {
    return (foundItem as any)[retrieveKey];
  }
  return undefined;
};
