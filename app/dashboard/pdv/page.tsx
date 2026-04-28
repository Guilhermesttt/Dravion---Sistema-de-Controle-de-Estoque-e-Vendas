"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  X,
  CheckCircle2,
  Scan,
  Keyboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { mockProducts, Product } from "@/lib/mockData";

interface CartItem extends Product {
  quantity: number;
}

export default function PDVPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("mercado-user-role");
    const name = localStorage.getItem("mercado-user-name");
    setUserRole(role);
    setUserName(name);

    if (searchInputRef.current) searchInputRef.current.focus();

    // Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        if (cart.length > 0) setShowPayment(true);
      }
      if (e.key === "Escape") {
        setShowPayment(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cart.length]);

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([{ ...product, quantity: 1 }, ...cart]);
    }
    setSearchTerm("");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const product = mockProducts.find(
      (p) =>
        p.barcode === searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (product) {
      addToCart(product);
    } else {
      // Mock searching feedback
    }
  };

  const finalizeSale = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowPayment(false);
      setCart([]);
      setPaymentMethod(null);
      setReceivedAmount("");
    }, 2000);
  };

  if (!mounted) return null;

  const change =
    paymentMethod === "Dinheiro" && receivedAmount
      ? parseFloat(receivedAmount.replace(",", ".")) - total
      : 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen bg-background overflow-hidden relative">
      {/* PDV Inner Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-muted/30 border-b">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Scan className="h-6 w-6 text-green-600" /> Frente de Caixa
          </h1>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">
            Operação de Venda em Tempo Real
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">
              Status do Caixa
            </p>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">
              DISPONÍVEL
            </Badge>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">
              Operador
            </p>
            <p className="text-sm font-black uppercase">{userName || "OPERADOR"}</p>
          </div>
        </div>
      </div>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Search and Items */}
        <div className="flex-1 flex flex-col p-8 space-y-8 overflow-hidden bg-muted/10">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-green-600 transition-colors" />
              <Keyboard className="h-4 w-4 text-muted-foreground/40 hidden md:block" />
            </div>
            <Input
              ref={searchInputRef}
              placeholder="Escaneie o código de barras ou digite o nome do produto..."
              className="pl-20 h-20 text-xl font-bold rounded-3xl border-none bg-card shadow-2xl shadow-green-500/5 focus-visible:ring-2 focus-visible:ring-green-500 transition-all placeholder:text-muted-foreground/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-4 bottom-4 flex items-center gap-2">
              <Badge
                variant="outline"
                className="h-full px-4 rounded-xl border-2 font-black text-xs hidden lg:flex"
              >
                ENTER PARA ADICIONAR
              </Badge>
              <Button
                type="submit"
                className="h-full rounded-2xl bg-green-600 hover:bg-green-700 text-white px-8 font-black shadow-lg shadow-green-600/20 transition-all active:scale-95"
              >
                VENDER
              </Button>
            </div>
          </form>

          {/* Items Table */}
          <Card className="flex-1 overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-card flex flex-col">
            <CardHeader className="p-8 pb-4 border-b flex flex-row items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black">
                    Cupom Atual
                  </CardTitle>
                  <p className="text-xs font-bold text-muted-foreground uppercase">
                    {cart.length} produtos registrados
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-red-500 font-bold hover:bg-red-50 rounded-xl"
                onClick={() => setCart([])}
                disabled={cart.length === 0}
              >
                Limpar Cupom
              </Button>
            </CardHeader>
            <CardContent className="p-0 overflow-auto flex-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 p-12 space-y-6">
                  <div className="size-32 rounded-[2.5rem] bg-muted/30 flex items-center justify-center">
                    <Scan className="h-16 w-16 opacity-20" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-foreground/40 uppercase tracking-tighter">
                      Aguardando Produtos
                    </p>
                    <p className="text-sm font-bold opacity-60">
                      Passe o scanner ou pesquise acima
                    </p>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-muted/30 sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent border-0 h-14">
                      <TableHead className="w-[80px] pl-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground/60">
                        Ítem
                      </TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground/60">
                        Descrição
                      </TableHead>
                      <TableHead className="text-center font-black uppercase text-[10px] tracking-widest text-muted-foreground/60">
                        Quantidade
                      </TableHead>
                      <TableHead className="text-right font-black uppercase text-[10px] tracking-widest text-muted-foreground/60">
                        P. Unitário
                      </TableHead>
                      <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground/60">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="group hover:bg-muted/30 transition-colors border-b last:border-0"
                      >
                        <TableCell className="pl-8 py-6 font-black text-muted-foreground/40 text-sm">
                          {String(cart.length - index).padStart(3, "0")}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-black text-lg text-foreground leading-tight">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase">
                              SKU: {item.barcode}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8 rounded-xl hover:bg-red-50 hover:text-red-500 border-2 transition-all active:scale-90"
                              onClick={() =>
                                item.quantity === 1
                                  ? removeFromCart(item.id)
                                  : updateQuantity(item.id, -1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center text-xl font-black">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-8 rounded-xl hover:bg-green-50 hover:text-green-600 border-2 transition-all active:scale-90"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-muted-foreground">
                          R$ {item.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right pr-8 font-black text-xl text-green-600 dark:text-green-400">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Resumo and Checkout */}
        <aside className="w-[400px] flex flex-col bg-muted/30 p-8 space-y-8 shrink-0">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card flex flex-col h-full">
            <CardHeader className="bg-gradient-to-br from-green-600 to-green-800 text-white p-10 shrink-0">
              <CardTitle className="text-xs font-black opacity-60 uppercase tracking-[0.3em]">
                Subtotal da Operação
              </CardTitle>
              <div className="text-6xl font-black mt-2 tracking-tighter">
                <span className="text-2xl font-bold opacity-60 mr-2">R$</span>
                {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8 flex-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">
                    Qtde de Itens
                  </span>
                  <span className="bg-muted px-4 py-1 rounded-full">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)} un
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">
                    Descontos
                  </span>
                  <span className="text-red-500">- R$ 0,00</span>
                </div>
              </div>

              <Separator className="opacity-50" />

              <div className="space-y-3 opacity-60">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Atalhos do Sistema
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-muted/50 rounded-2xl flex flex-col">
                    <span className="text-[10px] font-black uppercase opacity-60">
                      Finalizar
                    </span>
                    <span className="text-sm font-black">F2</span>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-2xl flex flex-col">
                    <span className="text-[10px] font-black uppercase opacity-60">
                      Cancelar
                    </span>
                    <span className="text-sm font-black">ESC</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0 shrink-0">
              <Button
                className="w-full h-24 text-2sm font-black rounded-3xl bg-green-600 hover:bg-green-700 text-white shadow-2xl shadow-green-600/30 active:scale-95 transition-all group"
                disabled={cart.length === 0}
                onClick={() => setShowPayment(true)}
              >
                FINALIZAR COMPRA
                <ArrowLeft className="ml-3 h-6 w-6 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </main>

      {/* Payment Overlay */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-background w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="flex items-center justify-between p-10 border-b">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">
                    Pagamento
                  </h2>
                  <p className="text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest">
                    Selecione o método de recebimento
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl size-14 hover:bg-muted"
                  onClick={() => setShowPayment(false)}
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>

              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <h3 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] border-l-4 border-green-600 pl-4">
                    Formas Disponíveis
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        id: "Dinheiro",
                        icon: Banknote,
                        label: "EM DINHEIRO",
                        color: "text-emerald-500",
                      },
                      {
                        id: "Cartão",
                        icon: CreditCard,
                        label: "CARTÕES",
                        color: "text-blue-500",
                      },
                      {
                        id: "PIX",
                        icon: QrCode,
                        label: "PAGAR VIA PIX",
                        color: "text-purple-500",
                      },
                      {
                        id: "Ticket",
                        icon: Plus,
                        label: "TICKETS/OUTROS",
                        color: "text-gray-500",
                      },
                    ].map((method) => (
                      <Button
                        key={method.id}
                        variant={
                          paymentMethod === method.id ? "default" : "outline"
                        }
                        className={`h-32 flex flex-col gap-3 rounded-[2rem] border-4 transition-all duration-300 ${paymentMethod === method.id
                            ? "border-green-600 bg-green-500 text-white shadow-xl shadow-green-600/40"
                            : "bg-card hover:border-green-600/40 hover:bg-muted/50 border-transparent shadow-sm"
                          }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <method.icon
                          className={`h-10 w-10 ${paymentMethod === method.id ? "text-white" : method.color}`}
                        />
                        <span className="font-black text-xs tracking-tight">
                          {method.label}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 md:border-l md:pl-10">
                  <h3 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] border-l-4 border-green-600 pl-4">
                    Confirmação de Valores
                  </h3>
                  <div className="space-y-6">
                    <div className="flex flex-col p-8 bg-muted/40 rounded-[2rem] border-2 border-transparent">
                      <span className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em] mb-2">
                        Total Líquido
                      </span>
                      <span className="text-5xl font-black text-foreground tracking-tighter">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>

                    {paymentMethod === "Dinheiro" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-4">
                            Valor Recebido (Cedido)
                          </label>
                          <Input
                            autoFocus
                            placeholder="R$ 0,00"
                            className="h-20 text-3xl font-black rounded-[2rem] border-4 focus-visible:ring-green-600 px-8"
                            value={receivedAmount}
                            onChange={(e) => setReceivedAmount(e.target.value)}
                          />
                        </div>
                        <div
                          className={`flex flex-col p-8 rounded-[2rem] transition-all border-4 ${change >= 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}
                        >
                          <span className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-60">
                            Cálculo de Troco
                          </span>
                          <span
                            className={`text-4xl font-black tracking-tighter ${change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            R$ {change.toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod && paymentMethod !== "Dinheiro" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 bg-green-500/10 rounded-[2rem] border-4 border-green-500/20 text-center"
                      >
                        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <p className="font-black text-green-700 uppercase tracking-widest leading-tight">
                          Pronto para processar {paymentMethod}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-10 bg-muted/30 flex gap-6 mt-auto">
                <Button
                  variant="ghost"
                  className="flex-1 h-20 rounded-2xl font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-colors"
                  onClick={() => setShowPayment(false)}
                >
                  CANCELAR
                </Button>
                <Button
                  className="flex-[2] h-20 rounded-[2rem] font-black text-xl uppercase tracking-widest bg-green-600 hover:bg-green-700 text-white shadow-2xl shadow-green-600/30 active:scale-95 transition-all"
                  disabled={
                    !paymentMethod ||
                    (paymentMethod === "Dinheiro" &&
                      (receivedAmount === "" || change < 0))
                  }
                  onClick={finalizeSale}
                >
                  CONFIRMAR E IMPRIMIR
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white dark:bg-card p-16 rounded-[4rem] shadow-2xl flex flex-col items-center text-center space-y-8 border shadow-green-500/10"
            >
              <div className="size-32 rounded-[2.5rem] bg-green-500 text-white flex items-center justify-center shadow-2xl shadow-green-500/50">
                <CheckCircle2 className="h-20 w-20" />
              </div>
              <div className="space-y-2">
                <h2 className="text-5xl font-black tracking-tighter">
                  Venda de Sucesso!
                </h2>
                <p className="text-muted-foreground font-bold text-lg uppercase tracking-widest opacity-60">
                  Sincronizando com o Estoque...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
