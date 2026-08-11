import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, RefreshCw, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlowerStem {
  id: string;
  name: string;
  color: string;
  type: 'rose' | 'peony' | 'sunflower' | 'tulip' | 'daisy' | 'hydrangea' | 'babysbreath' | 'lavender' | 'orchid';
  angle: number;
  scale: number;
  offsetY: number;
}

const YOUTUBE_VIDEO_ID = 'y1cBhJLNNXU'; // beabadoobee - Glue Song (Official Video)

const INITIAL_BOUQUET: FlowerStem[] = [
  { id: '1', name: 'Pink Rose', color: '#F472B6', type: 'rose', angle: -36, scale: 1.1, offsetY: -15 },
  { id: '2', name: 'Soft Peony', color: '#FB7185', type: 'peony', angle: -22, scale: 1.25, offsetY: -35 },
  { id: '3', name: 'Golden Sunflower', color: '#FBBF24', type: 'sunflower', angle: 0, scale: 1.35, offsetY: -60 },
  { id: '4', name: 'Pastel Tulip', color: '#EC4899', type: 'tulip', angle: 22, scale: 1.2, offsetY: -30 },
  { id: '5', name: 'White Daisy', color: '#FFFFFF', type: 'daisy', angle: 36, scale: 1.1, offsetY: -15 },
  { id: '6', name: 'Baby’s Breath', color: '#F8FAFC', type: 'babysbreath', angle: -48, scale: 0.95, offsetY: 10 },
  { id: '7', name: 'Hydrangea', color: '#818CF8', type: 'hydrangea', angle: 48, scale: 1.15, offsetY: 8 },
  { id: '8', name: 'Lavender', color: '#A855F7', type: 'lavender', angle: -12, scale: 1.05, offsetY: -22 },
  { id: '9', name: 'Blossom Orchid', color: '#C084FC', type: 'orchid', angle: 12, scale: 1.1, offsetY: -24 },
  { id: '10', name: 'Red Rose', color: '#E11D48', type: 'rose', angle: -6, scale: 1.2, offsetY: -45 },
  { id: '11', name: 'Yellow Tulip', color: '#FACC15', type: 'tulip', angle: -30, scale: 1.05, offsetY: -22 },
  { id: '12', name: 'Blush Peony', color: '#FDA4AF', type: 'peony', angle: 30, scale: 1.2, offsetY: -25 },
];

const ADDABLE_FLOWERS = [
  { name: 'Rose', color: '#F472B6', type: 'rose' as const },
  { name: 'Peony', color: '#FB7185', type: 'peony' as const },
  { name: 'Sunflower', color: '#FBBF24', type: 'sunflower' as const },
  { name: 'Tulip', color: '#EC4899', type: 'tulip' as const },
  { name: 'Daisy', color: '#FFFFFF', type: 'daisy' as const },
  { name: 'Hydrangea', color: '#818CF8', type: 'hydrangea' as const },
  { name: 'Lavender', color: '#A855F7', type: 'lavender' as const },
  { name: 'Baby’s Breath', color: '#E2E8F0', type: 'babysbreath' as const },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [bouquet, setBouquet] = useState<FlowerStem[]>(INITIAL_BOUQUET);
  const [isBlooming, setIsBlooming] = useState<boolean>(false);

  const startExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#C084FC', '#FFFFFF'],
    });
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const addFlowerToBouquet = (typeObj: typeof ADDABLE_FLOWERS[0]) => {
    const angle = (Math.random() - 0.5) * 80;
    const scale = 0.95 + Math.random() * 0.35;
    const offsetY = -Math.random() * 35;
    const newStem: FlowerStem = {
      id: Date.now().toString() + Math.random(),
      name: typeObj.name,
      color: typeObj.color,
      type: typeObj.type,
      angle,
      scale,
      offsetY,
    };
    setBouquet((prev) => [...prev, newStem]);

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.5 },
      colors: [typeObj.color, '#FFFFFF'],
    });
  };

  const triggerBloom = () => {
    setIsBlooming(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#C084FC'],
    });
    setTimeout(() => setIsBlooming(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-stone-800 font-sans-body flex flex-col justify-between items-center p-4 sm:p-8 relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      
      {/* Official Glue Song YouTube Audio Stream (Video ID: y1cBhJLNNXU) */}
      {hasStarted && isPlaying && (
        <div className="sr-only">
          <iframe
            title="beabadoobee Glue Song Official Video"
            width="1"
            height="1"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&mute=${isMuted ? 1 : 0}`}
            allow="autoplay"
          />
        </div>
      )}

      {/* Initial Landing Overlay for User Interaction & Audio Start */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md border border-rose-200 rounded-3xl p-8 sm:p-12 text-center max-w-sm shadow-2xl space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-lg animate-pulse-glow">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <h1 className="font-serif-display text-3xl font-bold text-stone-900">
              flowers for you
            </h1>

            <button
              onClick={startExperience}
              className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-serif-display text-lg font-medium shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-rose-100" />
              <span>open</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Center Stage: Massive Bouquet Container */}
      <main className="w-full max-w-lg mx-auto my-auto flex flex-col items-center justify-center relative z-10 py-2 sm:py-6">
        
        {/* Glow Aura */}
        <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Grand Bouquet Stage */}
        <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
          
          {/* Bouquet Paper Wrapping Base */}
          <div className="absolute bottom-0 w-52 sm:w-64 h-52 sm:h-60 bg-gradient-to-t from-amber-100/90 via-rose-100/80 to-transparent rounded-b-full border-b-2 border-rose-200/80 shadow-lg flex items-end justify-center pb-3 z-0">
            <span className="font-handwriting text-2xl text-rose-800 font-bold tracking-wide">
              for Janna 💖
            </span>
          </div>

          {/* Bouquet Flower Stems */}
          {bouquet.map((stem) => (
            <div
              key={stem.id}
              onClick={triggerBloom}
              className={`absolute transition-all duration-500 transform cursor-pointer hover:scale-125 ${
                isBlooming ? 'scale-125 rotate-3' : ''
              }`}
              style={{
                transform: `rotate(${stem.angle}deg) translateY(${stem.offsetY - 35}px) scale(${stem.scale})`,
                transformOrigin: 'bottom center',
                zIndex: 10 + Math.floor(Math.abs(stem.angle)),
              }}
            >
              <RenderFlowerIcon type={stem.type} color={stem.color} size={85} />
            </div>
          ))}

          {/* Ribbon Waist Band (Placed at the stem pinch point safely above the text) */}
          <div
            onClick={triggerBloom}
            className="absolute bottom-28 px-5 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full shadow-md border border-white/60 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-transform z-30"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
            <span className="font-serif-display font-medium text-xs sm:text-sm tracking-wide">bloom</span>
          </div>
        </div>

        {/* Interactive Bar: Tap to Add More Flowers */}
        <div className="mt-4 flex flex-col items-center gap-3 w-full">
          <div className="flex items-center justify-center flex-wrap gap-2 max-w-md">
            {ADDABLE_FLOWERS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => addFlowerToBouquet(item)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-rose-50 border border-rose-200 shadow-xs text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>+ {item.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={triggerBloom}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bloom Flowers</span>
            </button>

            <button
              onClick={() => setBouquet(INITIAL_BOUQUET)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer"
              title="Reset Bouquet"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* Floating Bottom Music Bar ("Glue Song") */}
      <footer className="w-full max-w-sm mx-auto bg-white/90 backdrop-blur-md border border-rose-200 shadow-xl rounded-2xl p-3 flex items-center justify-between gap-3 relative z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-serif-display font-bold text-xs text-stone-900 truncate">
              Glue Song
            </p>
            <p className="text-[10px] text-rose-600 truncate">
              beabadoobee • for Janna 💖
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-full"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />}
          </button>
        </div>
      </footer>

    </div>
  );
}

// Render SVG Flower Component for SVG drawings
function RenderFlowerIcon({ type, color, size = 64 }: { type: string; color: string; size?: number }) {
  switch (type) {
    case 'rose':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 55 Q52 75 50 95" stroke="#166534" strokeWidth="4" />
          <circle cx="50" cy="40" r="30" fill={color} opacity="0.4" />
          <circle cx="50" cy="38" r="22" fill={color} />
          <circle cx="50" cy="35" r="10" fill="#FFF" opacity="0.3" />
        </svg>
      );
    case 'peony':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 50 Q48 75 50 95" stroke="#15803D" strokeWidth="4" />
          <circle cx="50" cy="40" r="32" fill={color} opacity="0.5" />
          <circle cx="38" cy="38" r="18" fill={color} />
          <circle cx="62" cy="38" r="18" fill={color} />
          <circle cx="50" cy="40" r="14" fill="#FFF" opacity="0.5" />
        </svg>
      );
    case 'sunflower':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 50 L50 95" stroke="#15803D" strokeWidth="4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse key={i} cx="50" cy="22" rx="6" ry="18" fill={color} transform={`rotate(${angle} 50 45)`} />
          ))}
          <circle cx="50" cy="45" r="14" fill="#78350F" />
        </svg>
      );
    case 'tulip':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 50 Q52 75 50 95" stroke="#15803D" strokeWidth="4" />
          <path d="M30 45 Q20 15 50 15 Q80 15 70 45 Q50 65 30 45 Z" fill={color} />
        </svg>
      );
    case 'daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 50 L50 95" stroke="#15803D" strokeWidth="3" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <ellipse key={i} cx="50" cy="24" rx="4" ry="16" fill="#FFFFFF" transform={`rotate(${angle} 50 45)`} />
          ))}
          <circle cx="50" cy="45" r="10" fill="#FACC15" />
        </svg>
      );
    case 'hydrangea':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 55 L50 95" stroke="#15803D" strokeWidth="4" />
          <circle cx="50" cy="40" r="28" fill={color} opacity="0.8" />
          <circle cx="42" cy="35" r="8" fill="#EEF2FF" />
          <circle cx="58" cy="35" r="8" fill="#EEF2FF" />
        </svg>
      );
    case 'lavender':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 15 L50 95" stroke="#15803D" strokeWidth="3" />
          {[25, 40, 55, 70].map((y, idx) => (
            <g key={idx}>
              <circle cx="43" cy={y} r="6" fill={color} />
              <circle cx="57" cy={y} r="6" fill={color} />
            </g>
          ))}
        </svg>
      );
    case 'babysbreath':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 90 L50 50" stroke="#166534" strokeWidth="2" />
          <path d="M50 70 L30 40" stroke="#166534" strokeWidth="1.5" />
          <path d="M50 65 L70 35" stroke="#166534" strokeWidth="1.5" />
          <circle cx="30" cy="40" r="4" fill="#FFFFFF" />
          <circle cx="70" cy="35" r="4" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
        </svg>
      );
    case 'orchid':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path d="M50 50 Q55 75 50 95" stroke="#15803D" strokeWidth="3" />
          <path d="M50 40 Q20 20 15 40 Q30 55 50 40 Z" fill={color} opacity="0.8" />
          <path d="M50 40 Q80 20 85 40 Q70 55 50 40 Z" fill={color} opacity="0.8" />
          <circle cx="50" cy="40" r="6" fill="#FDE047" />
        </svg>
      );
  }
}
