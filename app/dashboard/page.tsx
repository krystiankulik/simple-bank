"use client";
import { Suspense } from "react";
import Dashboard from "@/app/dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
