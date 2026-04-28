"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  ShieldCheck,
  User,
  Mail,
  ShieldAlert,
  Key,
  Trash2,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Guilherme Admin",
      email: "admin@mercado.com",
      role: "admin",
      status: "Ativo",
    },
    {
      id: "2",
      name: "João Silva",
      email: "joao@mercado.com",
      role: "staff",
      status: "Ativo",
    },
    {
      id: "3",
      name: "Maria Santos",
      email: "maria@mercado.com",
      role: "staff",
      status: "Inativo",
    },
  ]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Equipe e Usuários
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Controle os níveis de acesso dos seus colaboradores.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 px-8 font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all">
          <Plus className="mr-2 h-6 w-6" /> Novo Usuário
        </Button>
      </div>

      <div className="grid gap-8">
        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
          <CardHeader className="p-8 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-green-600 transition-colors" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  className="pl-12 h-12 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-green-500 text-base shadow-inner"
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="size-10 rounded-full border-4 border-background bg-muted flex items-center justify-center font-bold text-xs ring-2 ring-green-600/20"
                    >
                      {u.name[0]}
                    </div>
                  ))}
                  <div className="size-10 rounded-full border-4 border-background bg-green-600 text-white flex items-center justify-center font-bold text-xs">
                    +
                  </div>
                </div>
                <span className="font-bold text-sm text-muted-foreground">
                  {users.length} Colaboradores
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-0 h-14">
                  <TableHead className="pl-8 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Usuário
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Cargo / Permissão
                  </TableHead>
                  <TableHead className="text-center font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Status
                  </TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-muted/10 transition-colors border-b last:border-0 h-24"
                  >
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center text-green-600 font-black">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-lg leading-tight">
                            {user.name}
                          </span>
                          <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                            <Mail className="size-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.role === "admin" ? (
                          <Badge className="bg-green-600 text-white border-none rounded-xl font-black text-[10px] px-3 py-1 gap-1.5 uppercase">
                            <ShieldCheck className="size-3" /> Administrador
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-700 border-none rounded-xl font-black text-[10px] px-3 py-1 gap-1.5 uppercase tracking-tighter">
                            <User className="size-3" /> Colaborador (Staff)
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`rounded-full px-4 py-1.5 border-none font-bold text-[10px] uppercase ${user.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-8">
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
                          <DropdownMenuLabel className="font-black text-[10px] uppercase text-muted-foreground ml-1">
                            Gerenciar Acesso
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold">
                            <Edit2 className="size-4 text-blue-500" /> Editar
                            Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold">
                            <Key className="size-4 text-amber-500" /> Resetar
                            Senha
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold text-red-600 hover:bg-red-50">
                            <Trash2 className="size-4" /> Remover Acesso
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-none shadow-xl rounded-[2.5rem] p-8 flex items-center gap-6 bg-amber-500/5">
            <div className="size-16 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center text-amber-600">
              <ShieldAlert className="size-8" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-lg leading-tight text-amber-800">
                Segurança de Dados
              </h4>
              <p className="text-sm font-medium text-amber-600 mt-1 opacity-80">
                Nunca compartilhe senhas entre colaboradores. Cada um deve ter
                seu próprio login para auditoria.
              </p>
            </div>
          </Card>
          <Card className="border-none shadow-xl rounded-[2.5rem] p-8 flex items-center gap-6 bg-blue-500/5">
            <div className="size-16 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Key className="size-8" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-lg leading-tight text-blue-800">
                Recuperação
              </h4>
              <p className="text-sm font-medium text-blue-600 mt-1 opacity-80">
                O administrador pode resetar senhas esquecidas a qualquer
                momento no menu de ações.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
