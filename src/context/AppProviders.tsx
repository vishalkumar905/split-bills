import React, { ReactNode } from "react";
import { UsersProvider } from "./UsersContext";
import { GroupsProvider } from "./GroupsContext";
import { FriendsProvider } from "./FriendsContext";
import { ExpensProvider } from "./ExpenseContext";
import AuthProvider from "./AuthProvider";

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <GroupsProvider>
          <FriendsProvider>
            <ExpensProvider>{children}</ExpensProvider>
          </FriendsProvider>
        </GroupsProvider>
      </UsersProvider>
    </AuthProvider>
  );
};
