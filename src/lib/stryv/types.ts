// lib/stryv/types.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  sizes: string[];
  defaultSize?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number; // out of 5
}