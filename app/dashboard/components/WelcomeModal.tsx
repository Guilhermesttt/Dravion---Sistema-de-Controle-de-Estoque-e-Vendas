"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  Package,
  ShieldCheck,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeModalProps {
  onComplete: () => void;
}

export default function WelcomeModal({ onComplete }: WelcomeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Bem-vindo ao Gestão Pro!",
      subtitle: "Seu mercadinho agora tem tecnologia de ponta.",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-green-500 shadow-xl shadow-green-500/20 text-white">
              <ShoppingCart className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-tighter">
              Tudo Pronto!
            </h2>
            <p className="text-muted-foreground font-medium">
              Sua plataforma de gestão foi configurada com sucesso. Vamos dar
              uma olhada rápida nas principais ferramentas?
            </p>
          </div>

          <div className="grid gap-3">
            {[
              "Controle de estoque em tempo real",
              "PDV rápido e intuitivo",
              "Relatórios financeiros detalhados",
              "Gestão de usuários e permissões",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 p-4 rounded-2xl bg-muted/50 border border-transparent hover:border-green-500/20 transition-all"
              >
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Destaques do Sistema",
      subtitle: "Criado para facilitar o seu dia a dia.",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              {
                icon: ShoppingCart,
                title: "PDV (Vendas)",
                description:
                  "Finalize vendas em segundos com atalhos e busca rápida.",
                color: "bg-green-500",
              },
              {
                icon: Package,
                title: "Estoque Inteligente",
                description:
                  "Alertas automáticos de itens acabando ou vencendo.",
                color: "bg-amber-500",
              },
              {
                icon: TrendingUp,
                title: "Relatórios Visuais",
                description:
                  "Gráficos claros para você entender seu lucro real.",
                color: "bg-blue-500",
              },
              {
                icon: ShieldCheck,
                title: "Segurança Total",
                description:
                  "Controle exatamente o que seus funcionários acessam.",
                color: "bg-purple-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-5 rounded-[1.5rem] border bg-card hover:shadow-lg transition-all group"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} text-white shadow-lg shadow-black/5`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg leading-tight group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Vamos Começar?",
      subtitle: "Seu primeiro passo para uma gestão profissional.",
      content: (
        <div className="space-y-8">
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Cadastre seus Produtos",
                description:
                  "Adicione os itens do seu estoque com código de barras.",
                completed: false,
              },
              {
                step: "2",
                title: "Configure as Categorias",
                description: "Organize seu mercado por setores.",
                completed: false,
              },
              {
                step: "3",
                title: "Abra o PDV",
                description: "Comece a realizar suas primeiras vendas!",
                completed: false,
              },
            ].map((step, index) => (
              <div
                key={step.step}
                className="flex items-start space-x-4 relative"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${
                    index === 0
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3
                    className={`font-black text-xl leading-tight ${index === 0 ? "text-green-600" : ""}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-[2rem] bg-green-500/5 border-2 border-dashed border-green-500/20 flex items-start space-x-4">
            <Zap className="h-8 w-8 text-green-600 shrink-0" />
            <div>
              <h4 className="font-black text-green-700 uppercase tracking-widest text-xs">
                Dica de Especialista
              </h4>
              <p className="text-sm text-muted-foreground font-medium mt-1 leading-relaxed">
                Use um leitor de código de barras USB para acelerar o processo
                de venda no PDV em até 3x.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          className="relative w-full max-w-2xl mx-4"
        >
          <Card className="overflow-hidden border-none shadow-2xl rounded-[3rem] bg-card">
            <CardContent className="p-0">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-green-600 to-green-800 text-white p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight">
                      {steps[currentStep].title}
                    </h1>
                    <p className="text-green-50 font-medium opacity-80 mt-1">
                      {steps[currentStep].subtitle}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onComplete}
                    className="text-white hover:bg-white/20 rounded-full border border-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="flex space-x-3">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        index <= currentStep
                          ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-10">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {steps[currentStep].content}
                </motion.div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t">
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        className="rounded-xl h-12 px-6 font-bold border-2"
                      >
                        Voltar
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={onComplete}
                      className="rounded-xl h-12 px-6 font-bold opacity-40 hover:opacity-100 transition-opacity"
                    >
                      Pular Tour
                    </Button>
                  </div>

                  <Button
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 px-10 font-black shadow-lg shadow-green-500/20 transition-all active:scale-95"
                  >
                    {currentStep === steps.length - 1 ? "VAMOS LÁ!" : "PRÓXIMO"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
