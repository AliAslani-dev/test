import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
}

export default function Layout({ children }: MainProps) {
  return (
    <SidebarProvider>
      <div
        className="flex h-screen w-full bg-gray-50"
        style={{ fontFamily: "Vazir, sans-serif" }}
      >
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children || <Outlet />}
        </main>
      </div>
    </SidebarProvider>
  );
}
