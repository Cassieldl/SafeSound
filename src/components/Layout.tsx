import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Heart } from "lucide-react";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Sidebar */}
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-200 px-6 bg-white/80 backdrop-blur-sm shadow-sm">
            <SidebarTrigger className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200" />
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-200">
                <Heart  className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                SafeSound
              </h1>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-purple-600">A voz que cuida de quem você ama</span>
                </p>
              </div>
            </div>
          </header>

          {/* Conteúdo das páginas */}
          <main className="flex-1 p-6 bg-white">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}