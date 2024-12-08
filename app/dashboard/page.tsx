"use client";
import { Suspense } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
