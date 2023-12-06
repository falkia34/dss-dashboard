import { injectable } from 'inversify';

export interface LocalStorageDataSource {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

@injectable()
export class LocalStorageDataSourceImpl implements LocalStorageDataSource {
  public get<T>(key: string): T {
    'use client';
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  }

  public set<T>(key: string, value: T): void {
    'use client';
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    'use client';
    window.localStorage.removeItem(key);
  }
}
