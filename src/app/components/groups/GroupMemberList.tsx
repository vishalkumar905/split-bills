import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { X } from 'lucide-react';

interface GroupMemberListProps {
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  onRemoveMember: (memberId: string) => void;
}

export function GroupMemberList({ members, onRemoveMember }: GroupMemberListProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Selected Members</h4>
      <div className="flex flex-wrap gap-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full"
          >
            <Avatar className="h-5 w-5">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{member.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => onRemoveMember(member.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}