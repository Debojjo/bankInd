import Image from "next/image";
import Link from "next/link";
import React from "react";

import BankCard from "./BankCard";
import Category from "./Category";
import { countTransactionCategories } from "@/lib/utils";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  // 🛡️ Defensive check to avoid rendering before data is loaded
  if (!user) return null;

  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      {/* 🧍 Profile Section */}
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />

        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName?.[0] || "U"}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user.firstName || ""} {user.lastName || ""}
            </h1>
            <p className="profile-email">{user.email || "No email available"}</p>
          </div>
        </div>
      </section>

      {/* 🏦 My Banks Section */}
      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>

        {/* 🧾 Bank Cards */}
        {banks && banks.length > 0 ? (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            {/* First Bank */}
            {banks[0] && (
              <div className="relative z-10">
                <BankCard
                  key={banks[0].id}
                  account={banks[0]}
                  userName={`${user.firstName || ""} ${user.lastName || ""}`}
                  showBalance={false}
                />
              </div>
            )}

            {/* Second Bank */}
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].id}
                  account={banks[1]}
                  userName={`${user.firstName || ""} ${user.lastName || ""}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        ) : (
          // 🪣 Fallback UI if user has no banks
          <p className="text-sm text-gray-500 mt-3">
            No banks connected yet.
          </p>
        )}

        {/* 📊 Top Categories Section */}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top Categories</h2>

          <div className="space-y-5">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Category key={category.name} category={category} />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No categories available.
              </p>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
