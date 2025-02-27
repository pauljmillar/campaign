import { Hit } from 'instantsearch.js';

export interface Product {
  name: string;
  description: string;
  company: string;
  industry: string;
  'sub-industry': string;
  channel: string;
}

export type ProductHit = Hit<Product>; 