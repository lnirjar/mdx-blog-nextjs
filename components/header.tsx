import Link from "next/link";

import { ModeToggle } from "@/components/theme-toggle";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="px-4 sm:px-8 lg:px-16 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="font-semibold text-xl text-gray-800 dark:text-gray-200"
        >
          Blog Name
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
};
