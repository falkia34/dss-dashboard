import { injectable } from 'inversify';

export interface SessionStorageDataSource {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

@injectable()
export class SessionStorageDataSourceImpl implements SessionStorageDataSource {
  public get<T>(key: string): T {
    'use client';
    return JSON.parse(window.sessionStorage.getItem(key) || '{}');
  }

  public set<T>(key: string, value: T): void {
    'use client';
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    'use client';
    window.sessionStorage.removeItem(key);
  }
}
