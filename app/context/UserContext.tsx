"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  username: string | null;
  accountId: string | null;
  setUsername: (username: string) => void;
  setAccountId: (accountId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsernameState] = useState<string | null>(null);
  const [accountId, setAccountIdState] = useState<string | null>(null);

  useEffect(() => {
    setUsernameState(localStorage.getItem("username"));
    setAccountIdState(localStorage.getItem("accountId"));
  }, []);

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const setAccountId = (newAccountId: string) => {
    setAccountIdState(newAccountId);
    localStorage.setItem("accountId", newAccountId);
  };

  return (
    <UserContext.Provider value={{ username, accountId, setUsername, setAccountId }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
