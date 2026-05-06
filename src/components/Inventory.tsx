/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Plus, Search, AlertCircle, TrendingUp, Package, Tag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Material } from '../types';

export default function Inventory() {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Succulent Mix Soil',
      category: 'soil',
      stock: 15,
      unit: 'kg',
      unitCost: 120,
      supplier: 'Green Earth Supplies',
      lowStockThreshold: 5,
      updatedAt: Date.now()
    },
    {
      id: '2',
      name: 'Haworthia Fasciata',
      category: 'plant',
      stock: 8,
      unit: 'pcs',
      unitCost: 85,
      supplier: 'Nursery Direct',
      lowStockThreshold: 10,
      updatedAt: Date.now()
    },
    {
      id: '3',
      name: 'Geometric Glass Bowl',
      category: 'container',
      stock: 4,
      unit: 'pcs',
      unitCost: 450,
      supplier: 'Zen Designs',
      lowStockThreshold: 5,
      updatedAt: Date.now()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8" id="inventory-view">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif italic text-3xl text-sage-800">Raw Materials</h2>
          <p className="text-sage-500 font-sans text-sm">Track your substrates, plants, and vessels.</p>
        </div>
        <button className="flex items-center gap-2 bg-sage-600 text-white px-5 py-2.5 rounded-full hover:bg-sage-700 transition-all shadow-lg hover:translate-y-[-2px]" id="add-material-btn">
          <Plus size={18} />
          <span className="font-medium">Add Material</span>
        </button>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="organic-card flex items-center gap-4"
        >
          <div className="p-3 bg-sage-100 rounded-2xl text-sage-600">
            <Package size={24} />
          </div>
          <div>
            <div className="label-micro text-sage-400">Total Items</div>
            <div className="text-2xl font-bold text-sage-800">{materials.length}</div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="organic-card flex items-center gap-4"
        >
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <div className="label-micro text-amber-400">Low Stock</div>
            <div className="text-2xl font-bold text-amber-600">
              {materials.filter(m => m.stock < m.lowStockThreshold).length}
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="organic-card flex items-center gap-4"
        >
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="label-micro text-blue-400">Inventory Value</div>
            <div className="text-2xl font-bold text-blue-800">
            ₹{materials.reduce((acc, curr) => acc + (curr.stock * curr.unitCost), 0).toLocaleString()}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400" size={18} />
          <input 
            type="text" 
            placeholder="Search materials by name or category..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-sage-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-200 transition-all font-sans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-3xl overflow-hidden border border-sage-100 shadow-sm overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] px-6 py-4 bg-sage-50/50 border-bottom border-sage-100">
            <div className="label-micro">Material Name</div>
            <div className="label-micro">Category</div>
            <div className="label-micro">In Stock</div>
            <div className="label-micro">Unit Cost</div>
            <div className="label-micro">Supplier</div>
            <div className="label-micro text-right">Last Action</div>
          </div>
          
          <div className="divide-y divide-sage-50">
            <AnimatePresence mode="popLayout">
              {filteredMaterials.map((material, idx) => (
                <motion.div 
                  key={material.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] px-6 py-4 items-center hover:bg-sage-50/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${material.stock < material.lowStockThreshold ? 'bg-amber-400 animate-pulse' : 'bg-sage-300'}`} />
                    <span className="font-medium text-sage-900 group-hover:text-sage-600 transition-colors">{material.name}</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sage-100 text-xs font-medium text-sage-600 capitalize">
                      <Tag size={12} />
                      {material.category}
                    </span>
                  </div>
                  <div className="font-mono text-sm">
                    <span className={material.stock < material.lowStockThreshold ? 'text-amber-600 font-bold' : 'text-sage-600'}>
                      {material.stock}
                    </span>
                    <span className="text-sage-400 ml-1">{material.unit}</span>
                  </div>
                  <div className="font-mono text-sm text-sage-600">
                    ₹{material.unitCost}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sage-500">
                    <User size={14} className="text-sage-300" />
                    {material.supplier}
                  </div>
                  <div className="text-right text-[10px] text-sage-400">
                    {new Date(material.updatedAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredMaterials.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-sage-400 italic">No materials found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
