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
import AddFriendForm from '@/app/components/AddFriendForm';
import { CreateGroupForm } from '@/app/components/groups/CreateGroupForm';
import { Sidebar } from '@/app/components/Layout/Sidebar';
import { GroupsList } from '@/app/components/groups/GroupsList';
import { FriendsList } from '@/app/components/friends/FriendsList';
import { useGroups } from '@/context/GroupsContext';

// Demo data
const demoGroups = [
  {
    id: 'g1',
    name: 'Weekend Trip',
    members: [
      { id: '1', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      { id: '2', name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      { id: '3', name: 'Emma Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
      { id: '4', name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' }
    ],
    totalExpenses: 450.75
  },
  {
    id: 'g2',
    name: 'Roommates',
    members: [
      { id: '2', name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      { id: '3', name: 'Emma Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }
    ],
    totalExpenses: 850.25
  },
  {
    id: 'g3',
    name: 'Office Lunch',
    members: [
      { id: '1', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      { id: '4', name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' },
      { id: '5', name: 'Jessica Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }
    ],
    totalExpenses: 125.50
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const { groups = [] } = useGroups()

  console.log({ groups })

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

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
            <Sidebar 
              onAddExpense={() => setShowExpenseForm(true)}
              onAddFriend={() => setShowAddFriendForm(true)}
              onCreateGroup={() => setShowCreateGroupForm(true)}
            />
             <div className="mt-6">
              <GroupsList 
                groups={demoGroups}
                onSelectGroup={setSelectedGroupId}
                selectedGroupId={selectedGroupId}
              />
            </div>
          </div>

          <div className="col-span-6">
            <div className="mb-4">
              {selectedGroup && (
                <div className="flex items-center space-x-2 mb-4">
                  <h2 className="text-2xl font-bold">{selectedGroup.name}</h2>
                  <span className="text-sm text-muted-foreground">
                    ({selectedGroup.members.length} members)
                  </span>
                </div>
              )}
            </div>
            <Tabs defaultValue="expenses" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="expenses" className="flex-1">
                  {selectedGroup ? 'Group Expenses' : 'All Expenses'}
                </TabsTrigger>
                <TabsTrigger value="balances" className="flex-1">Balances</TabsTrigger>
              </TabsList>
              <TabsContent value="expenses">
                <ExpenseList />
              </TabsContent>
              <TabsContent value="balances">
                <BalanceOverview friends={selectedGroup?.members || []} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-3">
            <FriendsList friends={selectedGroup?.members || []} />
          </div>
        </div>

        {showExpenseForm && <ExpenseForm onClose={() => setShowExpenseForm(false)} />}
        {showAddFriendForm && <AddFriendForm onClose={() => setShowAddFriendForm(false)} />}
        {showCreateGroupForm && <CreateGroupForm onClose={() => setShowCreateGroupForm(false)} />}

      </main>

      
    
  );
}

export default App;