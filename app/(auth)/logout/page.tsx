import { Auth } from '@/config';
import { LogoutForm } from '@/presentation/components/auth/logout';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Logout',
};

export default async function LogoutPage() {
  const session = await Auth.auth();

  if (!session) {
    redirect('/');
  }

  return (
    <section className="flex items-center px-6 py-20 min-h-screen md:px-12 lg:px-18">
      <LogoutForm />
    </section>
  );
}
