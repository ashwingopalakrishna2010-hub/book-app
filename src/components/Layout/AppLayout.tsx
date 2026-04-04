import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import TopAppBar from "./TopAppBar";

export default function AppLayout() {
  return (
    <div className="min-h-[100dvh] flex bg-bg-base font-body text-text-primary aurora-bg">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-[100dvh] relative max-w-md mx-auto lg:max-w-none lg:mx-0 lg:ml-72 w-full z-10">
        {/* Mobile Top App Bar */}
        <TopAppBar />

        {/* Content Wrapper */}
        <main className="flex-1 pt-24 pb-32 px-5 lg:pt-10 lg:pb-10 lg:px-8 overflow-x-hidden">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
