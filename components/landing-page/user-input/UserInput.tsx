"use client";

import { UserProvider } from "@/context/UserContext";
import { UserInputForm } from "@/components/landing-page/user-input/UserInputForm";

export const UserInput = () => {
  return (
    <UserProvider>
      <UserInputForm />
    </UserProvider>
  );
};
