import { PageHeader } from '@/components/layout/page-header';
import { UserList } from '@/components/dashboard/user-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <PageHeader 
        title="User Dashboard"
        description="View and manage all users in the system"
        action={
          <Link href="/dashboard/add">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
          </Link>
        }
      />
      <UserList />
    </>
  );
}