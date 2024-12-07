import { CardChip } from "@/components/dashboard/CardChip";

interface UserFinancialInfoProps {
  username: string | null;
  iban: string | null;
  balance: number | null;
}

export default function UserInfo({ username, iban, balance }: UserFinancialInfoProps) {
  const formattedBalance = balance ? Number(balance).toFixed(2) : "N/A";

  return (
    <div className="w-full bg-base-100 text-white p-6">
      <div className="max-w-md bg-neutral mx-auto p-6 rounded-xl">
        <div className="flex flex-col items-start md:items-end">
          <span className="text-4xl font-bold">€{formattedBalance}</span>
        </div>
        <CardChip />
        <h2 className="text-2xl font-bold my-4">{username}</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-col">
            <span className="text-sm uppercase opacity-75">IBAN</span>
            <span className="text-lg font-medium">{iban}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
