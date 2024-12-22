import { useState } from 'react';

import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Users, Receipt, PiggyBank, UserPlus } from 'lucide-react';
import ExpenseForm from '@/app/components/ExpenseForm';
import ExpenseList from '@/app/components/ExpenseList';
import BalanceOverview from '@/app/components/BalanceOverview';
import { useToast } from '@/app/hooks/use-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const { toast } = useToast();

  const demoFriends = [
    { id: 1, name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { id: 2, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { id: 3, name: 'Emma Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
  ];

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${email}`,
    });
  };

//   if (!isAuthenticated) {
//     return <AuthPage onLogin={handleLogin} />;
//   }

  return (
    


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Card className="p-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowExpenseForm(true)}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Friends
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Friend
                </Button>
              </div>
            </Card>
          </div>

          <div className="col-span-6">
            <Tabs defaultValue="expenses" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="expenses" className="flex-1">Recent Expenses</TabsTrigger>
                <TabsTrigger value="balances" className="flex-1">Balances</TabsTrigger>
              </TabsList>
              <TabsContent value="expenses">
                <ExpenseList />
              </TabsContent>
              <TabsContent value="balances">
                <BalanceOverview friends={demoFriends} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-3">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Friends</h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {demoFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{friend.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>

        {showExpenseForm && <ExpenseForm onClose={() => setShowExpenseForm(false)} />}
      </main>

      
    
  );
}

export default App;