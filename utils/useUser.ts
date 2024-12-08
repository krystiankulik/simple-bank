"use client";

import { useCallback } from "react";

export const useUserData = () => {
  const isBrowser = typeof window !== "undefined";

  const saveUsername = useCallback(
    (username: string) => {
      if (isBrowser) {
        localStorage.setItem("username", username);
      }
    },
    [isBrowser],
  );

  const saveAccountId = useCallback(
    (accountId: string) => {
      if (isBrowser) {
        localStorage.setItem("accountId", accountId);
      }
    },
    [isBrowser],
  );

  const getUsername: () => string | null = useCallback(() => {
    if (isBrowser) {
      return localStorage.getItem("username");
    }
    return null;
  }, [isBrowser]);

  const getAccountId: () => string | null = useCallback(() => {
    if (isBrowser) {
      return localStorage.getItem("accountId");
    }
    return null;
  }, [isBrowser]);

  return { getUsername, getAccountId, saveUsername, saveAccountId };
};
