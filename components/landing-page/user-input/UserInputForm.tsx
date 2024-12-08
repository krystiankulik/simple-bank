"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { UserProvider, useUser } from "@/context/UserContext";

export const UserInputForm = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setUsername } = useUser();
  const router = useRouter();

  const isInputValid = inputValue.trim().length > 0;

  const handleSubmit = async () => {
    if (!isInputValid) {
      return;
    }

    setUsername(inputValue);
    router.push(`/dashboard`);
  };

  return (
    <UserProvider>
      <div className="flex flex-col gap-4 items-stretch justify-center md:justify-start md:flex-row">
        <input
          type="text"
          placeholder="Enter username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={"input input-bordered w-44 max-w-xs text-white"}
        />
        <button
          className="btn w-44 btn-primary disabled:bg-gray-500 disabled:text-gray-800"
          onClick={handleSubmit}
          disabled={!isInputValid}
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </UserProvider>
  );
};
