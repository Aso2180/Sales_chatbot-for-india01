import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MainApp from '@/components/MainApp';

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return <MainApp userName={session.user.name ?? ''} />;
}
