/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Users, MapPin, Plus, UserPlus, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Workshop } from '../types';

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 'WS-001',
      title: 'Terrarium Basics Workshop',
      date: Date.now() + 604800000,
      location: 'Kochi Studio',
      clients: [
        { name: 'Sita', contact: '9847123456', paid: true },
        { name: 'Kiran', contact: '9847654321', paid: false }
      ],
      maxParticipants: 10,
      pricePerPerson: 1500
    }
  ]);

  return (
    <div className="space-y-8" id="workshops-view">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif italic text-3xl text-sage-800">Workshops</h2>
          <p className="text-sage-500 font-sans text-sm">Schedule and manage your interactive sessions.</p>
        </div>
        <button className="flex items-center gap-2 bg-sage-600 text-white px-5 py-2.5 rounded-full hover:bg-sage-700 transition-all shadow-lg" id="new-workshop-btn">
          <Plus size={18} />
          <span className="font-medium">Schedule Session</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {workshops.map((ws) => (
          <motion.div 
            key={ws.id} 
            whileHover={{ y: -4 }}
            className="organic-card border-none ring-1 ring-sage-100 hover:ring-sage-300 transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-2xl text-sage-900 mb-1">{ws.title}</h3>
                <div className="flex items-center gap-4 text-sage-400 text-sm">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(ws.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {ws.location}</span>
                </div>
              </div>
              <div className="bg-sage-50 text-sage-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
                ₹{ws.pricePerPerson}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="label-micro">Participants ({ws.clients.length}/{ws.maxParticipants})</div>
                <button className="text-sage-600 hover:text-sage-800 transition-colors">
                  <UserPlus size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                {ws.clients.map((client, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-sage-50/50 rounded-2xl border border-sage-100/50">
                    <div>
                      <div className="font-medium text-sage-800">{client.name}</div>
                      <div className="text-xs text-sage-400">{client.contact}</div>
                    </div>
                    {client.paid ? (
                      <span className="text-emerald-500 flex items-center gap-1 text-xs font-medium">
                        <CheckCircle2 size={14} /> Paid
                      </span>
                    ) : (
                      <span className="text-amber-500 text-xs font-medium italic">Pending payment</span>
                    )}
                  </div>
                ))}
                {ws.clients.length === 0 && (
                  <div className="py-8 text-center text-sage-300 italic text-sm">No bookings yet.</div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-sage-50 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-sage-200" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-sage-100 flex items-center justify-center text-[10px] text-sage-400 font-bold">
                  +{Math.max(0, ws.clients.length - 3)}
                </div>
              </div>
              <div className="text-right">
                <div className="label-micro text-sage-400">Projected Revenue</div>
                <div className="font-mono font-bold text-sage-800 text-lg">₹{ws.clients.length * ws.pricePerPerson}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
