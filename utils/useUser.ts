import { useState, useEffect } from "react";

type UseUserReturn = [string, (username: string) => void];

// Very simple mechanism to get keep the "logged in" user.
const useUser = (): UseUserReturn => {
  const [username, setUsername] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("username") || "";
    }
    return "";
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return [username, setUsername];
};

export default useUser;
