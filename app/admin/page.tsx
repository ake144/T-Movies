
import { getServerSession } from "next-auth";
import  authOptions from "@/lib/auth"; 
import { redirect } from "next/navigation";
import DashboardPage from '@/components/dashboard/content';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  return (
    <div>
      <DashboardPage />
    </div>
  );
}
