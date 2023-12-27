import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigSettings {
  private LANG_KEY = 'lang';
  _lang: string;

  constructor() {
    this._lang = this.getStoredLang() || 'en';
  }

  setLang(lang?: string) {
    if (lang) {
      localStorage.setItem(this.LANG_KEY, lang);
      this._lang = lang;
    }
  }

  getLang() {
    const storedLang = this.getStoredLang();
    return storedLang ? storedLang : 'en';
  }

  private getStoredLang(): string | null {
    const storedLang = localStorage.getItem(this.LANG_KEY);
    return storedLang ? (storedLang as string) : null;
  }
}
