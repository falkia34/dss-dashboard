'use server';

import { Auth } from '@/config';

export async function login() {
  await Auth.signIn('google');
}
