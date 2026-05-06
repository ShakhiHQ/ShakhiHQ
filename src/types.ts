/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Material {
  id: string;
  name: string;
  category: 'soil' | 'plant' | 'container' | 'decoration' | 'other';
  stock: number;
  unit: string;
  unitCost: number;
  supplier: string;
  lowStockThreshold: number;
  updatedAt: number;
}

export interface Order {
  id: string;
  clientName: string;
  instagramHandle: string;
  items: { materialId: string; quantity: number }[];
  materialCost: number;
  sellingPrice: number;
  profit: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: number;
}

export interface Workshop {
  id: string;
  title: string;
  date: number;
  location: string;
  clients: { name: string; contact: string; paid: boolean }[];
  maxParticipants: number;
  pricePerPerson: number;
}

export interface ContentIdea {
  id: string;
  title: string;
  type: 'reel' | 'post' | 'story';
  status: 'draft' | 'scheduled' | 'posted';
  scheduledDate?: number;
  notes: string;
}
