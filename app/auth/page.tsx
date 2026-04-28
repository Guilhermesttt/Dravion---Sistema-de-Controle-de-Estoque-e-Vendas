"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent, role: "admin" | "staff") => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("mercado-user-role", role);
    localStorage.setItem(
      "mercado-user-name",
      role === "admin" ? "Administrador" : "Funcionário",
    );

    router.push("/dashboard");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Header */}
      <header className="w-full py-6">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-green-600 flex items-center justify-center text-white">
              <ShoppingCart className="size-4" />
            </div>
            <span>Mercadinho Gestão</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 relative">
        <div className="w-full max-w-md">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Header */}
            <motion.div variants={item} className="text-center space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-green-600">
                Bem-vindo
              </h1>
              <p className="text-muted-foreground">
                Entre com suas credenciais para acessar o sistema
              </p>
            </motion.div>

            {/* Auth Tabs */}
            <motion.div variants={item}>
              <Tabs defaultValue="staff" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-xl h-12 p-1 bg-muted/50 border border-border/50">
                  <TabsTrigger
                    value="staff"
                    className="rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Funcionário
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Administrador
                  </TabsTrigger>
                </TabsList>

                {/* Staff Login */}
                <TabsContent value="staff" className="mt-4">
                  <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <User className="size-5 text-green-600" />
                        Login Funcionário
                      </CardTitle>
                      <CardDescription>Acesso ao PDV e Vendas</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <form
                        className="space-y-4"
                        onSubmit={(e) => handleLogin(e, "staff")}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="staff-user">Usuário</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="staff-user"
                              placeholder="nome.usuario"
                              className="pl-10 h-12 rounded-xl"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="staff-pass">Senha</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="staff-pass"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 h-12 rounded-xl"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-14 text-lg font-bold rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
                          disabled={isLoading}
                        >
                          {isLoading ? "Entrando..." : "Entrar no Sistema"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Admin Login */}
                <TabsContent value="admin" className="mt-4">
                  <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="size-5 text-green-600" />
                        Login Administrador
                      </CardTitle>
                      <CardDescription>
                        Acesso completo à gestão
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <form
                        className="space-y-4"
                        onSubmit={(e) => handleLogin(e, "admin")}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="admin-email">Email Admin</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="admin-email"
                              type="email"
                              placeholder="admin@mercado.com"
                              className="pl-10 h-12 rounded-xl"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-pass">Senha</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="admin-pass"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 h-12 rounded-xl"
                              required
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-14 text-lg font-bold rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
                          disabled={isLoading}
                        >
                          {isLoading ? "Autenticando..." : "Entrar como Admin"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-xs text-muted-foreground border-t bg-background/50 backdrop-blur-sm">
        <p>Sistema de Gestão de Mercado &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
