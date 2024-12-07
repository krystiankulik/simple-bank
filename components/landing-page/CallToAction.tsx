import { UserAction } from "@/components/landing-page/UserAction";

export const CallToAction = () => {
  return (
    <section className="bg-gray-200 text-primary-content py-12">
      <div className="flex flex-col items-center text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Ready to simplify your banking?</h2>
        <p className="mb-6">Join Simple Bank today and take control of your financial future.</p>
        <UserAction />
      </div>
    </section>
  );
};
