'use server';

import { Auth } from '@/config';

export async function logout() {
  await Auth.signOut();
}
