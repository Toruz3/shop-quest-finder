
export interface Product {
  id: number;
  name: string;
  quantity: number;
  imageUrl?: string;
}

export interface ProductSuggestion {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
}
