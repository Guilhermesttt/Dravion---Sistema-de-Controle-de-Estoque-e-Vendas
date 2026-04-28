export interface Product {
  id: string;
  name: string;
  price: number;
  barcode: string;
  category: string;
  stock: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Leite Integral 1L",
    price: 5.5,
    barcode: "789123456001",
    category: "Laticínios",
    stock: 50,
  },
  {
    id: "2",
    name: "Arroz Tipo 1 5kg",
    price: 29.9,
    barcode: "789123456002",
    category: "Grãos",
    stock: 30,
  },
  {
    id: "3",
    name: "Feijão Carioca 1kg",
    price: 8.5,
    barcode: "789123456003",
    category: "Grãos",
    stock: 40,
  },
  {
    id: "4",
    name: "Café Torrado 500g",
    price: 18.0,
    barcode: "789123456004",
    category: "Matinais",
    stock: 25,
  },
  {
    id: "5",
    name: "Detergente Líquido",
    price: 2.5,
    barcode: "789123456005",
    category: "Limpeza",
    stock: 100,
  },
  {
    id: "6",
    name: "Pão de Forma",
    price: 9.0,
    barcode: "789123456006",
    category: "Padaria",
    stock: 15,
  },
  {
    id: "7",
    name: "Óleo de Soja 900ml",
    price: 7.2,
    barcode: "789123456007",
    category: "Mercearia",
    stock: 60,
  },
];
