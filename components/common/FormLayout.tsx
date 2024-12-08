import React from "react";

export const FormLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center h-full items-center bg-base-100">
      <div className="bg-neutral p-8 rounded-lg shadow-md w-full max-w-md">{children}</div>
    </div>
  );
};
