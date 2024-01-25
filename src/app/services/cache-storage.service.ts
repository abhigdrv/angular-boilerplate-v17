import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheStorageService {
  constructor() {}

  async addToCache(key: string, data: any) {
    const cache = await caches.open('ab17-cache');
    const response = new Response(JSON.stringify(data));
    await cache.put(key, response);
  }

  async getFromCache(key: string) {
    const cache = await caches.open('ab17-cache');
    const response = await cache.match(key);
    if (response) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  }
}
