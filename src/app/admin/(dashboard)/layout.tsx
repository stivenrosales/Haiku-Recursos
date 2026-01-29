import { Sidebar } from '@/components/admin/Sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-[#FAF9F6]">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-12">{children}</div>
      </main>
    </div>
  );
}
