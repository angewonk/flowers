import React, { useState } from 'react';
import { FlowerItem } from '../types';
import { FlowerSVG } from './FlowerSVG';
import { Plus, Heart, Sparkles, Info } from 'lucide-react';

interface FlowerLibraryProps {
  flowers: FlowerItem[];
  onAddFlower: (flower: FlowerItem) => void;
}

export const FlowerLibrary: React.FC<FlowerLibraryProps> = ({ flowers, onAddFlower }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModalFlower, setSelectedModalFlower] = useState<FlowerItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Flowers' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'tender', label: 'Tender' },
    { id: 'joyful', label: 'Joyful' },
    { id: 'everlasting', label: 'Everlasting' },
  ];

  const filteredFlowers = activeCategory === 'all'
    ? flowers
    : flowers.filter((f) => f.category === activeCategory);

  return (
    <div className="py-8">
      {/* Category Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900">
            Janna’s Floral Glossary
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Explore the romantic meaning behind every flower in her garden.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-stone-100 hover:bg-rose-50 text-stone-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flower Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFlowers.map((flower) => (
          <div
            key={flower.id}
            className={`group bg-white rounded-2xl p-5 border ${flower.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between`}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${flower.lightBg} ${flower.accentColor}`}>
                {flower.category}
              </span>
              <button
                onClick={() => setSelectedModalFlower(flower)}
                className="text-stone-400 hover:text-rose-500 transition-colors"
                title="View Details"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Central SVG Flower */}
            <div className="my-3 flex items-center justify-center h-28 bg-stone-50/60 rounded-xl border border-stone-100 group-hover:bg-rose-50/40 transition-colors">
              <FlowerSVG
                type={flower.svgPath}
                color={flower.color}
                size={80}
                animate={true}
              />
            </div>

            {/* Text Details */}
            <div>
              <h4 className="font-serif-display font-bold text-lg text-stone-900 group-hover:text-rose-600 transition-colors">
                {flower.name}
              </h4>
              <p className="text-[11px] text-stone-400 italic mb-2">
                {flower.botanicalName}
              </p>
              <div className="flex items-start gap-1.5 text-xs font-semibold text-rose-700 mb-2">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0 mt-0.5" />
                <span>{flower.meaning}</span>
              </div>
              <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                {flower.description}
              </p>
            </div>

            {/* Add Button */}
            <button
              onClick={() => onAddFlower(flower)}
              className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-700 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Janna’s Bouquet</span>
            </button>
          </div>
        ))}
      </div>

      {/* Flower Detail Modal */}
      {selectedModalFlower && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-rose-200">
            <button
              onClick={() => setSelectedModalFlower(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="w-28 h-28 mx-auto my-2 flex items-center justify-center bg-rose-50 rounded-2xl border border-rose-100">
                <FlowerSVG
                  type={selectedModalFlower.svgPath}
                  color={selectedModalFlower.color}
                  size={90}
                />
              </div>

              <span className="inline-block text-xs uppercase font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full mb-2">
                {selectedModalFlower.symbolism}
              </span>

              <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                {selectedModalFlower.name}
              </h3>
              <p className="text-xs text-stone-400 italic mb-4">
                {selectedModalFlower.botanicalName}
              </p>

              <div className="bg-stone-50 rounded-2xl p-4 text-left border border-stone-100 space-y-2 mb-6">
                <div>
                  <p className="text-[11px] uppercase font-bold text-stone-400">Romantic Meaning</p>
                  <p className="text-sm font-semibold text-rose-800">{selectedModalFlower.meaning}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-stone-400">Description</p>
                  <p className="text-xs text-stone-600 leading-relaxed">{selectedModalFlower.description}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddFlower(selectedModalFlower);
                  setSelectedModalFlower(null);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Add {selectedModalFlower.name} to Bouquet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
