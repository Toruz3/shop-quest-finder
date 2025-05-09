
export interface Product {
  id: number;
  name: string;
  quantity: number;
  imageUrl?: string;
  price?: number;
  supermarket?: string;
  originalIsPromotional?: boolean;
}

export interface ProductSuggestion {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  isPromotional?: boolean;
  price?: number;
  supermarket?: string;
}

export interface PriceComparison {
  supermarketName: string;
  price: number;
  isBestOffer: boolean;
  logoUrl?: string;
}
