import React from 'react';
import { POLAROID_MEMORIES } from '../data/memories';
import { Sparkles, Heart, Camera } from 'lucide-react';

export const PhotoPolaroids: React.FC = () => {
  return (
    <div className="py-8 space-y-6">
      <div className="text-center max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-2">
          <Camera className="w-3.5 h-3.5 text-rose-500" />
          <span>Keepsake Moments</span>
        </div>
        <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
          Janna’s Floral Polaroids
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Sweet visual tokens frozen in time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {POLAROID_MEMORIES.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl p-4 shadow-lg border border-stone-200/80 transform hover:scale-105 hover:rotate-0 transition-all duration-300 ${item.rotation} group`}
          >
            {/* Polaroid Image */}
            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-stone-100 mb-3 border border-stone-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-xs rounded-full p-1.5 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </div>
            </div>

            {/* Polaroid Handwritten Caption */}
            <div className="text-center px-1">
              <h4 className="font-serif-display font-bold text-base text-stone-800">
                {item.title}
              </h4>
              <p className="font-handwriting text-xl text-rose-600 font-medium">
                "{item.caption}"
              </p>
              <p className="text-[10px] uppercase font-mono text-stone-400 mt-1">
                {item.dateStr}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
