import { Dashboard } from "@/components/dashboard/Dashboard";
import { UserProvider } from "@/context/UserContext";

const DashboardPage = () => {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
};

export default DashboardPage;
