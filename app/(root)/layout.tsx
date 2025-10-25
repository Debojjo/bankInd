import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import * as Sentry from '@sentry/nextjs';
import type { Metadata } from 'next';

// Generate metadata at the module level
export function generateMetadata(): Metadata {
  return {
    // ... your existing metadata
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect('/sign-in');

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex w-full h-full flex-col">
        <div className="root-layout flex items-center justify-between p-4">
          <Image
            src="/icons/logo.svg"
            width={40}
            height={40}
            alt="mobile menu icon"
          />
          <MobileNav user={loggedIn} />
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
