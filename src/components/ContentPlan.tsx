/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Camera, Film, Hash, MessageCircle, MoreVertical, LayoutGrid, List, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { ContentIdea } from '../types';

export default function ContentPlan() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([
    {
      id: '1',
      title: 'Making of the Mossy Oasis',
      type: 'reel',
      status: 'draft',
      notes: 'Focus on the layering of substrates. Use calm music.'
    },
    {
      id: '2',
      title: 'Care Tips for Closed Terrariums',
      type: 'post',
      status: 'scheduled',
      scheduledDate: Date.now() + 172800000,
      notes: 'Carousal post with 5 tips.'
    },
    {
      id: '3',
      title: 'Workshop Highlights - May Session',
      type: 'story',
      status: 'posted',
      notes: 'Share client smiles and their final creations.'
    }
  ]);

  return (
    <div className="space-y-8" id="content-view">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif italic text-3xl text-sage-800">Content Strategy</h2>
          <p className="text-sage-500 font-sans text-sm">Plan your Instagram presence and branding.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-white border border-sage-100 text-sage-600 rounded-xl hover:bg-sage-50 transition-all">
            <LayoutGrid size={20} />
          </button>
          <button className="p-2.5 bg-white border border-sage-100 text-sage-400 rounded-xl hover:bg-sage-50 transition-all">
            <List size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea, idx) => (
          <motion.div 
            key={idea.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="organic-card border-none bg-white p-0 overflow-hidden group shadow-sm hover:shadow-xl transition-all"
          >
            <div className="h-40 bg-sage-50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#5d7864_1px,transparent_1px)] [background-size:16px_16px]" />
              {idea.type === 'reel' && <Film size={48} className="text-sage-200" />}
              {idea.type === 'post' && <Camera size={48} className="text-sage-200" />}
              {idea.type === 'story' && <MessageCircle size={48} className="text-sage-200" />}
              
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur text-[10px] uppercase font-bold tracking-widest text-sage-600 px-3 py-1 rounded-full border border-white/20">
                {idea.type}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-sage-800 group-hover:text-sage-600 transition-colors line-clamp-1">{idea.title}</h3>
                <button className="text-sage-300 hover:text-sage-600">
                  <MoreVertical size={18} />
                </button>
              </div>

              <p className="text-sm text-sage-500 line-clamp-2 mb-6 h-10 italic">"{idea.notes}"</p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  idea.status === 'posted' ? 'bg-emerald-50 text-emerald-600' : 
                  idea.status === 'scheduled' ? 'bg-blue-50 text-blue-600' : 
                  'bg-sage-100 text-sage-400'
                }`}>
                  {idea.status}
                </span>
                {idea.scheduledDate && (
                  <span className="text-[10px] text-sage-400 font-mono">
                    {new Date(idea.scheduledDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex border-t border-sage-50">
              <button className="flex-1 py-3 text-[10px] uppercase font-bold tracking-widest text-sage-400 hover:text-sage-600 hover:bg-sage-50 transition-all">Edit Idea</button>
              <div className="w-[1px] bg-sage-50" />
              <button className="flex-1 py-3 text-[10px] uppercase font-bold tracking-widest text-sage-600 hover:bg-sage-600 hover:text-white transition-all">Post Now</button>
            </div>
          </motion.div>
        ))}
        
        <motion.button 
          whileHover={{ scale: 0.98 }}
          className="organic-card border-2 border-dashed border-sage-200 bg-transparent flex flex-col items-center justify-center gap-2 text-sage-400 hover:border-sage-400 hover:text-sage-600 transition-all h-full min-h-[300px]"
        >
          <Plus size={32} />
          <span className="font-serif italic text-lg">New Content Idea</span>
        </motion.button>
      </div>
    </div>
  );
}
