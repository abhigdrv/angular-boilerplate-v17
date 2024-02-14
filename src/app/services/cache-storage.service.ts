import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CacheStorageService {
  private readonly CACHE_KEY = 'ab17-cache';
  private readonly CACHE_TIMEOUT = environment.cache.timeOut || 3600000;

  constructor() {
    this.checkCacheExpiration();
  }

  async addToCache(key: string, data: any) {
    const cache = await caches.open(this.CACHE_KEY);
    const response = new Response(JSON.stringify(data));
    await cache.put(key, response);
    this.updateCacheTimestamp();
  }

  async getFromCache(key: string) {
    const cache = await caches.open(this.CACHE_KEY);
    const response = await cache.match(key);
    if (response) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  }

  async clearCache(){
    await caches.delete(this.CACHE_KEY);
  }

  private updateCacheTimestamp() {
    const currentTime = new Date().getTime();
    localStorage.setItem('cacheTimestamp', currentTime.toString());
  }

  private async checkCacheExpiration() {
    const lastUpdate = localStorage.getItem('cacheTimestamp');
    if (lastUpdate) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(lastUpdate, 10);
      if (timeElapsed >= this.CACHE_TIMEOUT) {
        await caches.delete(this.CACHE_KEY);
        localStorage.removeItem('cacheTimestamp');
      }
    }
  }
}
