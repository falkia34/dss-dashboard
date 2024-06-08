import { Auth } from '@/config';
import { LoginForm } from '@/presentation/components/auth/login';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
};

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await Auth.auth();

  if (session) {
    if (searchParams.callbackUrl) {
      redirect(searchParams.callbackUrl);
    }

    redirect('/');
  }

  return (
    <section className="flex items-center px-6 py-20 min-h-screen md:px-12 lg:px-18">
      <LoginForm />
    </section>
  );
}
