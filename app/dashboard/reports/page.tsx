"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

const data = [
  { name: "Seg", sales: 4000, revenue: 2400 },
  { name: "Ter", sales: 3000, revenue: 1398 },
  { name: "Qua", sales: 2000, revenue: 9800 },
  { name: "Qui", sales: 2780, revenue: 3908 },
  { name: "Sex", sales: 1890, revenue: 4800 },
  { name: "Sab", sales: 2390, revenue: 3800 },
  { name: "Dom", sales: 3490, revenue: 4300 },
];

const pieData = [
  { name: "Alimentos", value: 400 },
  { name: "Bebidas", value: 300 },
  { name: "Limpeza", value: 200 },
  { name: "Higiene", value: 100 },
];

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("mercado-user-role");
    if (role !== "admin") {
      router.push("/dashboard");
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Relatórios Econômicos
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Análise detalhada de performance e faturamento.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl font-bold h-12 border-2"
          >
            <Calendar className="mr-2 h-4 w-4" /> Últimos 30 Dias
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold h-12 px-6 shadow-lg shadow-green-500/20 active:scale-95 transition-all">
            <Download className="mr-2 h-4 w-4" /> Gerar PDF
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" /> Fluxo de
                Vendas
              </CardTitle>
              <Badge className="bg-green-100 text-green-700 border-none font-bold">
                +18% vs anterior
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "bold" }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                  itemStyle={{ fontWeight: "black" }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#16a34a"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#16a34a", strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" /> Faturamento
                Diário (R$)
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-700 border-none font-bold">
                Consistente
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "bold" }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#16a34a"
                  radius={[10, 10, 10, 10]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="flex items-center gap-2">
              <PieIcon className="h-5 w-5 text-green-600" /> Mix de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col items-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              {pieData.map((item, idx) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 bg-muted/30 p-4 rounded-2xl"
                >
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx] }}
                  />
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="ml-auto font-black text-xs opacity-60">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Info */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-green-600 text-white p-10">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">
              Total Vendas (Mês)
            </h3>
            <p className="text-6xl font-black mt-4 tracking-tighter">
              R$ 48.290,00
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="p-2 bg-white/20 rounded-full">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <span className="font-black text-lg">
                +12.4% para fechar a meta
              </span>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="border-none shadow-lg rounded-[2rem] p-8 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Ticket Médio
              </p>
              <p className="text-3xl font-black">R$ 54,20</p>
              <Badge
                variant="outline"
                className="text-[10px] border-red-200 text-red-600 font-black"
              >
                -2.1% sem. anterior
              </Badge>
            </Card>
            <Card className="border-none shadow-lg rounded-[2rem] p-8 space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Melhor Horário
              </p>
              <p className="text-3xl font-black">18:30h</p>
              <Badge
                variant="outline"
                className="text-[10px] border-green-200 text-green-600 font-black"
              >
                Horário de Pico
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
