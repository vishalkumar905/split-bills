import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useToast } from '@/app/hooks/use-toast';
import { Users, Search, Plus } from 'lucide-react';
import { GroupMemberList } from './GroupMemberList';
import { SearchUsersList } from './SearchUsersList';
import { useGroups } from '@/context/GroupsContext';

interface CreateGroupFormProps {
  onClose: () => void;
}

export function CreateGroupForm({ onClose }: CreateGroupFormProps) {
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const { toast } = useToast();

  const { groups, setGroups } = useGroups();

  console.log(groups.length)


  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('handleCreateGroup --- called ')

    if (!groupName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name",
        variant: "destructive",
      });
      return;
    }
    if (selectedMembers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one member to the group",
        variant: "destructive",
      });
      return;
    }

    const group = {
      id: `${groups.length + 1}`,
      name: groupName,
      totalExpenses: 0,
      members: selectedMembers,
    }
    
    setGroups([...groups, group ])

    toast({
      title: "Success",
      description: `Group "${groupName}" created with ${selectedMembers.length} members`,
    });
    onClose();
  };

  const handleAddMember = (member: any) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Create New Group
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreateGroup} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div className="space-y-2">
            <Label>Add Members</Label>
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email"
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {selectedMembers.length > 0 && (
            <GroupMemberList
              members={selectedMembers}
              onRemoveMember={handleRemoveMember}
            />
          )}

          <SearchUsersList
            searchQuery={searchQuery}
            onAddMember={handleAddMember}
            selectedMemberIds={selectedMembers.map(m => m.id)}
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}