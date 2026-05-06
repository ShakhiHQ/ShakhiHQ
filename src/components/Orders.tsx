/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, DollarSign, ArrowUpRight, Clock, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-101',
      clientName: 'Rahul Sharma',
      instagramHandle: '@rahul_plants',
      items: [{ materialId: '1', quantity: 2 }, { materialId: '2', quantity: 1 }],
      materialCost: 450,
      sellingPrice: 1125, // 450 * 2.5
      profit: 675,
      status: 'shipped',
      orderDate: Date.now() - 86400000
    },
    {
      id: 'ORD-102',
      clientName: 'Ananya Iyer',
      instagramHandle: '@ananya_decor',
      items: [{ materialId: '3', quantity: 1 }],
      materialCost: 800,
      sellingPrice: 2000, // 800 * 2.5
      profit: 1200,
      status: 'processing',
      orderDate: Date.now()
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'pending') return o.status === 'pending' || o.status === 'processing';
    if (activeTab === 'completed') return o.status === 'shipped' || o.status === 'delivered';
    return true;
  });

  const totalRevenue = orders.reduce((acc, o) => acc + o.sellingPrice, 0);
  const totalProfit = orders.reduce((acc, o) => acc + o.profit, 0);

  return (
    <div className="space-y-8" id="orders-view">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif italic text-3xl text-sage-800">Order Management</h2>
          <p className="text-sage-500 font-sans text-sm">Managing custom creations for your Instagram community.</p>
        </div>
        <div className="flex bg-white p-1 rounded-full border border-sage-100 shadow-sm">
          {(['all', 'pending', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                activeTab === tab ? 'bg-sage-600 text-white shadow-md' : 'text-sage-400 hover:text-sage-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="organic-card">
          <div className="label-micro mb-1">Total Orders</div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-sage-800">{orders.length}</span>
            <ShoppingBag className="text-sage-200" size={32} />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="organic-card">
          <div className="label-micro mb-1">Total Revenue</div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-sage-800">₹{totalRevenue.toLocaleString()}</span>
            <DollarSign className="text-sage-200" size={32} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="organic-card bg-sage-900 border-none">
          <div className="label-micro mb-1 text-sage-400">Net Profit</div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-white">₹{totalProfit.toLocaleString()}</span>
            <ArrowUpRight className="text-sage-500" size={32} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="organic-card">
          <div className="label-micro mb-1">Profitability</div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-sage-600">60%</span>
            <div className="w-12 h-12 rounded-full border-4 border-sage-100 border-t-sage-600 animate-spin-slow" />
          </div>
        </motion.div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order, idx) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="organic-card hover:border-sage-300 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${order.status === 'shipped' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {order.status === 'shipped' ? <CheckCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-sage-800">{order.clientName}</h3>
                    <span className="text-xs text-sage-400 bg-sage-50 px-2 py-0.5 rounded uppercase font-mono">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <a href={`https://instagram.com/${order.instagramHandle.replace('@','')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-sage-500 hover:text-sage-700">
                      {order.instagramHandle}
                      <ExternalLink size={12} />
                    </a>
                    <span className="text-sage-300">•</span>
                    <span className="text-xs text-sage-400">{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                <div className="text-center">
                  <div className="label-micro mb-1">Mat. Cost</div>
                  <div className="font-mono text-sage-600">₹{order.materialCost}</div>
                </div>
                <div className="text-center">
                  <div className="label-micro mb-1">Selling</div>
                  <div className="font-mono font-bold text-sage-800">₹{order.sellingPrice}</div>
                </div>
                <div className="text-center px-4 py-2 bg-sage-50 rounded-xl">
                  <div className="label-micro mb-1 text-sage-400">Profit</div>
                  <div className="font-mono font-bold text-emerald-600">+₹{order.profit}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-sage-100 rounded-lg text-sage-400 hover:text-sage-600 transition-colors">
                    <Filter size={18} />
                  </button>
                  <button className="bg-sage-100 text-sage-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-200 transition-colors">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="py-20 text-center organic-card border-dashed">
            <ShoppingBag size={48} className="mx-auto text-sage-200 mb-4" />
            <p className="text-sage-400 italic font-serif">No orders in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
