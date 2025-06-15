
export interface Product {
  id: number;
  name: string;
  price: number;
  trend: "down" | "up" | "stable";
  discount: string | null;
}

// Expanded sample products from the database
export const products: Product[] = [{
  id: 1,
  name: "Latte",
  price: 2.25,
  trend: "down" as const,
  discount: "10%"
}, {
  id: 2,
  name: "Pane",
  price: 1.50,
  trend: "stable" as const,
  discount: null
}, {
  id: 3,
  name: "Pasta",
  price: 0.89,
  trend: "down" as const,
  discount: "20%"
}, {
  id: 4,
  name: "Uova",
  price: 2.99,
  trend: "up" as const,
  discount: null
}, {
  id: 5,
  name: "Pomodori",
  price: 1.85,
  trend: "down" as const,
  discount: "15%"
}, {
  id: 6,
  name: "Olio extravergine",
  price: 4.50,
  trend: "stable" as const,
  discount: null
}, {
  id: 7,
  name: "Mozzarella",
  price: 3.20,
  trend: "up" as const,
  discount: null
}, {
  id: 8,
  name: "Salmone",
  price: 12.90,
  trend: "down" as const,
  discount: "25%"
}, {
  id: 9,
  name: "Banane",
  price: 1.80,
  trend: "stable" as const,
  discount: null
}, {
  id: 10,
  name: "Yogurt",
  price: 2.40,
  trend: "down" as const,
  discount: "5%"
}, {
  id: 11,
  name: "Pollo",
  price: 6.50,
  trend: "up" as const,
  discount: null
}, {
  id: 12,
  name: "Riso",
  price: 1.20,
  trend: "stable" as const,
  discount: null
}, {
  id: 13,
  name: "Broccoli",
  price: 2.10,
  trend: "down" as const,
  discount: "12%"
}, {
  id: 14,
  name: "Formaggio",
  price: 4.80,
  trend: "up" as const,
  discount: null
}, {
  id: 15,
  name: "Caffè",
  price: 3.60,
  trend: "stable" as const,
  discount: null
}, {
  id: 16,
  name: "Arance",
  price: 2.30,
  trend: "down" as const,
  discount: "8%"
}, {
  id: 17,
  name: "Spaghetti",
  price: 1.10,
  trend: "stable" as const,
  discount: null
}, {
  id: 18,
  name: "Carne di manzo",
  price: 15.80,
  trend: "up" as const,
  discount: null
}, {
  id: 19,
  name: "Limoni",
  price: 2.90,
  trend: "down" as const,
  discount: "18%"
}, {
  id: 20,
  name: "Acqua",
  price: 0.50,
  trend: "stable" as const,
  discount: null
}, {
  id: 21,
  name: "Acciughe",
  price: 3.80,
  trend: "down" as const,
  discount: "15%"
}, {
  id: 22,
  name: "Tonno",
  price: 2.90,
  trend: "stable" as const,
  discount: null
}, {
  id: 23,
  name: "Sardine",
  price: 2.50,
  trend: "down" as const,
  discount: "10%"
}, {
  id: 24,
  name: "Prosciutto",
  price: 8.90,
  trend: "up" as const,
  discount: null
}, {
  id: 25,
  name: "Salame",
  price: 6.70,
  trend: "stable" as const,
  discount: null
}, {
  id: 26,
  name: "Mortadella",
  price: 4.20,
  trend: "down" as const,
  discount: "8%"
}, {
  id: 27,
  name: "Bresaola",
  price: 12.50,
  trend: "up" as const,
  discount: null
}, {
  id: 28,
  name: "Parmigiano",
  price: 18.90,
  trend: "stable" as const,
  discount: null
}, {
  id: 29,
  name: "Gorgonzola",
  price: 7.30,
  trend: "down" as const,
  discount: "12%"
}, {
  id: 30,
  name: "Ricotta",
  price: 2.80,
  trend: "stable" as const,
  discount: null
}];
