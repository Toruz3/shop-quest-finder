
export interface Product {
  id: number;
  name: string;
  quantity: number;
  imageUrl?: string;
  originalIsPromotional?: boolean; // Added this property to track promotional status
}

export interface ProductSuggestion {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  isPromotional?: boolean; // Added for tracking promotional status in suggestions
}
