import React, { useState, useRef } from 'react';
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
  zIndex: number;
}

const YOUTUBE_VIDEO_ID = 'y1cBhJLNNXU'; // beabadoobee - Glue Song

const INITIAL_BOUQUET: FlowerStem[] = [
  // Background Greenery & Fillers
  { id: '1', name: 'Baby’s Breath', color: '#FFFFFF', type: 'babysbreath', angle: -52, scale: 1.1, offsetY: -30, zIndex: 2 },
  { id: '2', name: 'Baby’s Breath', color: '#FFF5F7', type: 'babysbreath', angle: 50, scale: 1.05, offsetY: -25, zIndex: 2 },
  { id: '3', name: 'Lavender', color: '#A855F7', type: 'lavender', angle: -42, scale: 1.1, offsetY: -60, zIndex: 3 },
  { id: '4', name: 'Lavender', color: '#C084FC', type: 'lavender', angle: 40, scale: 1.05, offsetY: -55, zIndex: 3 },
  
  // Midground Flowers
  { id: '5', name: 'Golden Sunflower', color: '#FBBF24', type: 'sunflower', angle: -10, scale: 1.35, offsetY: -100, zIndex: 5 },
  { id: '6', name: 'Hydrangea', color: '#818CF8', type: 'hydrangea', angle: -28, scale: 1.2, offsetY: -75, zIndex: 6 },
  { id: '7', name: 'White Daisy', color: '#FFFFFF', type: 'daisy', angle: 26, scale: 1.15, offsetY: -70, zIndex: 6 },
  { id: '8', name: 'Yellow Tulip', color: '#FACC15', type: 'tulip', angle: -36, scale: 1.1, offsetY: -50, zIndex: 7 },
  { id: '9', name: 'Pastel Tulip', color: '#EC4899', type: 'tulip', angle: 32, scale: 1.15, offsetY: -48, zIndex: 7 },
  
  // Foreground Focal Blooms
  { id: '10', name: 'Blush Peony', color: '#FB7185', type: 'peony', angle: -18, scale: 1.3, offsetY: -65, zIndex: 10 },
  { id: '11', name: 'Soft Peony', color: '#FDA4AF', type: 'peony', angle: 16, scale: 1.25, offsetY: -60, zIndex: 10 },
  { id: '12', name: 'Pink Rose', color: '#F472B6', type: 'rose', angle: -2, scale: 1.3, offsetY: -40, zIndex: 12 },
  { id: '13', name: 'Red Rose', color: '#E11D48', type: 'rose', angle: 0, scale: 1.2, offsetY: -20, zIndex: 14 },
];

const ADDABLE_FLOWERS = [
  { name: 'Rose', color: '#F472B6', type: 'rose' as const },
  { name: 'Peony', color: '#FB7185', type: 'peony' as const },
  { name: 'Sunflower', color: '#FBBF24', type: 'sunflower' as const },
  { name: 'Tulip', color: '#EC4899', type: 'tulip' as const },
  { name: 'Daisy', color: '#FFFFFF', type: 'daisy' as const },
  { name: 'Hydrangea', color: '#818CF8', type: 'hydrangea' as const },
  { name: 'Lavender', color: '#A855F7', type: 'lavender' as const },
  { name: 'Baby’s Breath', color: '#F8FAFC', type: 'babysbreath' as const },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [bouquet, setBouquet] = useState<FlowerStem[]>(INITIAL_BOUQUET);
  const [isBlooming, setIsBlooming] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const startExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#C084FC', '#FFFFFF'],
    });
  };

  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (isPlaying) {
      setIsPlaying(false);
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
    } else {
      setIsPlaying(true);
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
    }
  };

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (isMuted) {
      setIsMuted(false);
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
    } else {
      setIsMuted(true);
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'mute' }), '*');
    }
  };

  const addFlowerToBouquet = (typeObj: typeof ADDABLE_FLOWERS[0]) => {
    const angle = (Math.random() - 0.5) * 85;
    const scale = 0.95 + Math.random() * 0.35;
    const offsetY = -20 - Math.random() * 65;
    const newStem: FlowerStem = {
      id: Date.now().toString() + Math.random(),
      name: typeObj.name,
      color: typeObj.color,
      type: typeObj.type,
      angle,
      scale,
      offsetY,
      zIndex: 8 + Math.floor(Math.random() * 6),
    };
    setBouquet((prev) => [...prev, newStem]);

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.5 },
      colors: [typeObj.color, '#FFFFFF', '#FB7185'],
    });
  };

  const triggerBloom = () => {
    setIsBlooming(true);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FB7185', '#FBBF24', '#C084FC', '#34D399'],
    });
    setTimeout(() => setIsBlooming(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-800 font-sans-body flex flex-col justify-between items-center p-3 sm:p-6 relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      
      {/* Permanent YouTube Audio Stream Frame (Uses enablejsapi for seamless mute/play without restarting) */}
      {hasStarted && (
        <div className="sr-only" aria-hidden="true">
          <iframe
            ref={iframeRef}
            title="beabadoobee Glue Song Player"
            width="1"
            height="1"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
            allow="autoplay"
          />
        </div>
      )}

      {/* Initial Landing Overlay */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border border-rose-200/80 rounded-3xl p-8 sm:p-12 text-center max-w-sm shadow-2xl space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-lg animate-pulse-glow">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <h1 className="font-serif-display text-3xl font-bold text-stone-900 tracking-tight">
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

      {/* Main Stage Container */}
      <main className="w-full max-w-lg mx-auto my-auto flex flex-col items-center justify-center relative z-10 py-2 sm:py-4">
        
        {/* Warm Ambient Radial Glow */}
        <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Realistic Bouquet Stage */}
        <div className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center">
          
          {/* Background Eucalyptus Leaves Framing */}
          <div className="absolute top-2 w-[340px] sm:w-[400px] h-[280px] pointer-events-none z-0 opacity-90">
            <EucalyptusFoliage />
          </div>

          {/* Inner Pink Tissue Paper Wrapper Lining (Behind flowers) */}
          <div className="absolute bottom-6 w-64 sm:w-72 h-72 sm:h-80 z-1 pointer-events-none">
            <svg viewBox="0 0 200 240" fill="none" className="w-full h-full drop-shadow-sm">
              {/* Soft pink tissue paper wings */}
              <path d="M20 90 Q 5 20 50 10 Q 100 25 150 10 Q 195 20 180 90 L 130 230 L 70 230 Z" fill="#FFE2E8" opacity="0.85" />
              <path d="M35 80 Q 20 30 60 20 Q 100 35 140 20 Q 180 30 165 80 L 125 225 L 75 225 Z" fill="#FFF0F3" opacity="0.9" />
            </svg>
          </div>

          {/* Individual Flower Stems in Bouquet */}
          <div className="absolute w-full h-full flex items-center justify-center z-10">
            {bouquet.map((stem) => (
              <div
                key={stem.id}
                onClick={triggerBloom}
                className={`absolute transition-all duration-500 transform cursor-pointer hover:scale-125 ${
                  isBlooming ? 'scale-125 rotate-3' : ''
                }`}
                style={{
                  transform: `rotate(${stem.angle}deg) translateY(${stem.offsetY - 50}px) scale(${stem.scale})`,
                  transformOrigin: 'bottom center',
                  zIndex: stem.zIndex,
                }}
              >
                <RenderFlowerIcon type={stem.type} color={stem.color} size={90} />
              </div>
            ))}
          </div>

          {/* Front Outer Kraft Wrapping Paper & Satin Ribbon (Covers bottom of stems) */}
          <div className="absolute bottom-0 w-64 sm:w-72 h-64 sm:h-72 z-20 pointer-events-none">
            <svg viewBox="0 0 200 220" fill="none" className="w-full h-full filter drop-shadow-xl">
              {/* Kraft Paper Base Cone */}
              <defs>
                <linearGradient id="kraftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5E3CE" />
                  <stop offset="50%" stopColor="#E6CFB3" />
                  <stop offset="100%" stopColor="#D4B896" />
                </linearGradient>
                <linearGradient id="kraftFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAD3B9" />
                  <stop offset="100%" stopColor="#C9A882" />
                </linearGradient>
                <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="50%" stopColor="#FB7185" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
              </defs>

              {/* Outer Kraft Paper Wings Wrapping Center */}
              <path d="M10 50 L75 210 Q 100 220 125 210 L190 50 Q 135 75 100 70 Q 65 75 10 50 Z" fill="url(#kraftGrad)" />

              {/* Left Diagonal Fold Overlap */}
              <path d="M10 50 L100 130 L75 210 Q 50 180 10 50 Z" fill="url(#kraftFoldGrad)" opacity="0.9" />

              {/* Right Diagonal Fold Overlap */}
              <path d="M190 50 L100 130 L125 210 Q 150 180 190 50 Z" fill="url(#kraftFoldGrad)" opacity="0.75" />

              {/* Paper Fold Crease Line */}
              <path d="M100 70 L100 215" stroke="#B8956F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

              {/* Cascading Satin Ribbon Tails */}
              <path d="M92 135 Q 75 170 65 210 Q 75 212 85 208 Q 92 175 96 138 Z" fill="#E11D48" />
              <path d="M108 135 Q 125 170 138 210 Q 128 212 118 208 Q 108 175 104 138 Z" fill="#F43F5E" />

              {/* Satin Ribbon Knot & Loops */}
              <ellipse cx="78" cy="133" rx="18" ry="10" fill="url(#ribbonGrad)" transform="rotate(-15 78 133)" />
              <ellipse cx="122" cy="133" rx="18" ry="10" fill="url(#ribbonGrad)" transform="rotate(15 122 133)" />
              <circle cx="100" cy="134" r="9" fill="#BE123C" />
              <circle cx="100" cy="134" r="7" fill="url(#ribbonGrad)" />
            </svg>
          </div>

          {/* Interactive Tag ("for Janna 💖") hanging on the ribbon */}
          <div
            onClick={triggerBloom}
            className="absolute bottom-6 z-30 flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="px-4 py-1.5 bg-[#FFFDF9] border border-amber-200/90 rounded-lg shadow-md flex items-center gap-1.5 transform -rotate-2">
              <span className="font-handwriting text-xl text-rose-800 font-bold tracking-wide">
                for Janna 💖
              </span>
            </div>
          </div>


        </div>

        {/* Interactive Toolbar: Add Flowers */}
        <div className="mt-2 flex flex-col items-center gap-2.5 w-full">
          <div className="flex items-center justify-center flex-wrap gap-1.5 max-w-md">
            {ADDABLE_FLOWERS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => addFlowerToBouquet(item)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-rose-50 border border-rose-200 shadow-2xs text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>+ {item.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 mt-0.5">
            <button
              onClick={triggerBloom}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bloom Bouquet</span>
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

      {/* Floating Music Player Bar */}
      <footer className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-md border border-rose-200/80 shadow-lg rounded-2xl p-2.5 flex items-center justify-between gap-3 relative z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-serif-display font-bold text-xs text-stone-900 truncate">
              Glue Song
            </p>
            <p className="text-[10px] text-rose-600 font-medium truncate">
              beabadoobee • for Janna 💖
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 text-stone-500 hover:text-rose-600 rounded-full transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform active:scale-90"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />}
          </button>
        </div>
      </footer>

    </div>
  );
}

// Background Foliage Component
function EucalyptusFoliage() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      {/* Left Eucalyptus Stem */}
      <g opacity="0.85">
        <path d="M200 280 Q 120 180 50 60" stroke="#4B634B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="60" r="14" fill="#789278" opacity="0.9" />
        <circle cx="80" cy="100" r="16" fill="#8FA98F" opacity="0.85" />
        <circle cx="110" cy="140" r="18" fill="#6A856A" opacity="0.9" />
        <circle cx="140" cy="180" r="20" fill="#8FA98F" opacity="0.85" />
        <circle cx="170" cy="220" r="21" fill="#587358" opacity="0.9" />
      </g>
      {/* Right Eucalyptus Stem */}
      <g opacity="0.85">
        <path d="M200 280 Q 280 180 350 60" stroke="#4B634B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="350" cy="60" r="14" fill="#789278" opacity="0.9" />
        <circle cx="320" cy="100" r="16" fill="#8FA98F" opacity="0.85" />
        <circle cx="290" cy="140" r="18" fill="#6A856A" opacity="0.9" />
        <circle cx="260" cy="180" r="20" fill="#8FA98F" opacity="0.85" />
        <circle cx="230" cy="220" r="21" fill="#587358" opacity="0.9" />
      </g>
    </svg>
  );
}

// Render SVG Flower Component for SVG drawings with rich depth and details
function RenderFlowerIcon({ type, color, size = 80 }: { type: string; color: string; size?: number }) {
  switch (type) {
    case 'rose':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          {/* Stem */}
          <path d="M50 55 Q52 80 50 100" stroke="#1E5631" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 75 Q35 70 30 65" stroke="#1E5631" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 75 Q30 65 30 65 Q42 60 50 75 Z" fill="#2D6A4F" />
          {/* Outer Petals */}
          <circle cx="50" cy="40" r="32" fill={color} opacity="0.35" />
          <path d="M22 38 C20 18 40 12 50 20 C60 12 80 18 78 38 C75 58 50 62 50 62 C50 62 25 58 22 38 Z" fill={color} opacity="0.75" />
          <circle cx="50" cy="38" r="22" fill={color} />
          {/* Rose Inner Spiral Layers */}
          <path d="M36 34 C36 24 64 24 64 34 C64 48 38 48 40 32 C42 22 58 24 56 34" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none" />
          <circle cx="50" cy="36" r="8" fill="#FFF" opacity="0.25" />
        </svg>
      );

    case 'peony':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 52 Q48 78 50 100" stroke="#1E5631" strokeWidth="4" />
          {/* Fluffy Layered Petals */}
          <circle cx="50" cy="38" r="34" fill={color} opacity="0.4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle
              key={i}
              cx={50 + 12 * Math.cos((angle * Math.PI) / 180)}
              cy={38 + 12 * Math.sin((angle * Math.PI) / 180)}
              r="16"
              fill={color}
              opacity="0.85"
            />
          ))}
          <circle cx="50" cy="38" r="18" fill={color} />
          <circle cx="50" cy="38" r="12" fill="#FFFFFF" opacity="0.5" />
          <circle cx="50" cy="38" r="6" fill="#FDE047" />
        </svg>
      );

    case 'sunflower':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 50 L50 100" stroke="#1E5631" strokeWidth="4" />
          {/* Outer Golden Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <ellipse key={i} cx="50" cy="18" rx="6" ry="20" fill={color} transform={`rotate(${angle} 50 45)`} />
          ))}
          {/* Inner Petal Ring */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
            <ellipse key={i} cx="50" cy="22" rx="5" ry="16" fill="#F59E0B" transform={`rotate(${angle} 50 45)`} />
          ))}
          {/* Seed Center */}
          <circle cx="50" cy="45" r="16" fill="#54260D" />
          <circle cx="50" cy="45" r="12" fill="#78350F" stroke="#92400E" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'tulip':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 50 Q52 78 50 100" stroke="#1E5631" strokeWidth="4" />
          <path d="M28 48 Q18 15 50 15 Q82 15 72 48 Q50 68 28 48 Z" fill={color} />
          <path d="M38 48 Q28 20 50 20 Q72 20 62 48 Q50 62 38 48 Z" fill="#FFFFFF" opacity="0.2" />
          <path d="M42 48 Q35 25 50 25 Q65 25 58 48 Z" fill={color} />
        </svg>
      );

    case 'daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 50 L50 100" stroke="#1E5631" strokeWidth="3" />
          {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((angle, i) => (
            <ellipse key={i} cx="50" cy="20" rx="4.5" ry="18" fill="#FFFFFF" transform={`rotate(${angle} 50 45)`} />
          ))}
          <circle cx="50" cy="45" r="11" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
          <circle cx="50" cy="45" r="8" fill="#EAB308" opacity="0.4" />
        </svg>
      );

    case 'hydrangea':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 55 L50 100" stroke="#1E5631" strokeWidth="4" />
          <circle cx="50" cy="38" r="30" fill={color} opacity="0.85" />
          {/* Dense cluster of small florets */}
          {[-12, 0, 12].map((x, idx) =>
            [-12, 0, 12].map((y, idy) => (
              <g key={`${idx}-${idy}`} transform={`translate(${50 + x}, ${38 + y})`}>
                <circle cx="0" cy="0" r="6" fill="#EEF2FF" opacity="0.9" />
                <circle cx="0" cy="0" r="2" fill="#818CF8" />
              </g>
            ))
          )}
        </svg>
      );

    case 'lavender':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 10 L50 100" stroke="#1E5631" strokeWidth="3" />
          {[20, 32, 44, 56, 68].map((y, idx) => (
            <g key={idx}>
              <ellipse cx="42" cy={y} rx="7" ry="5" fill={color} transform={`rotate(-15 42 ${y})`} />
              <ellipse cx="58" cy={y} rx="7" ry="5" fill={color} transform={`rotate(15 58 ${y})`} />
              <circle cx="50" cy={y - 2} r="4" fill="#C084FC" />
            </g>
          ))}
        </svg>
      );

    case 'babysbreath':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-sm">
          <path d="M50 95 L50 45" stroke="#1E5631" strokeWidth="2" />
          <path d="M50 75 L25 35" stroke="#1E5631" strokeWidth="1.5" />
          <path d="M50 65 L75 30" stroke="#1E5631" strokeWidth="1.5" />
          <path d="M25 35 L12 20" stroke="#1E5631" strokeWidth="1.2" />
          <path d="M25 35 L35 18" stroke="#1E5631" strokeWidth="1.2" />
          <path d="M75 30 L65 15" stroke="#1E5631" strokeWidth="1.2" />
          <path d="M75 30 L88 18" stroke="#1E5631" strokeWidth="1.2" />
          {/* Tiny White Florets */}
          {[[12, 20], [35, 18], [65, 15], [88, 18], [50, 45], [25, 35], [75, 30], [50, 25]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#FFFFFF" />
              <circle cx={x} cy={y} r="1.5" fill="#FDE047" />
            </g>
          ))}
        </svg>
      );

    case 'orchid':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
          <path d="M50 50 Q55 78 50 100" stroke="#1E5631" strokeWidth="3" />
          <path d="M50 40 Q20 20 15 40 Q30 55 50 40 Z" fill={color} opacity="0.85" />
          <path d="M50 40 Q80 20 85 40 Q70 55 50 40 Z" fill={color} opacity="0.85" />
          <circle cx="50" cy="38" r="8" fill="#FDE047" />
          <circle cx="50" cy="44" r="6" fill="#E11D48" />
        </svg>
      );
  }
}
