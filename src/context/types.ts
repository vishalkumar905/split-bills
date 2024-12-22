export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
}

export interface Friend {
  id: string;
  name: string;
  mutualFriends: number;
}

export interface Expens {
  id: string;
  content: string;
  createdBy: User;
  createdAt: Date;
}
