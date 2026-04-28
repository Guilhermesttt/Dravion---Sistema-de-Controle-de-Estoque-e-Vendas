"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  PieChart,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("mercado-user-role");
    const name = localStorage.getItem("mercado-user-name");
    setUserRole(role);
    setUserName(name);

    if (!role) {
      router.push("/auth");
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("mercado-user-role");
    localStorage.removeItem("mercado-user-name");
    router.push("/auth");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "staff"],
    },
    {
      name: "PDV (Vendas)",
      href: "/dashboard/pdv",
      icon: ShoppingCart,
      roles: ["admin", "staff"],
    },
    {
      name: "Produtos",
      href: "/dashboard/products",
      icon: Package,
      roles: ["admin", "staff"],
    },
    {
      name: "Categorias",
      href: "/dashboard/categories",
      icon: Tag,
      roles: ["admin", "staff"],
    },
    {
      name: "Relatórios",
      href: "/dashboard/reports",
      icon: PieChart,
      roles: ["admin"],
    },
    {
      name: "Usuários",
      href: "/dashboard/users",
      icon: Users,
      roles: ["admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole || ""),
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur md:hidden">
        <div className="container flex h-16 items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-lg bg-green-600 flex items-center justify-center text-white">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <span className="text-sm">Mercadinho</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
        >
          <div className="flex flex-col h-full">
            {/* Logo Part */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-black text-xl tracking-tight leading-none text-green-600">
                    Mercadinho
                  </h2>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] mt-1">
                    Gestão Pro
                  </p>
                </div>
              </div>

              {/* User Profile Summary */}
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                  <UserCircle className="h-6 w-6" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">
                    {userName || "Usuário"}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[9px] uppercase h-4 px-1 border-green-200 text-green-600 bg-green-50 dark:bg-green-900/20"
                  >
                    {userRole === "admin" ? "Administrador" : "Funcionário"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start h-12 px-4 rounded-xl transition-all group ${
                        isActive
                          ? "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/10"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${isActive ? "text-white" : "group-hover:text-green-600"}`}
                      />
                      <span className="font-bold">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t space-y-2">
              <Link href="/dashboard/settings">
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-12 px-4 rounded-xl ${pathname === "/dashboard/settings" ? "bg-muted" : ""}`}
                >
                  <Settings className="mr-3 h-5 w-5 text-muted-foreground" />
                  <span className="font-bold text-sm">Configurações</span>
                </Button>
              </Link>

              <div className="h-px bg-border my-2" />

              <div className="flex items-center justify-between px-2 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-xl"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl font-bold"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto bg-muted/10">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
