"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  History, 
  Menu,
  X,
  Wifi
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Pelanggan', href: '/customers', icon: Users },
    { name: 'Tagihan', href: '/billing', icon: Receipt },
    { name: 'Riwayat', href: '/history', icon: History },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4">
      <div className="flex items-center gap-3 px-2 py-6 mb-6 border-b border-slate-800">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Wifi size={24} />
        </div>
        <h1 className="font-bold text-lg leading-tight">
          Billing Salam<br />
          <span className="text-blue-400 text-sm">Indah Network</span>
        </h1>
      </div>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-white" : "group-hover:text-white")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <p className="text-xs text-slate-400">Administrator</p>
        <p className="text-sm font-semibold">Admin Salam Indah</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Wifi className="text-blue-400" size={20} />
          <span className="font-bold text-sm">Salam Indah Network</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-slate-900 border-none">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;