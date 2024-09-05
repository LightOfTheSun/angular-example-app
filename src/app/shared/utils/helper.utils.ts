import { SIGNAL } from '@angular/core/primitives/signals';
import { Signal, WritableSignal } from '@angular/core';

export function objectIsSignal<T>(obj: any): obj is Signal<T> {
  try {
    return SIGNAL in obj;
  } catch (e) {
    return false;
  }
}

export const generateRandomString = (symbols: number = 16): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: symbols }, () => possible[Math.floor(Math.random() * possible.length)]).join('');
};

export const patchSignal = <T>(source: WritableSignal<T>, value: Partial<T>) => {
  source.update((prev) => ({ ...prev, ...value }));
};

