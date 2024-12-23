import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Receipt, Users, UserPlus, UsersRound } from 'lucide-react';

interface SidebarProps {
  onAddExpense: () => void;
  onAddFriend: () => void;
  onCreateGroup: () => void;
}

export function Sidebar({ onAddExpense, onAddFriend, onCreateGroup }: SidebarProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start" onClick={onAddExpense}>
          <Receipt className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Friends
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={onAddFriend}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={onCreateGroup}>
          <UsersRound className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>
    </Card>
  );
}