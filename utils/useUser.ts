"use client";

import { useCallback } from "react";

export const useUserData = () => {
  const saveUsername = useCallback((username: string) => {
    localStorage.setItem("username", username);
  }, []);

  const saveAccountId = useCallback((accountId: string) => {
    localStorage.setItem("accountId", accountId);
  }, []);

  const getUsername: () => string | null = useCallback(() => {
    return localStorage.getItem("username");
  }, []);

  const getAccountId: () => string | null = useCallback(() => {
    return localStorage.getItem("accountId");
  }, []);

  return { getUsername, getAccountId, saveUsername, saveAccountId };
};
