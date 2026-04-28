"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Package,
  Activity,
  UserPlus,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WelcomeModal from "./components/WelcomeModal";
import Link from "next/link";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const isFirstTime = localStorage.getItem("mercado-first-time") === null;
    setShowWelcomeModal(isFirstTime);
    
    const role = localStorage.getItem("mercado-user-role");
    setUserRole(role);
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcomeModal(false);
    localStorage.setItem("mercado-first-time", "false");
  };

  if (!mounted) {
    return null;
  }

  const stats = [
    {
      title: "Vendas Hoje",
      value: "24",
      change: "+5 desde manhã",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 12.450",
      change: "+12%",
      changeType: "positive",
      icon: TrendingUp,
    },
    {
      title: "Estoque Baixo",
      value: "8",
      change: "ver produtos",
      changeType: "neutral",
      icon: Package,
    },
    {
      title: "Novos Clientes",
      value: "15",
      change: "+2 hoje",
      changeType: "positive",
      icon: Users,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "venda",
      title: "Venda Realizada",
      description: "Venda #1024 - R$ 45,90 (Dinheiro)",
      time: "há 10 minutos",
      icon: DollarSign,
    },
    {
      id: 2,
      type: "estoque",
      title: "Alerta de Estoque",
      description: "Leite Integral (Fazenda) está com 5 unidades",
      time: "há 1 hora",
      icon: Package,
    },
    {
      id: 3,
      type: "cliente",
      title: "Novo Cliente",
      description: "Maria Oliveira cadastrada no sistema",
      time: "há 3 horas",
      icon: UserPlus,
    },
  ];

  const quickActions = [
    {
      title: "Abrir PDV",
      description: "Iniciar uma nova venda rápida",
      icon: DollarSign,
      color: "bg-green-500",
      href: "/dashboard/pdv",
      roles: ["admin", "staff"],
    },
    {
      title: "Gerenciar Estoque",
      description: "Adicionar ou editar produtos",
      icon: Package,
      color: "bg-amber-500",
      href: "/dashboard/products",
      roles: ["admin", "staff"],
    },
    {
      title: "Relatórios de Vendas",
      description: "Ver desempenho do mercado",
      icon: BarChart3,
      color: "bg-blue-500",
      href: "/dashboard/reports",
      roles: ["admin"],
    },
  ];

  const filteredQuickActions = quickActions.filter((action) =>
    action.roles.includes(userRole || ""),
  );

  const filteredStats = stats.filter((stat) => {
    if (stat.title === "Faturamento Mensal") {
      return userRole === "admin";
    }
    return true;
  });

  return (
    <div className="container p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Modal (Only for Admin) */}
      {showWelcomeModal && userRole === "admin" && (
        <WelcomeModal onComplete={handleWelcomeComplete} />
      )}

      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Visão Geral</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo ao painel de controle do seu mercadinho.
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          {userRole === "admin" && (
            <Button variant="outline" className="rounded-xl font-bold">
              Exportar Dados
            </Button>
          )}
          <Link href="/dashboard/pdv">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold px-6 shadow-lg shadow-green-500/20 transition-all active:scale-95">
              <Plus className="mr-2 h-5 w-5" /> Nova Venda
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-5 w-5 font-bold" />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="flex items-center mt-2 text-xs font-bold text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-none shadow-lg rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" /> Atividade
                Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-6 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="size-12 rounded-2xl bg-muted flex items-center justify-center mr-4 group-hover:bg-green-500 group-hover:text-white transition-all">
                      <activity.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base leading-tight">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {activity.description}
                      </p>
                    </div>
                    <time className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full whitespace-nowrap">
                      {activity.time}
                    </time>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 bg-muted/10 text-center">
              <Button
                variant="ghost"
                className="text-green-600 font-bold hover:bg-green-50"
              >
                Ver Todas Atividades
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg rounded-[2rem] overflow-hidden bg-green-600 text-white p-8">
            <h3 className="text-2xl font-black mb-2">Dica do Dia</h3>
            <p className="text-green-50 text-sm opacity-90 leading-relaxed">
              O estoque de Leite está acabando. Considere fazer um novo pedido
              para evitar falta nas prateleiras amanhã.
            </p>
            <Button className="mt-6 bg-white text-green-600 hover:bg-green-50 rounded-xl font-bold w-full">
              Gerenciar Pedidos
            </Button>
          </Card>

          <Card className="border-none shadow-lg rounded-[2rem] overflow-hidden">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-lg">Atalhos</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {filteredQuickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center p-4 rounded-2xl hover:bg-muted/50 transition-all border border-transparent hover:border-border group"
                >
                  <div
                    className={`size-10 rounded-xl ${action.color} text-white flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-none">
                      {action.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
