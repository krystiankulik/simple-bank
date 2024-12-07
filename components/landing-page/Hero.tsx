import { UserAction } from "@/components/landing-page/UserAction";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="bg-base-100 py-12">
      <div className="max-w-full mx-auto px-4 py-20 gap-12 flex flex-col items-center justify-center md:max-w-6xl md:flex-row">
        <div className="flex flex-col items-center justify-center text-center md:text-left md:items-start md:justify-start md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Banking Made Simple</h1>
          <p className="mb-6">Experience hassle-free banking with Simple Bank. Manage your finances with ease.</p>
          <UserAction />
        </div>
        <div className="md:w-1/2">
          <Image src="/hero.svg" alt="Banking Hero" width={600} height={600} className="mx-auto" />
        </div>
      </div>
    </section>
  );
};
