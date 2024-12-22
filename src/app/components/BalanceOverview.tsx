import { Card } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { ArrowRight } from 'lucide-react';

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

interface BalanceOverviewProps {
  friends: Friend[];
}

export default function BalanceOverview({ friends }: BalanceOverviewProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Total Balance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">You are owed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">$150.25</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">You owe</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">$85.50</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Individual Balances</h3>
        <div className="space-y-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{friend.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-green-600">$45.25</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}