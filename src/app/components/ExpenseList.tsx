import { Card } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Receipt, Coffee, ShoppingCart, Utensils } from 'lucide-react';

const demoExpenses = [
  {
    id: 1,
    description: 'Lunch at Cafe',
    amount: 45.50,
    paidBy: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    date: '2024-03-20',
    icon: Utensils,
  },
  {
    id: 2,
    description: 'Groceries',
    amount: 89.99,
    paidBy: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    date: '2024-03-19',
    icon: ShoppingCart,
  },
  {
    id: 3,
    description: 'Coffee Run',
    amount: 22.75,
    paidBy: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    date: '2024-03-18',
    icon: Coffee,
  },
];

export default function ExpenseList() {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {demoExpenses.map((expense) => {
          const Icon = expense.icon;
          return (
            <Card key={expense.id} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{expense.description}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={expense.avatar} />
                      <AvatarFallback>{expense.paidBy[0]}</AvatarFallback>
                    </Avatar>
                    <span>{expense.paidBy} paid</span>
                    <span>•</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${expense.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">You owe ${(expense.amount / 2).toFixed(2)}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}