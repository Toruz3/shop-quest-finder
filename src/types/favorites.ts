
export interface FavoriteList {
  id: number;
  name: string;
  itemCount: number;
  lastUsed: string;
  items: string[];
}

export interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  store: string;
}
