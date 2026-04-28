"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import RotatingText from "./components/RotatingText";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  DollarSign,
  TrendingUp,
  FileText,
  Calculator,
  Package,
  Clock,
  Target,
  Award,
  Smartphone,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const body = document.body;
    body.style.transition = "all 0.5s ease-in-out";

    setTheme(theme === "dark" ? "light" : "dark");

    setTimeout(() => {
      body.style.transition = "";
    }, 500);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = isScrolled ? 64 : 0;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
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

  const features = [
    {
      title: "Ponto de Venda (PDV) Rápido",
      description:
        "Realize vendas em segundos com nossa interface otimizada para teclados e leitores de código de barras.",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      title: "Controle de Estoque Preciso",
      description:
        "Monitore cada item da sua prateleira. Alertas automáticos de estoque baixo para você nunca deixar faltar nada.",
      icon: <Package className="size-5" />,
    },
    {
      title: "Gestão de Caderninho",
      description:
        "Controle as vendas fiado com facilidade. Saiba exatamente quem deve e quanto deve, com histórico completo por cliente.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Relatórios de Lucratividade",
      description:
        "Gráficos claros que mostram seus produtos mais vendidos e sua margem de lucro real por categoria.",
      icon: <TrendingUp className="size-5" />,
    },
    {
      title: "Gestão de Fornecedores",
      description:
        "Organize suas compras e pedidos. Tenha os dados de todos os seus distribuidores sempre à mão.",
      icon: <FileText className="size-5" />,
    },
    {
      title: "Escaneamento de Preços",
      description:
        "Consulte preços e estoque instantaneamente escaneando o código de barras pelo celular ou leitor.",
      icon: <Smartphone className="size-5" />,
    },
  ];

  return (
    <motion.div
      className="flex min-h-[100dvh] flex-col transition-all duration-500 ease-in-out"
      key={theme}
      initial={{ opacity: 0.8, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 border-b border-border/10 ${isScrolled ? "bg-background/90 shadow-lg backdrop-saturate-150" : "bg-background/50"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 font-bold">
            <div className="relative size-9 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg">
              <span className="text-sm font-black">D</span>
              <div className="absolute inset-0 rounded-xl bg-green-400/20 to-transparent"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-none">Dravion</span>
              <span className="text-[10px] text-muted-foreground font-normal leading-none">
                Gestão Pro para Mercados
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8 ml-24">
            {[
              { href: "#funcionalidades", label: "Funcionalidades" },
              { href: "#faq", label: "Dúvidas" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
                onClick={(e) => handleSmoothScroll(e, item.href.slice(1))}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-3 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-muted/50"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -180, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="size-[18px]" />
                  ) : (
                    <Moon className="size-[18px]" />
                  )
                ) : (
                  <Moon className="size-[18px]" />
                )}
              </motion.div>
              <span className="sr-only">Alternar tema</span>
            </Button>

            <Link href="/auth">
              <Button className="relative rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 shadow-lg transition-all duration-200 hover:shadow-xl group">
                <span className="relative z-10 font-medium">
                  Acessar Sistema
                </span>
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                <div className="absolute inset-0 rounded-full bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
                Sistema de Controle de Estoque e Vendas
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 text-center">
                Gerencie seu Mercado de{" "}
                <div className="inline-block min-w-[280px] md:min-w-[350px] lg:min-w-[420px]">
                  <RotatingText
                    texts={[
                      "Forma Profissional.",
                      "Jeito Simples.",
                      "Qualquer Lugar.",
                      "Ponta a Ponta.",
                    ]}
                    mainClassName="px-4 py-2 bg-green-600 text-white rounded-xl inline-block mx-auto whitespace-nowrap shadow-2xl mt-4"
                    staggerFrom="center"
                    initial={{ y: "150%", opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: "-150%", opacity: 0, rotateX: 90 }}
                    staggerDuration={0.03}
                    splitLevelClassName="overflow-hidden"
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 500,
                      opacity: { duration: 0.3 },
                      rotateX: { duration: 0.4 },
                    }}
                    rotationInterval={2800}
                  />
                </div>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                O sistema de gestão mais simples e completo para o seu
                mercadinho. Controle suas vendas, estoque, clientes e finanças
                em um só lugar.{" "}
                <strong>
                  Abandone o papel e profissionalize seu negócio hoje mesmo.
                </strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="rounded-full h-12 px-8 text-base bg-green-600 hover:bg-green-700 text-white"
                  >
                    Acessar Sistema
                    <ArrowRight className="ml-1 size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
                <Image
                  src="/Foto-Painel.png"
                  width={1280}
                  height={720}
                  alt="Dashboard Mercadinho Gestão"
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-green-500/30 to-blue-500/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-green-500/30 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-16 border-y border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "25k+", label: "Mercados no Brasil" },
                { number: "75%", label: "Usam cadernos" },
                { number: "5h", label: "Perdidas por semana" },
                { number: "R$ 1.200", label: "Economia mensal média" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Funcionalidades Section */}
        <section id="funcionalidades" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
                Funcionalidades
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Tudo que seu Mercado precisa em um só lugar
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Pare de perder tempo com planilhas complicadas. Nossa plataforma
                foi criada especialmente para as necessidades do seu comércio.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center text-green-600 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
                Como Funciona
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Organize seu Comércio em 3 passos simples
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Leve a gestão do seu mercadinho para o próximo nível em poucos
                minutos.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Importe seu Estoque",
                  description:
                    "Cadastre seus produtos ou importe via planilha. O processo é rápido e intuitivo.",
                },
                {
                  step: "02",
                  title: "Abra o PDV",
                  description:
                    "Comece a vender imediatamente. O sistema é otimizado para a velocidade do balcão.",
                },
                {
                  step: "03",
                  title: "Analise seu Lucro",
                  description:
                    "Acompanhe o faturamento e os lucros em tempo real através do painel administrativo.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
                Dúvidas Frequentes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Perguntas que donos de Mercado fazem
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Tire suas dúvidas sobre como o sistema vai transformar a gestão
                do seu comércio.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question:
                      "Funciona para mercearias e mercados de todos os tamanhos?",
                    answer:
                      "Sim! O sistema atende desde pequenos mercadinhos de bairro até hortifrutis e distribuidoras. As funcionalidades de PDV e estoque são perfeitas para qualquer comércio de varejo.",
                  },
                  {
                    question:
                      "O sistema funciona com meu leitor de código de barras?",
                    answer:
                      "Com certeza! O sistema é compatível com qualquer leitor de código de barras USB ou Bluetooth, além de permitir o uso da câmera do celular para consultar preços.",
                  },
                  {
                    question:
                      "Consigo imprimir o comprovante de venda para o cliente?",
                    answer:
                      "Sim! O Mercadinho Gestão Pro é compatível com impressoras térmicas comuns (80mm e 58mm) para impressão de cupons não fiscais e comprovantes de pagamento.",
                  },
                  {
                    question: "Como funciona a gestão de 'fiado' (caderninho)?",
                    answer:
                      "Você pode cadastrar seus clientes de confiança e registrar vendas diretamente na conta deles. O sistema mostra o saldo devedor e emite relatórios para facilitar a cobrança.",
                  },
                  {
                    question: "Preciso de internet para usar o sistema?",
                    answer:
                      "O sistema é baseado em nuvem para que você acesse de qualquer lugar, mas nossa interface de PDV é otimizada para ser extremamente leve e estável mesmo em conexões básicas.",
                  },
                  {
                    question:
                      "Posso ter mais de um computador usando o sistema?",
                    answer:
                      "Sim! Você pode ter o Admin aberto no escritório e o PDV aberto no balcão ao mesmo tempo, com os dados sincronizados em tempo real.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-green-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center">
                Pronto para
                <div className="inline-block min-w-[300px] md:min-w-[350px] lg:min-w-[400px]">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center">
                    <RotatingText
                      texts={[
                        "Profissionalizar seu Mercado?",
                        "Acelerar seu Ponto de Venda?",
                        "Controlar seu Estoque?",
                        "Organizar o Caderninho?",
                        "Crescer seu Comércio?",
                      ]}
                      mainClassName="px-4 py-2 bg-white text-green-600 rounded-xl inline-block mx-auto whitespace-nowrap shadow-2xl"
                      staggerFrom="center"
                      initial={{ y: "150%", opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: "-150%", opacity: 0, rotateX: 90 }}
                      staggerDuration={0.03}
                      splitLevelClassName="overflow-hidden"
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 500,
                        opacity: { duration: 0.3 },
                        rotateX: { duration: 0.4 },
                      }}
                      rotationInterval={3200}
                    />
                  </h2>
                </div>
              </h2>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-xl text-center">
                Junte-se a centenas de comerciantes que já transformaram seus
                negócios com nosso sistema.
                <strong>
                  {" "}
                  Comece hoje mesmo a profissionalizar sua gestão!
                </strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/auth">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full h-14 px-10 text-lg font-semibold bg-white text-green-600 hover:bg-gray-100"
                  >
                    Acessar Sistema Agora
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30"></div>

        <div className="container relative">
          <div className="py-16 border-b border-border/30">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Receba dicas para o seu Mercado
              </h3>
              <p className="text-muted-foreground mb-6">
                Estratégias de vendas, gestão de estoque e novidades do sistema
                direto no seu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                />
                <Button className="rounded-xl px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium">
                  Quero Receber
                </Button>
              </div>
            </div>
          </div>

          <div className="py-16">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3 font-bold">
                  <div className="relative size-10 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg">
                    <span className="font-black">M</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl leading-none">Mercadinho Pro</span>
                    <span className="text-xs text-muted-foreground font-normal leading-none">
                      Gestão Completa para Comércios
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  O sistema de gestão mais simples e completo para mercados e
                  mercearias. Organização, profissionalização e crescimento em
                  uma só plataforma.
                </p>
              </div>

              {[
                {
                  title: "Produto",
                  links: [
                    "Funcionalidades",
                    "Acessar Sistema",
                    "Suporte",
                    "Tutoriais",
                  ],
                },
                {
                  title: "Gestão",
                  links: [
                    "Dicas de Vendas",
                    "Controle de Estoque",
                    "Gestão de Fiado",
                    "Fornecedores",
                    "Financeiro",
                  ],
                },
              ].map((column, i) => (
                <div key={i} className="space-y-4">
                  <h4 className="text-sm font-bold text-foreground">
                    {column.title}
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-border/30">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                &copy; {new Date().getFullYear()} Mercadinho Gestão Pro. Todos
                os direitos reservados.
              </span>
            </div>
            <div className="flex gap-6 text-xs">
              {["Política de Privacidade", "Termos de Uso", "LGPD"].map(
                (item, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
