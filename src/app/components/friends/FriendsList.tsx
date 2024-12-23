import { Card } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';

interface Friend {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface FriendsListProps {
  friends: Friend[];
}

export function FriendsList({ friends }: FriendsListProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Friends</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {friends.map((friend) => (
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
  );
}