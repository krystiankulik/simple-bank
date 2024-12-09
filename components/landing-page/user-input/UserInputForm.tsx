"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { UserProvider, useUser } from "@/context/UserContext";

export const UserInputForm = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setUsername } = useUser();
  const router = useRouter();

  const isInputValid = /^[a-zA-Z0-9]+$/.test(inputValue);
  const handleSubmit = async () => {
    if (!isInputValid) {
      console.log("marek");
      toast.error("Username must consist of letters and numbers only, with no spaces.");
      return;
    }

    const sanitizedInput = inputValue.toLowerCase();
    setUsername(sanitizedInput);
    router.push(`/dashboard`);
  };

  return (
    <UserProvider>
      <div className="flex flex-col gap-4 items-stretch justify-center md:justify-start md:flex-row">
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={"input input-bordered w-44 max-w-xs text-white"}
          />
        </div>
        <button className="btn w-44 btn-primary" onClick={handleSubmit}>
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </UserProvider>
  );
};
