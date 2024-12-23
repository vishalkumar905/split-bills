import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/app/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Search, UserPlus } from 'lucide-react';

interface AddFriendFormProps {
  onClose: () => void;
}

export default function AddFriendForm({ onClose }: AddFriendFormProps) {
  const [email, setEmail] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 'demo1',
      name: 'Alex Thompson',
      email: 'alex.t@example.com',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
    },
    {
      id: 'demo2',
      name: 'Jessica Lee',
      email: 'jessica@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    }
  ]);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search the database
    toast({
      title: "Searching...",
      description: `Looking for user with email: ${email}`,
    });
  };

  const handleAddFriend = (friendId: string) => {
    // In a real app, this would send a friend request
    toast({
      title: "Friend Request Sent",
      description: "They'll need to accept your request to start splitting expenses",
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add a Friend
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Search by email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Suggested Users</h4>
          <div className="space-y-3">
            {searchResults.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddFriend(user.id)}
                  className="ml-2"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}