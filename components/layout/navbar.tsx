import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Users, UserPlus } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Users className="h-6 w-6" />
          <span>User Management</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard/add">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
            <Button variant="outline" size="icon" className="sm:hidden">
              <UserPlus className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}