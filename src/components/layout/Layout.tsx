import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";
import { ActiveCategoryContext } from "@/hooks/useActiveCategory";

export function Layout() {
  useSearchShortcut();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  return (
    <ActiveCategoryContext.Provider
      value={{ categoryId: activeCategoryId, setCategoryId: setActiveCategoryId }}
    >
      <div className="flex h-screen overflow-hidden bg-white">
        <Sidebar activeCategoryId={activeCategoryId} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-8 pt-12 pb-16">
            <Outlet />
          </div>
        </main>
      </div>
    </ActiveCategoryContext.Provider>
  );
}
