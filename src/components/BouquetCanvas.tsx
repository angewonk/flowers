import React, { useState } from 'react';
import { FlowerItem } from '../types';
import { RIBBON_OPTIONS } from '../data/flowers';
import { FlowerSVG } from './FlowerSVG';
import { Sparkles, Heart, Plus, Trash2, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BouquetCanvasProps {
  selectedFlowers: FlowerItem[];
  allFlowers: FlowerItem[];
  onAddFlower: (flower: FlowerItem) => void;
  onRemoveFlower: (flowerId: string) => void;
  onResetBouquet: () => void;
}

export const BouquetCanvas: React.FC<BouquetCanvasProps> = ({
  selectedFlowers,
  allFlowers,
  onAddFlower,
  onRemoveFlower,
  onResetBouquet,
}) => {
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);
  const [ribbonTagText, setRibbonTagText] = useState('For Janna 💖');
  const [isEditingTag, setIsEditingTag] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);

  const handleBloomEffect = () => {
    setIsBlooming(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FBBF24', '#C084FC', '#FFFFFF'],
    });
    setTimeout(() => setIsBlooming(false), 1200);
  };

  return (
    <div className="bg-gradient-to-b from-rose-50/70 via-white to-pink-50/50 border border-rose-200 rounded-3xl p-4 sm:p-8 shadow-xl relative overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-rose-100 pb-5 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Janna’s Digital Floral Bouquet</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
            Handpicked Flower Bouquet
          </h2>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBloomEffect}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-medium shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-100" />
            <span>Make Flowers Bloom</span>
          </button>

          <button
            onClick={onResetBouquet}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white border border-stone-200 hover:border-rose-300 text-stone-600 hover:text-rose-600 text-xs sm:text-sm font-medium transition-colors"
            title="Reset Bouquet"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left / Central Visual Bouquet Showcase */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] bg-white/70 backdrop-blur-md rounded-2xl border border-rose-100/80 p-6 relative shadow-inner">
          
          {/* Bouquet Flowers Display Container */}
          <div className="relative w-full max-w-sm h-72 sm:h-80 flex items-center justify-center">
            
            {/* Background Bouquet Paper Wrapping */}
            <div className="absolute bottom-6 w-48 sm:w-56 h-52 sm:h-60 bg-gradient-to-t from-amber-100/90 via-pink-100/80 to-transparent rounded-b-full border-b-2 border-rose-200/60 shadow-lg transform rotate-0 flex items-end justify-center pb-8">
              <div className="text-center">
                <span className="font-handwriting text-xl text-rose-800 font-bold tracking-wide">
                  {ribbonTagText}
                </span>
              </div>
            </div>

            {/* Selected Flowers Positioned dynamically in a fan bouquet arc */}
            {selectedFlowers.length === 0 ? (
              <div className="text-center p-6 text-stone-400 font-sans-body text-sm">
                <p>Your bouquet is empty!</p>
                <p className="text-xs text-rose-500 mt-1">Select flowers from the right to build Janna's bouquet 🌸</p>
              </div>
            ) : (
              selectedFlowers.map((flower, idx) => {
                const total = selectedFlowers.length;
                // Compute fan angle for arc arrangement
                const angle = total === 1 ? 0 : -35 + (idx / (total - 1)) * 70;
                const offsetY = Math.abs(angle) * 0.8;
                const scale = 1 + (idx % 2 === 0 ? 0.08 : -0.05);

                return (
                  <div
                    key={`${flower.id}-${idx}`}
                    className={`absolute transition-all duration-500 transform ${
                      isBlooming ? 'scale-125 rotate-6' : ''
                    }`}
                    style={{
                      transform: `rotate(${angle}deg) translateY(${-offsetY - 20}px) scale(${scale})`,
                      transformOrigin: 'bottom center',
                      zIndex: 10 + idx,
                    }}
                  >
                    <div className="relative group">
                      <FlowerSVG
                        type={flower.svgPath}
                        color={flower.color}
                        size={110}
                        animate={true}
                      />

                      {/* Remove Button on hover */}
                      <button
                        onClick={() => onRemoveFlower(flower.id)}
                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-700 transition-opacity cursor-pointer"
                        title={`Remove ${flower.name}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* Decorative Ribbon Wrap */}
            <div
              className="absolute bottom-10 px-6 py-2 rounded-full shadow-lg border-2 flex items-center justify-center gap-2 transform hover:scale-105 transition-transform"
              style={{
                backgroundColor: selectedRibbon.color,
                borderColor: selectedRibbon.border,
              }}
            >
              <Heart className="w-4 h-4 fill-stone-800 text-stone-800" />
              <span className="font-serif-display font-semibold text-xs sm:text-sm text-stone-800">
                {selectedRibbon.name}
              </span>
            </div>
          </div>

          {/* Interactive Tag Editor */}
          <div className="mt-4 w-full max-w-xs flex items-center justify-center gap-2">
            {isEditingTag ? (
              <input
                type="text"
                value={ribbonTagText}
                onChange={(e) => setRibbonTagText(e.target.value)}
                onBlur={() => setIsEditingTag(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTag(false)}
                autoFocus
                className="w-full text-center font-handwriting text-xl text-rose-800 bg-white border border-rose-300 rounded-lg px-3 py-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-400"
                maxLength={30}
              />
            ) : (
              <button
                onClick={() => setIsEditingTag(true)}
                className="font-handwriting text-xl text-rose-800 hover:text-rose-900 border-b border-dashed border-rose-300 px-2 py-0.5 hover:bg-rose-50 rounded transition-colors"
                title="Click to edit ribbon tag message"
              >
                "{ribbonTagText}" <span className="text-xs text-rose-400 font-sans-body">(click to edit)</span>
              </button>
            )}
          </div>

          {/* Flower Count Summary */}
          <div className="mt-3 flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            <span>{selectedFlowers.length} stems in Janna’s arrangement</span>
          </div>
        </div>

        {/* Right Controls / Ribbon Selector & Add Flower Panel */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Ribbon Color Choice */}
          <div className="bg-white/90 rounded-2xl p-4 border border-rose-100 shadow-sm">
            <h3 className="font-serif-display font-semibold text-sm text-stone-800 mb-3">
              1. Choose Satin Ribbon Style
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {RIBBON_OPTIONS.map((ribbon) => {
                const isSelected = selectedRibbon.id === ribbon.id;
                return (
                  <button
                    key={ribbon.id}
                    onClick={() => setSelectedRibbon(ribbon)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-400 bg-rose-50/80 text-rose-900 shadow-sm'
                        : 'border-stone-200 hover:border-rose-200 text-stone-600'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border shadow-inner shrink-0"
                      style={{ backgroundColor: ribbon.color, borderColor: ribbon.border }}
                    />
                    <span className="truncate">{ribbon.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add Flowers Quick Selector */}
          <div className="bg-white/90 rounded-2xl p-4 border border-rose-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-display font-semibold text-sm text-stone-800">
                2. Add Stems to Janna’s Bouquet
              </h3>
              <span className="text-[11px] text-rose-600 font-medium">Tap + to add</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {allFlowers.map((flower) => {
                const countInBouquet = selectedFlowers.filter((f) => f.id === flower.id).length;
                return (
                  <div
                    key={flower.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-stone-50/80 hover:bg-rose-50/60 border border-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FlowerSVG type={flower.svgPath} color={flower.color} size={32} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-stone-800 truncate">{flower.name}</p>
                        <p className="text-[10px] text-stone-500 truncate">{flower.meaning}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {countInBouquet > 0 && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded-full">
                          x{countInBouquet}
                        </span>
                      )}
                      <button
                        onClick={() => onAddFlower(flower)}
                        className="w-7 h-7 rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-sm transition-transform active:scale-90 cursor-pointer"
                        title={`Add ${flower.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
