import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Plus } from 'lucide-react';

interface SearchUsersListProps {
  searchQuery: string;
  selectedMemberIds: string[];
  onAddMember: (member: any) => void;
}

export function SearchUsersList({ searchQuery, selectedMemberIds, onAddMember }: SearchUsersListProps) {
  // Demo data - replace with actual API call in production
  const searchResults = [
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
  ].filter(user => 
    !selectedMemberIds.includes(user.id) &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <ScrollArea className="max-h-[200px]">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Suggested Users</h4>
        <div className="space-y-2">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
            >
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
                variant="ghost"
                onClick={() => onAddMember(user)}
                className="ml-2"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}