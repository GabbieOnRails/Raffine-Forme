export interface Product {
  id: string;
  name: string;
  category: 'Blazer' | 'Dress' | 'Set';
  price: number;
  images: string[];
  description: string;
  details: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
