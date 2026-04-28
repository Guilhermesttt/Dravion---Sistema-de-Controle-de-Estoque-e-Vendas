"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  User,
  Shield,
  Bell,
  Smartphone,
  Palette,
  Cloud,
  Check,
  Save,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("mercado-user-role");
    setUserRole(role);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Personalize sua experiência e ajuste o sistema.
        </p>
      </div>

      <Tabs defaultValue={userRole === "admin" ? "general" : "profile"} className="space-y-8">
        <TabsList className="bg-muted/50 p-2 rounded-2xl h-16 w-full max-w-2xl gap-2">
          {userRole === "admin" && (
            <TabsTrigger
              value="general"
              className="flex-1 rounded-xl font-bold h-full data-[state=active]:bg-card data-[state=active]:shadow-lg transition-all"
            >
              <Settings className="size-4 mr-2" /> Geral
            </TabsTrigger>
          )}
          <TabsTrigger
            value="profile"
            className="flex-1 rounded-xl font-bold h-full data-[state=active]:bg-card data-[state=active]:shadow-lg transition-all"
          >
            <User className="size-4 mr-2" /> Perfil
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex-1 rounded-xl font-bold h-full data-[state=active]:bg-card data-[state=active]:shadow-lg transition-all"
          >
            <Palette className="size-4 mr-2" /> Visual
          </TabsTrigger>
          {userRole === "admin" && (
            <TabsTrigger
              value="security"
              className="flex-1 rounded-xl font-bold h-full data-[state=active]:bg-card data-[state=active]:shadow-lg transition-all"
            >
              <Shield className="size-4 mr-2" /> Segurança
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="p-10 border-b bg-muted/20">
              <CardTitle className="text-2xl font-black">
                Identidade do Negócio
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Informações básicas que aparecem nos comprovantes.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="font-bold ml-1">Nome Fantasia</Label>
                  <Input
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-medium text-lg"
                    defaultValue="Mercadinho Gestão Pro"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold ml-1">CNPJ (Opcional)</Label>
                  <Input
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-medium text-lg"
                    placeholder="00.000.000/0001-00"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold ml-1">Telefone de Contato</Label>
                  <Input
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-medium text-lg"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-bold ml-1">Endereço Completo</Label>
                  <Input
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-medium text-lg"
                    placeholder="Rua das Flores, 123"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="ghost"
                  className="rounded-xl font-bold px-6 border-2 border-transparent hover:bg-muted"
                >
                  Descartar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold px-10 h-14 shadow-lg shadow-green-600/20 active:scale-95 transition-all">
                  <Save className="mr-2 size-5" /> Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-10 flex items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="size-16 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
                  <Cloud className="size-8" />
                </div>
                <div>
                  <h4 className="font-black text-xl">Backup Automático</h4>
                  <p className="text-muted-foreground font-medium text-sm">
                    Seus dados são sincronizados no servidor a cada 5 minutos.
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="p-10 border-b bg-muted/20">
              <CardTitle className="text-2xl font-black">
                Personalização Visual
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Ajuste o modo de cor e acessibilidade.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <Label className="font-black text-sm uppercase tracking-widest text-muted-foreground">
                    Tema do Sistema
                  </Label>
                  <div className="flex gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className={`flex-1 h-32 rounded-3xl flex flex-col gap-3 transition-all ${theme === "light" ? "bg-green-600 text-white shadow-xl shadow-green-600/30" : "hover:border-green-600/40 bg-card border-none shadow-sm"}`}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="size-8" />
                      <span className="font-black text-xs">MODO CLARO</span>
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className={`flex-1 h-32 rounded-3xl flex flex-col gap-3 transition-all ${theme === "dark" ? "bg-green-600 text-white shadow-xl shadow-green-600/30" : "hover:border-green-600/40 bg-card border-none shadow-sm"}`}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="size-8" />
                      <span className="font-black text-xs">MODO ESCURO</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <Label className="font-black text-sm uppercase tracking-widest text-muted-foreground">
                    Acessibilidade
                  </Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-muted/20 p-5 rounded-2xl">
                      <span className="font-bold text-sm">
                        Fonte em Negrito
                      </span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between bg-muted/20 p-5 rounded-2xl">
                      <span className="font-bold text-sm">Auto-contraste</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
