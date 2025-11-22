// lib/stryv/types.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number; // out of 5
}