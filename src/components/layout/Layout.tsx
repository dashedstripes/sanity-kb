import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";

export function Layout() {
  useSearchShortcut();

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-8 pt-12 pb-16">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
