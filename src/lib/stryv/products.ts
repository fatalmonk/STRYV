// lib/stryv/products.ts
import { Product } from './types';

export const vintageCollection: Product[] = [
  {
    id: 'v1',
    name: "Retro Madrid '02",
    category: 'Vintage Classico',
    price: 3500,
    image: '/images/product_1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'v2',
    name: "Milan Glory '94",
    category: 'Serie A Legends',
    price: 3200,
    image: '/images/product_2.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'v3',
    name: "United Treble \'99",
    category: 'Premier Kings',
    price: 3800,
    image: '/images/product_3.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'v4',
    name: 'Highbury Farewell',
    category: 'Gunners Legacy',
    price: 3400,
    image: '/images/product_4.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
];

export const momentsCollection: Product[] = [
  {
    id: 'm1',
    name: 'Hand of God',
    category: 'Iconic Moments',
    price: 2500,
    image: '/images/product_5.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'm2',
    name: 'Zidane Volley',
    category: 'UCL Classics',
    price: 2500,
    image: '/images/product_6.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'm3',
    name: 'Aguerooooo',
    category: 'Premier Moments',
    price: 2500,
    image: '/images/product_7.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'm4',
    name: 'Corner Taken Quickly',
    category: 'Anfield Magic',
    price: 2500,
    image: '/images/product_8.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
  {
    id: 'm5',
    name: 'Invincibles',
    category: 'Golden Premier',
    price: 2800,
    image: '/images/product_9.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
  },
];

export const getAllProducts = (): Product[] => {
  return [...vintageCollection, ...momentsCollection];
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};