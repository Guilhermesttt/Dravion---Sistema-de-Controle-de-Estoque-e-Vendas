"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Tag,
  Package,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { id: "1", name: "Alimentos", itemsCount: 120, trend: "+12%" },
    { id: "2", name: "Bebidas", itemsCount: 45, trend: "+5%" },
    { id: "3", name: "Limpeza", itemsCount: 32, trend: "-2%" },
    { id: "4", name: "Higiene", itemsCount: 28, trend: "0%" },
    { id: "5", name: "Padaria", itemsCount: 15, trend: "+25%" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("mercado-user-role");
    setUserRole(role);
  }, []);

  if (!mounted) return null;

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Categorias</h1>
          <p className="text-muted-foreground mt-2">
            Organize seus produtos em grupos estratégicos.
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 px-8 font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                <Plus className="mr-2 h-6 w-6" /> Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] p-8 border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">
                  Criar Categoria
                </DialogTitle>
                <DialogDescription className="font-medium">
                  Defina um nome claro para o grupo de produtos.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <Label className="font-bold ml-1">Nome da Categoria</Label>
                <Input
                  className="h-12 rounded-xl mt-2 border-2 focus-visible:ring-green-500"
                  placeholder="Ex: Congelados"
                />
              </div>
              <DialogFooter>
                <Button variant="ghost" className="rounded-xl h-12 font-bold">
                  Cancelar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-bold flex-1">
                  Salvar Categoria
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
            <CardHeader className="p-8 pb-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-green-600 transition-colors" />
                <Input
                  placeholder="Buscar categorias..."
                  className="pl-12 h-12 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-green-500 text-base shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-0 h-14">
                    <TableHead className="pl-8 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                      Nome do Grupo
                    </TableHead>
                    <TableHead className="text-center font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                      Produtos
                    </TableHead>
                    <TableHead className="text-center font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                      Crescimento
                    </TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((cat) => (
                    <TableRow
                      key={cat.id}
                      className="group hover:bg-muted/10 transition-colors border-b last:border-0 h-16"
                    >
                      <TableCell className="pl-8 font-bold text-lg leading-tight group-hover:text-green-600 transition-colors">
                        {cat.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className="rounded-full px-4 py-1 font-bold text-xs"
                        >
                          {cat.itemsCount} itens
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-black text-sm ${cat.trend.startsWith("+") ? "text-green-600" : cat.trend.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}
                        >
                          {cat.trend}
                        </span>
                      </TableCell>
                      <TableCell className="pr-8">
                        {userRole === "admin" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-[1.5rem] p-3 min-w-[180px] shadow-2xl border-none"
                            >
                              <DropdownMenuItem className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold">
                                <Edit2 className="h-4 w-4 text-blue-500" /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold text-red-600">
                                <Trash2 className="h-4 w-4" /> Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-green-600 text-white p-8">
            <Tag className="h-12 w-12 opacity-40 mb-4" />
            <h3 className="text-2xl font-black leading-tight">
              Dica de Organização
            </h3>
            <p className="text-green-50 text-sm mt-2 font-medium opacity-90">
              Categorias bem definidas ajudam na hora de gerar relatórios de
              faturamento por setor.
            </p>
            {userRole === "admin" && (
              <Button className="w-full mt-6 bg-white text-green-600 hover:bg-green-50 rounded-xl font-bold h-12">
                Ver Relatórios
              </Button>
            )}
          </Card>

          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden p-8 space-y-4">
            <h3 className="text-lg font-black">Stats Globais</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl">
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  Total Ativos
                </span>
                <span className="text-xl font-black">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl">
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  Média p/ Grupo
                </span>
                <span className="text-xl font-black">~42</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
