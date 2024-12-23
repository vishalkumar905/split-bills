import { Card } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Users } from 'lucide-react';
import { useGroups } from '@/context/GroupsContext';

interface Group {
  id: string;
  name: string;
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  totalExpenses: number;
}

interface GroupsListProps {
  groups: Group[];
  onSelectGroup: (groupId: string) => void;
  selectedGroupId?: string;
}

export function GroupsList({ onSelectGroup, selectedGroupId }: GroupsListProps) {

  const { groups } = useGroups()

  console.log({ groups, selectedGroupId })

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Your Groups</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedGroupId === group.id 
                  ? 'bg-primary/10'
                  : 'hover:bg-accent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{group.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    {group.members.length > 3 && (
                      <span className="text-sm text-muted-foreground ml-2">
                        +{group.members.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  ${group.totalExpenses.toFixed(2)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}