import { CardChip } from "@/components/dashboard/user-info/CardChip";

interface UserFinancialInfoProps {
  username: string | null;
  iban: string | null;
  balance: number | null;
}

export default function UserInfo({ username, iban, balance }: UserFinancialInfoProps) {
  const formattedBalance = balance ? Number(balance).toFixed(2) : "N/A";

  const renderContent = () => {
    if (iban && balance) {
      return (
        <>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold md:text-3xl">€{formattedBalance}</span>
          </div>
          <CardChip />
          <h2 className="text-xl font-bold my-4 md:text-2xl">{username}</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col">
              <span className="text-xs uppercase opacity-75 md:text-sm">IBAN</span>
              <span className="text-sm font-medium md:text-lg">{iban}</span>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-base-100 text-white p-6">
      <div className="max-w-md w-80 h-48 bg-neutral mx-auto p-6 rounded-xl md:w-96 md:h-56">{renderContent()}</div>
    </div>
  );
}
