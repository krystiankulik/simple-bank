import Image from "next/image";

const DepositFeature = () => (
  <div className="flex flex-col md:flex-row items-center mb-12">
    <div className="md:w-1/2 mb-6 md:mb-0">
      <h3 className="text-2xl font-semibold mb-2">Deposit</h3>
      <p>
        Effortlessly add funds to your account. Don’t have real money? No problem—just enter the amount you want and
        watch your balance grow. It is as simple as imagining your wealth!
      </p>
    </div>
    <div className="md:w-1/2">
      <Image src="/deposit.svg" alt="Banking Hero" width={300} height={300} className="mx-auto" />
    </div>
  </div>
);

const WithdrawFeature = () => (
  <div className="flex flex-col md:flex-row-reverse items-center mb-12">
    <div className="md:w-1/2 mb-6 md:mb-0">
      <h3 className="text-2xl font-semibold mb-2">Withdraw</h3>
      <p>
        Take out money whenever you need it, with no limits or restrictions. Your funds are always at your disposal,
        ready when you are.
      </p>
    </div>
    <div className="md:w-1/2">
      <Image src="/withdraw.svg" alt="Banking Hero" width={300} height={300} className="mx-auto" />
    </div>
  </div>
);

const TransferFeature = () => (
  <div className="flex flex-col md:flex-row items-center">
    <div className="md:w-1/2 mb-6 md:mb-0">
      <h3 className="text-2xl font-semibold mb-2">Transfer</h3>
      <p>
        Send money instantly to anyone, anywhere. No delays, no waiting—your transfers happen in real-time for maximum
        convenience.
      </p>
    </div>
    <div className="md:w-1/2">
      <Image src="/transfer.svg" alt="Banking Hero" width={300} height={300} className="mx-auto" />
    </div>
  </div>
);

export const Features = () => {
  return (
    <section className="bg-gray-600 py-12">
      <div className="max-w-full mx-auto px-4 md:max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <DepositFeature />
        <WithdrawFeature />
        <TransferFeature />
      </div>
    </section>
  );
};
