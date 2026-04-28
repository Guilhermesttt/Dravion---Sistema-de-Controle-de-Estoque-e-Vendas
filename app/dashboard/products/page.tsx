"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Package,
  AlertTriangle,
  ArrowUpDown,
  Filter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts, Product } from "@/lib/mockData";
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    barcode: "",
    category: "",
    stock: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode.includes(searchTerm),
  );

  const handleOpenAddDialog = () => {
    setEditingProduct(null);
    setNewProduct({ name: "", price: 0, barcode: "", category: "", stock: 0 });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: newProduct.name || p.name,
                price: Number(newProduct.price) ?? p.price,
                barcode: newProduct.barcode || p.barcode,
                category: newProduct.category || p.category,
                stock: Number(newProduct.stock) ?? p.stock,
              }
            : p,
        ),
      );
    } else {
      // Add new product
      const product: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: newProduct.name || "Novo Produto",
        price: Number(newProduct.price) || 0,
        barcode: newProduct.barcode || "000000",
        category: newProduct.category || "Geral",
        stock: Number(newProduct.stock) || 0,
      };
      setProducts([...products, product]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setNewProduct({ name: "", price: 0, barcode: "", category: "", stock: 0 });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Produtos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie o estoque e preços do seu mercado.
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleOpenAddDialog}
                className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 px-8 font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all"
              >
                <Plus className="mr-2 h-6 w-6" /> Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8 border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">
                  {editingProduct ? "Editar Produto" : "Adicionar Produto"}
                </DialogTitle>
                <DialogDescription className="font-medium">
                  {editingProduct 
                    ? "Altere as informações do item selecionado." 
                    : "Insira as informações do novo item no estoque."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="font-bold ml-1">
                    Nome do Produto
                  </Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="rounded-xl h-12 border-2 focus-visible:ring-green-500"
                    placeholder="Ex: Arroz 5kg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price" className="font-bold ml-1">
                      Preço (R$)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="rounded-xl h-12 border-2 focus-visible:ring-green-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock" className="font-bold ml-1">
                      Estoque
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          stock: Number(e.target.value),
                        })
                      }
                      className="rounded-xl h-12 border-2 focus-visible:ring-green-500"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="barcode" className="font-bold ml-1">
                    Código de Barras
                  </Label>
                  <Input
                    id="barcode"
                    value={newProduct.barcode}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, barcode: e.target.value })
                    }
                    className="rounded-xl h-12 border-2 focus-visible:ring-green-500"
                    placeholder="789..."
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="ghost"
                  onClick={() => setIsDialogOpen(false)}
                  className="rounded-xl h-12 font-bold"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveProduct}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 font-bold flex-1 shadow-lg shadow-green-500/10"
                >
                  {editingProduct ? "Salvar Alterações" : "Salvar Produto"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none shadow-sm bg-green-500/5 rounded-3xl group hover:bg-green-500/10 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest leading-none">
                    Total de Itens
                  </p>
                  <p className="text-4xl font-black mt-2 tracking-tighter">
                    {products.length}
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-[1.5rem] text-green-600 group-hover:scale-110 transition-transform">
                  <Package className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-sm bg-amber-500/5 rounded-3xl group hover:bg-amber-500/10 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-widest leading-none">
                    Estoque Baixo
                  </p>
                  <p className="text-4xl font-black mt-2 tracking-tighter">
                    {products.filter((p) => p.stock < 10).length}
                  </p>
                </div>
                <div className="p-4 bg-amber-500/10 rounded-[1.5rem] text-amber-600 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none shadow-sm bg-blue-500/5 rounded-3xl group hover:bg-blue-500/10 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest leading-none">
                    Categorias
                  </p>
                  <p className="text-4xl font-black mt-2 tracking-tighter">
                    {new Set(products.map((p) => p.category)).size}
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-[1.5rem] text-blue-600 group-hover:scale-110 transition-transform">
                  <Filter className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
        <CardHeader className="p-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-green-600 transition-colors" />
              <Input
                placeholder="Buscar por nome ou código..."
                className="pl-12 h-12 rounded-2xl bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-green-500 text-base shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold border-2"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" /> Ordenar
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold border-2"
              >
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-8 h-14 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                  Produto
                </TableHead>
                <TableHead className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                  Categoria
                </TableHead>
                <TableHead className="text-right font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                  Preço
                </TableHead>
                <TableHead className="text-center font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                  Estoque
                </TableHead>
                <TableHead className="text-center font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                  Status
                </TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="group hover:bg-muted/10 transition-colors border-b last:border-0"
                >
                  <TableCell className="pl-8 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-foreground text-lg leading-tight group-hover:text-green-600 transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[10px] font-black text-muted-foreground/60 tracking-widest uppercase">
                        {product.barcode}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="rounded-xl bg-muted/50 font-bold px-3 py-1 border-none text-[10px] uppercase"
                    >
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-lg font-black text-green-700 dark:text-green-400">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-black text-base ${product.stock < 10 ? "text-amber-600" : "text-foreground"}`}
                    >
                      {product.stock}{" "}
                      <span className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
                        un
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`rounded-full px-4 py-1.5 border-none font-bold text-[10px] uppercase shadow-sm ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          : product.stock > 0
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                      }`}
                    >
                      {product.stock > 10
                        ? "Em Estoque"
                        : product.stock > 0
                          ? "Baixo Estoque"
                          : "Esgotado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8">
                    {userRole === "admin" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-muted"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-[1.5rem] p-3 min-w-[180px] shadow-2xl border-none"
                        >
                          <DropdownMenuLabel className="font-black text-xs uppercase text-muted-foreground ml-1">
                            Ações do Item
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold"
                            onClick={() => handleOpenEditDialog(product)}
                          >
                            <Edit2 className="h-4 w-4 text-blue-500" /> Editar
                            Produto
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-xl flex gap-3 cursor-pointer py-3 h-10 font-bold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" /> Excluir Registro
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProducts.length === 0 && (
            <div className="p-24 text-center text-muted-foreground space-y-6">
              <div className="size-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto transition-transform hover:rotate-12">
                <Package className="h-12 w-12 opacity-20" />
              </div>
              <div className="max-w-xs mx-auto">
                <p className="text-2xl font-black text-foreground">
                  Nenhum produto
                </p>
                <p className="text-sm font-medium opacity-60 mt-2">
                  Tente buscar por outro nome ou código de barras para encontrar
                  o item desejado.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-xl font-bold border-2"
                onClick={() => setSearchTerm("")}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
