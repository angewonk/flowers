import React from 'react';
import { Heart, Sparkles, Music, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomeEnvelopeProps {
  onOpen: () => void;
}

export const WelcomeEnvelope: React.FC<WelcomeEnvelopeProps> = ({ onOpen }) => {
  const handleOpenClick = () => {
    // Fire confetti effect with rose petals and warm colors
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#C084FC', '#FFFFFF'],
    });

    onOpen();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50">
      {/* Background floating floral shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-32 h-32 rounded-full bg-rose-200 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-12 w-48 h-48 rounded-full bg-pink-200 blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-amber-100 blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        {/* Envelope Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-rose-200 rounded-3xl p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden transition-all duration-500 hover:shadow-rose-200/50">
          
          {/* Top Decorative Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Special Delivery • For Janna</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          </div>

          {/* Envelope Graphic / Illustration */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 flex items-center justify-center">
            {/* Soft glowing aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-amber-300 rounded-full blur-xl opacity-40 animate-pulse-glow" />
            
            {/* Center Floral Heart Stamp */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex flex-col items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-white/50">
              <Flower2 className="w-10 h-10 sm:w-12 sm:h-12 text-rose-100 mb-1 animate-bounce" />
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
          </div>

          {/* Greeting Typography */}
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
            Flowers for Janna 🌸
          </h1>
          
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-medium mb-4">
            “Stuck to you like glue...”
          </p>

          <p className="font-sans-body text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed mb-8">
            You received a special online flower garden crafted with love.
            Tap below to unseal your bouquet and play <span className="font-semibold text-rose-700">“Glue Song” by beabadoobee</span>.
          </p>

          {/* Action Button */}
          <button
            onClick={handleOpenClick}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-serif-display font-medium text-base sm:text-lg shadow-xl shadow-rose-300/50 hover:shadow-rose-400/70 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Music className="w-5 h-5 text-rose-100 group-hover:rotate-12 transition-transform" />
            <span>Open Janna’s Garden</span>
            <Heart className="w-5 h-5 fill-rose-200 text-rose-100 group-hover:scale-125 transition-transform" />
          </button>

          <p className="mt-4 text-[11px] text-stone-400">
            *Tap to enable audio playback & blossom animations
          </p>

        </div>
      </div>
    </div>
  );
};
