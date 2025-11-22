// lib/stryv/products.ts
import { Product } from './types';

export const vintageCollection: Product[] = [
  { id: 'v1', name: "Retro Madrid '02", category: 'Vintage Classico', price: 3500, image: '/images/product_1.jpg' },
  { id: 'v2', name: "Milan Glory '94", category: 'Serie A Legends', price: 3200, image: '/images/product_2.jpg' },
  { id: 'v3', name: "United Treble \'99", category: 'Premier Kings', price: 3800, image: '/images/product_3.jpg' },
  { id: 'v4', name: 'Highbury Farewell', category: 'Gunners Legacy', price: 3400, image: '/images/product_4.jpg' },
];

export const momentsCollection: Product[] = [
  { id: 'm1', name: 'Hand of God', category: 'Iconic Moments', price: 2500, image: '/images/product_5.jpg' },
  { id: 'm2', name: 'Zidane Volley', category: 'UCL Classics', price: 2500, image: '/images/product_6.jpg' },
  { id: 'm3', name: 'Aguerooooo', category: 'Premier Moments', price: 2500, image: '/images/product_7.jpg' },
  { id: 'm4', name: 'Corner Taken Quickly', category: 'Anfield Magic', price: 2500, image: '/images/product_8.jpg' },
  { id: 'm5', name: 'Invincibles', category: 'Golden Premier', price: 2800, image: '/images/product_9.jpg' },
];