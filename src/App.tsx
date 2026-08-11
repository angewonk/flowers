import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, RefreshCw, Music, Cloud } from 'lucide-react';
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

// Initial bouquet arranged tightly & deep inside the wrapper
const INITIAL_BOUQUET: FlowerStem[] = [
  // Background Fillers & Foliage
  { id: '1', name: 'Baby’s Breath', color: '#FFFFFF', type: 'babysbreath', angle: -42, scale: 1.1, offsetY: -15, zIndex: 2 },
  { id: '2', name: 'Baby’s Breath', color: '#E0F2FE', type: 'babysbreath', angle: 40, scale: 1.05, offsetY: -10, zIndex: 2 },
  { id: '3', name: 'Lavender', color: '#A855F7', type: 'lavender', angle: -35, scale: 1.1, offsetY: -40, zIndex: 3 },
  { id: '4', name: 'Lavender', color: '#C084FC', type: 'lavender', angle: 32, scale: 1.05, offsetY: -35, zIndex: 3 },
  
  // Midground Flowers
  { id: '5', name: 'Golden Sunflower', color: '#FBBF24', type: 'sunflower', angle: -8, scale: 1.3, offsetY: -75, zIndex: 5 },
  { id: '6', name: 'Hydrangea', color: '#7DD3FC', type: 'hydrangea', angle: -24, scale: 1.2, offsetY: -55, zIndex: 6 },
  { id: '7', name: 'White Daisy', color: '#FFFFFF', type: 'daisy', angle: 22, scale: 1.15, offsetY: -50, zIndex: 6 },
  { id: '8', name: 'Yellow Tulip', color: '#FACC15', type: 'tulip', angle: -28, scale: 1.1, offsetY: -35, zIndex: 7 },
  { id: '9', name: 'Pastel Tulip', color: '#F472B6', type: 'tulip', angle: 26, scale: 1.15, offsetY: -32, zIndex: 7 },
  
  // Foreground Focal Blooms
  { id: '10', name: 'Blush Peony', color: '#FB7185', type: 'peony', angle: -14, scale: 1.25, offsetY: -45, zIndex: 10 },
  { id: '11', name: 'Soft Peony', color: '#FDA4AF', type: 'peony', angle: 12, scale: 1.2, offsetY: -40, zIndex: 10 },
  { id: '12', name: 'Pink Rose', color: '#F472B6', type: 'rose', angle: -2, scale: 1.25, offsetY: -25, zIndex: 12 },
  { id: '13', name: 'Red Rose', color: '#E11D48', type: 'rose', angle: 0, scale: 1.15, offsetY: -5, zIndex: 14 },
];

const ADDABLE_FLOWERS = [
  { name: 'Rose', color: '#F472B6', type: 'rose' as const },
  { name: 'Peony', color: '#FB7185', type: 'peony' as const },
  { name: 'Sunflower', color: '#FBBF24', type: 'sunflower' as const },
  { name: 'Tulip', color: '#38BDF8', type: 'tulip' as const },
  { name: 'Daisy', color: '#FFFFFF', type: 'daisy' as const },
  { name: 'Hydrangea', color: '#7DD3FC', type: 'hydrangea' as const },
  { name: 'Lavender', color: '#A855F7', type: 'lavender' as const },
  { name: 'Baby’s Breath', color: '#F8FAFC', type: 'babysbreath' as const },
];

// Cinnamoroll Palette Confetti
const CINNAMOROLL_COLORS = ['#38BDF8', '#7DD3FC', '#BAE6FD', '#F472B6', '#FCE7F3', '#FFFFFF', '#FBBF24'];

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [bouquet, setBouquet] = useState<FlowerStem[]>(INITIAL_BOUQUET);
  const [isBlooming, setIsBlooming] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sipChuckie = () => {
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#54260D', '#78350F', '#B45309', '#F59E0B', '#F472B6', '#FFFFFF'],
      shapes: ['square', 'circle'],
    });
  };

  const startExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: CINNAMOROLL_COLORS,
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
    const angle = (Math.random() - 0.5) * 70;
    const scale = 0.95 + Math.random() * 0.3;
    const offsetY = -10 - Math.random() * 50;
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
      colors: [typeObj.color, '#FFFFFF', '#38BDF8'],
    });
  };

  const triggerBloom = () => {
    setIsBlooming(true);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.5 },
      colors: CINNAMOROLL_COLORS,
    });
    setTimeout(() => setIsBlooming(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F2FE] via-[#F0F7FF] to-[#FFFDF9] text-sky-950 font-sans-body flex flex-col justify-between items-center p-3 sm:p-6 relative overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
      
      {/* Floating Decorative Clouds Background */}
      <BackgroundClouds />

      {/* Permanent YouTube Audio Stream Frame */}
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

      {/* Initial Cinnamoroll Landing Overlay */}
      {!hasStarted && (
        <div className="fixed inset-0 z-50 bg-sky-900/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border-2 border-sky-200 rounded-3xl p-8 sm:p-10 text-center max-w-sm shadow-2xl space-y-5 relative overflow-hidden">
            
            {/* Cute Cinnamoroll Ears Visual Header */}
            <div className="flex items-center justify-center gap-1.5 text-sky-400">
              <Cloud className="w-6 h-6 fill-sky-100 text-sky-400" />
              <Sparkles className="w-5 h-5 text-pink-400" />
              <Cloud className="w-6 h-6 fill-sky-100 text-sky-400" />
            </div>

            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-400 text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse-glow">
              <CinnamorollFaceIcon />
            </div>

            <div>
              <h1 className="font-serif-display text-3xl font-extrabold text-sky-900 tracking-tight">
                flowers for janna
              </h1>
              <p className="text-xs text-sky-600 mt-1 font-medium">
                a Cinnamoroll bouquet for you ☁️💙
              </p>
            </div>

            <button
              onClick={startExperience}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-serif-display text-lg font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/60"
            >
              <Sparkles className="w-5 h-5 text-sky-100" />
              <span>open bouquet</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Stage Container */}
      <main className="w-full max-w-lg mx-auto my-auto flex flex-col items-center justify-center relative z-10 py-1 sm:py-3">
        
        {/* Soft Fluffy Cloud Ambient Glow */}
        <div className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] bg-sky-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Realistic Cinnamoroll Bouquet Stage */}
        <div className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center">
          
          {/* Background Eucalyptus Foliage Framing */}
          <div className="absolute top-2 w-[340px] sm:w-[400px] h-[280px] pointer-events-none z-0 opacity-80">
            <EucalyptusFoliage />
          </div>

          {/* Inner Tissue Paper Wrapper Lining (Deep inside wrapper to cradle stems) */}
          <div className="absolute bottom-10 w-64 sm:w-72 h-80 sm:h-88 z-1 pointer-events-none">
            <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-sm">
              {/* Soft Cinnamoroll White & Pastel Pink Tissue Paper Wings */}
              <path d="M15 100 Q 0 20 45 10 Q 100 25 155 10 Q 200 20 185 100 L 135 255 L 65 255 Z" fill="#F0F7FF" opacity="0.95" />
              <path d="M30 90 Q 15 30 55 20 Q 100 35 145 20 Q 185 30 170 90 L 130 250 L 70 250 Z" fill="#FCE7F3" opacity="0.9" />
            </svg>
          </div>

          {/* Bundle of Gathered Green Stems Extending Down into the Wrapper */}
          <div className="absolute bottom-12 w-32 h-44 z-2 pointer-events-none opacity-90">
            <svg viewBox="0 0 100 160" fill="none" className="w-full h-full">
              {/* Real stems converging together into the wrapping tie point */}
              <path d="M20 10 L48 150" stroke="#166534" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M30 15 L49 150" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
              <path d="M42 5 L50 150" stroke="#1E5631" strokeWidth="5" strokeLinecap="round" />
              <path d="M58 5 L50 150" stroke="#1E5631" strokeWidth="5" strokeLinecap="round" />
              <path d="M70 15 L51 150" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
              <path d="M80 10 L52 150" stroke="#166534" strokeWidth="4.5" strokeLinecap="round" />
              {/* Natural leaves sticking out inside wrapper */}
              <path d="M35 50 Q20 40 22 30 Q38 32 38 50 Z" fill="#2D6A4F" />
              <path d="M65 50 Q80 40 78 30 Q62 32 62 50 Z" fill="#2D6A4F" />
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
                  transform: `rotate(${stem.angle}deg) translateY(${stem.offsetY - 30}px) scale(${stem.scale})`,
                  transformOrigin: 'bottom center',
                  zIndex: stem.zIndex,
                }}
              >
                <RenderFlowerIcon type={stem.type} color={stem.color} size={90} />
              </div>
            ))}
          </div>

          {/* Front Cinnamoroll Sky Blue Paper Wrapping & Ribbon (Seamlessly covers stem bottom) */}
          <div className="absolute bottom-0 w-68 sm:w-76 h-68 sm:h-76 z-20 pointer-events-none">
            <svg viewBox="0 0 200 230" fill="none" className="w-full h-full filter drop-shadow-xl">
              <defs>
                <linearGradient id="cinnaWrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="50%" stopColor="#7DD3FC" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <linearGradient id="cinnaWrapFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#3898EC" />
                </linearGradient>
                <linearGradient id="whiteRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F0F7FF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
              </defs>

              {/* Main Outer Cinnamoroll Sky-Blue Paper Cone */}
              <path d="M8 45 L75 215 Q 100 225 125 215 L192 45 Q 140 70 100 65 Q 60 70 8 45 Z" fill="url(#cinnaWrapGrad)" />

              {/* Scalloped Cloud White Trim along the paper top opening */}
              <path d="M10 46 Q 25 58 40 48 Q 55 58 70 49 Q 85 58 100 50 Q 115 58 130 49 Q 145 58 160 48 Q 175 58 190 46" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />

              {/* Left Diagonal Fold Overlap */}
              <path d="M8 45 L100 135 L75 215 Q 45 185 8 45 Z" fill="url(#cinnaWrapFoldGrad)" opacity="0.85" />

              {/* Right Diagonal Fold Overlap */}
              <path d="M192 45 L100 135 L125 215 Q 155 185 192 45 Z" fill="url(#cinnaWrapFoldGrad)" opacity="0.7" />

              {/* Dotted Cloud Seam Line */}
              <path d="M100 65 L100 220" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

              {/* White Satin Ribbon Tails */}
              <path d="M92 138 Q 75 175 62 215 Q 72 217 83 213 Q 92 180 96 142 Z" fill="#F8FAFC" />
              <path d="M108 138 Q 125 175 138 215 Q 128 217 117 213 Q 108 180 104 142 Z" fill="#E2E8F0" />

              {/* Satin White Ribbon Bow Knot */}
              <ellipse cx="76" cy="136" rx="20" ry="11" fill="url(#whiteRibbonGrad)" transform="rotate(-15 76 136)" stroke="#BAE6FD" strokeWidth="1" />
              <ellipse cx="124" cy="136" rx="20" ry="11" fill="url(#whiteRibbonGrad)" transform="rotate(15 124 136)" stroke="#BAE6FD" strokeWidth="1" />
              <circle cx="100" cy="137" r="10" fill="#38BDF8" />
              <circle cx="100" cy="137" r="7.5" fill="url(#whiteRibbonGrad)" />
            </svg>
          </div>

          {/* Interactive Tag ("for Janna 💖") with Cinnamoroll ears aesthetic */}
          <div
            onClick={triggerBloom}
            className="absolute bottom-5 z-30 flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="px-4 py-1.5 bg-white border-2 border-sky-200 rounded-2xl shadow-lg flex items-center gap-1.5 transform -rotate-1">
              <Cloud className="w-4 h-4 fill-sky-100 text-sky-400 shrink-0" />
              <span className="font-handwriting text-xl text-sky-900 font-bold tracking-wide">
                for Janna 💖
              </span>
              <Cloud className="w-4 h-4 fill-sky-100 text-sky-400 shrink-0" />
            </div>
          </div>

          {/* Chuckie Chocolate Milk Drink (Philippines Favorite Treat) Tucked Beside Bouquet */}
          <div
            onClick={sipChuckie}
            className="absolute bottom-4 right-2 sm:right-8 z-30 flex flex-col items-center cursor-pointer group transition-transform hover:scale-110 active:scale-95"
            title="Chuckie Chocolate Milk"
          >
            {/* Detailed Nestlé Chuckie Carton Icon */}
            <div className="w-16 sm:w-18 h-24 sm:h-28 drop-shadow-xl filter transform rotate-6">
              <ChuckieCartonIcon />
            </div>
          </div>

        </div>

        {/* Interactive Toolbar: Add Flowers */}
        <div className="mt-1 flex flex-col items-center gap-2.5 w-full">
          <div className="flex items-center justify-center flex-wrap gap-1.5 max-w-md">
            {ADDABLE_FLOWERS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => addFlowerToBouquet(item)}
                className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-sky-50 border border-sky-200 shadow-2xs text-xs font-semibold text-sky-900 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>+ {item.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 mt-0.5">
            <button
              onClick={triggerBloom}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer border border-white/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bloom Bouquet</span>
            </button>

            <button
              onClick={() => setBouquet(INITIAL_BOUQUET)}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full bg-white border border-sky-200 text-sky-600 hover:text-sky-900 hover:bg-sky-50 text-xs font-semibold transition-colors cursor-pointer"
              title="Reset Bouquet"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* Floating Cinnamoroll Music Player Bar */}
      <footer className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-md border-2 border-sky-200 shadow-xl rounded-2xl p-2.5 flex items-center justify-between gap-3 relative z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-serif-display font-bold text-xs text-sky-950 truncate">
              Glue Song
            </p>
            <p className="text-[10px] text-sky-600 font-semibold truncate">
              beabadoobee • for Janna 💖
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 text-sky-400 hover:text-sky-700 rounded-full transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-sky-400 hover:bg-sky-500 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform active:scale-90"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />}
          </button>
        </div>
      </footer>

    </div>
  );
}

// Background Floating Clouds (Cinnamoroll Aesthetic)
function BackgroundClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      {/* Top Left Cloud */}
      <div className="absolute top-6 -left-8 text-sky-200/80 animate-float-slow">
        <svg width="160" height="90" viewBox="0 0 100 60" fill="currentColor">
          <path d="M20 45 Q10 45 10 35 Q10 25 25 22 Q30 10 45 12 Q60 5 70 20 Q85 18 88 32 Q95 38 85 45 Z" />
        </svg>
      </div>
      {/* Top Right Cloud */}
      <div className="absolute top-12 -right-10 text-sky-200/70 animate-float-reverse">
        <svg width="180" height="100" viewBox="0 0 100 60" fill="currentColor">
          <path d="M20 45 Q10 45 10 35 Q10 25 25 22 Q30 10 45 12 Q60 5 70 20 Q85 18 88 32 Q95 38 85 45 Z" />
        </svg>
      </div>
      {/* Bottom Floating Cloud */}
      <div className="absolute bottom-20 left-1/4 text-sky-100/90 animate-float-slow">
        <svg width="140" height="80" viewBox="0 0 100 60" fill="currentColor">
          <path d="M20 45 Q10 45 10 35 Q10 25 25 22 Q30 10 45 12 Q60 5 70 20 Q85 18 88 32 Q95 38 85 45 Z" />
        </svg>
      </div>
    </div>
  );
}

// Cinnamoroll Puppy Face Icon SVG
function CinnamorollFaceIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
      {/* Long Flying Ears */}
      <ellipse cx="15" cy="45" rx="14" ry="8" fill="#FFFFFF" transform="rotate(-20 15 45)" stroke="#BAE6FD" strokeWidth="2" />
      <ellipse cx="85" cy="45" rx="14" ry="8" fill="#FFFFFF" transform="rotate(20 85 45)" stroke="#BAE6FD" strokeWidth="2" />
      {/* Fluffy Head */}
      <circle cx="50" cy="50" r="32" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
      {/* Blue Eyes */}
      <circle cx="38" cy="48" r="4" fill="#0284C7" />
      <circle cx="62" cy="48" r="4" fill="#0284C7" />
      {/* Pink Cheeks */}
      <circle cx="30" cy="56" r="5" fill="#F472B6" opacity="0.6" />
      <circle cx="70" cy="56" r="5" fill="#F472B6" opacity="0.6" />
      {/* Cute Mouth */}
      <path d="M46 54 Q50 58 54 54" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Background Foliage Component
function EucalyptusFoliage() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <g opacity="0.8">
        <path d="M200 280 Q 120 180 50 60" stroke="#3A5A40" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="60" r="14" fill="#588157" opacity="0.9" />
        <circle cx="80" cy="100" r="16" fill="#A3B18A" opacity="0.85" />
        <circle cx="110" cy="140" r="18" fill="#3A5A40" opacity="0.9" />
        <circle cx="140" cy="180" r="20" fill="#A3B18A" opacity="0.85" />
        <circle cx="170" cy="220" r="21" fill="#3A5A40" opacity="0.9" />
      </g>
      <g opacity="0.8">
        <path d="M200 280 Q 280 180 350 60" stroke="#3A5A40" strokeWidth="3" strokeLinecap="round" />
        <circle cx="350" cy="60" r="14" fill="#588157" opacity="0.9" />
        <circle cx="320" cy="100" r="16" fill="#A3B18A" opacity="0.85" />
        <circle cx="290" cy="140" r="18" fill="#3A5A40" opacity="0.9" />
        <circle cx="260" cy="180" r="20" fill="#A3B18A" opacity="0.85" />
        <circle cx="230" cy="220" r="21" fill="#3A5A40" opacity="0.9" />
      </g>
    </svg>
  );
}

// Render SVG Flower Component with LONG extended stems (viewBox 0 0 100 160)
function RenderFlowerIcon({ type, color, size = 90 }: { type: string; color: string; size?: number }) {
  // Height is 160 so stem extends deep down into the wrapping paper cone!
  const height = size * 1.5;

  switch (type) {
    case 'rose':
      return (
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          {/* Long Stem */}
          <path d="M50 55 Q52 110 50 160" stroke="#1E5631" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M50 75 Q35 70 30 65" stroke="#1E5631" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 75 Q30 65 30 65 Q42 60 50 75 Z" fill="#2D6A4F" />
          <path d="M50 105 Q65 100 70 95" stroke="#1E5631" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 105 Q70 95 70 95 Q58 90 50 105 Z" fill="#2D6A4F" />
          {/* Outer Petals */}
          <circle cx="50" cy="40" r="32" fill={color} opacity="0.35" />
          <path d="M22 38 C20 18 40 12 50 20 C60 12 80 18 78 38 C75 58 50 62 50 62 C50 62 25 58 22 38 Z" fill={color} opacity="0.75" />
          <circle cx="50" cy="38" r="22" fill={color} />
          {/* Inner Spiral */}
          <path d="M36 34 C36 24 64 24 64 34 C64 48 38 48 40 32 C42 22 58 24 56 34" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none" />
          <circle cx="50" cy="36" r="8" fill="#FFF" opacity="0.25" />
        </svg>
      );

    case 'peony':
      return (
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 52 Q48 110 50 160" stroke="#1E5631" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M50 85 Q32 75 35 65 Q50 70 50 85 Z" fill="#2D6A4F" />
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
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 50 L50 160" stroke="#1E5631" strokeWidth="5" strokeLinecap="round" />
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
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 50 Q52 110 50 160" stroke="#1E5631" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M28 48 Q18 15 50 15 Q82 15 72 48 Q50 68 28 48 Z" fill={color} />
          <path d="M38 48 Q28 20 50 20 Q72 20 62 48 Q50 62 38 48 Z" fill="#FFFFFF" opacity="0.2" />
          <path d="M42 48 Q35 25 50 25 Q65 25 58 48 Z" fill={color} />
        </svg>
      );

    case 'daisy':
      return (
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 50 L50 160" stroke="#1E5631" strokeWidth="4" strokeLinecap="round" />
          {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((angle, i) => (
            <ellipse key={i} cx="50" cy="20" rx="4.5" ry="18" fill="#FFFFFF" transform={`rotate(${angle} 50 45)`} />
          ))}
          <circle cx="50" cy="45" r="11" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
          <circle cx="50" cy="45" r="8" fill="#EAB308" opacity="0.4" />
        </svg>
      );

    case 'hydrangea':
      return (
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 55 L50 160" stroke="#1E5631" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="50" cy="38" r="30" fill={color} opacity="0.85" />
          {[-12, 0, 12].map((x, idx) =>
            [-12, 0, 12].map((y, idy) => (
              <g key={`${idx}-${idy}`} transform={`translate(${50 + x}, ${38 + y})`}>
                <circle cx="0" cy="0" r="6" fill="#EEF2FF" opacity="0.9" />
                <circle cx="0" cy="0" r="2" fill="#38BDF8" />
              </g>
            ))
          )}
        </svg>
      );

    case 'lavender':
      return (
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 10 L50 160" stroke="#1E5631" strokeWidth="3.5" strokeLinecap="round" />
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
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-sm">
          <path d="M50 160 L50 45" stroke="#1E5631" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 75 L25 35" stroke="#1E5631" strokeWidth="2" />
          <path d="M50 65 L75 30" stroke="#1E5631" strokeWidth="2" />
          <path d="M25 35 L12 20" stroke="#1E5631" strokeWidth="1.5" />
          <path d="M25 35 L35 18" stroke="#1E5631" strokeWidth="1.5" />
          <path d="M75 30 L65 15" stroke="#1E5631" strokeWidth="1.5" />
          <path d="M75 30 L88 18" stroke="#1E5631" strokeWidth="1.5" />
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
        <svg width={size} height={height} viewBox="0 0 100 160" fill="none" className="drop-shadow-md">
          <path d="M50 50 Q55 110 50 160" stroke="#1E5631" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 40 Q20 20 15 40 Q30 55 50 40 Z" fill={color} opacity="0.85" />
          <path d="M50 40 Q80 20 85 40 Q70 55 50 40 Z" fill={color} opacity="0.85" />
          <circle cx="50" cy="38" r="8" fill="#FDE047" />
          <circle cx="50" cy="44" r="6" fill="#E11D48" />
        </svg>
      );
  }
}

// Chuckie Chocolate Milk Drink SVG Icon (Official Nestlé Philippines Design)
function ChuckieCartonIcon() {
  return (
    <svg viewBox="0 0 120 200" fill="none" className="w-full h-full filter drop-shadow-xl">
      <defs>
        {/* Chocolate Wave Gradient */}
        <linearGradient id="chocoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#54260D" />
          <stop offset="100%" stopColor="#2E1305" />
        </linearGradient>
        {/* Yellow Front Box Gradient */}
        <linearGradient id="yellowFront" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        {/* Side Panel Gradient */}
        <linearGradient id="yellowSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>
      </defs>

      {/* Flexible White & Red Striped Straw Sticking Out */}
      <path d="M78 28 L72 8 L58 2 L45 8" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M78 28 L72 8 L58 2 L45 8" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="3.5 3.5" fill="none" />

      {/* 3D Box Perspective - Left Side Panel */}
      <polygon points="12,38 35,28 35,185 12,175" fill="url(#yellowSide)" />
      {/* Side Panel Nutrition Lines Mockup */}
      <line x1="16" y1="50" x2="30" y2="44" stroke="#FEF08A" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="56" x2="30" y2="50" stroke="#FEF08A" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="62" x2="30" y2="56" stroke="#FEF08A" strokeWidth="1" opacity="0.6" />

      {/* 3D Box Top Surface */}
      <polygon points="35,28 108,28 85,38 12,38" fill="#FEF08A" />

      {/* Main Front Yellow Panel */}
      <rect x="35" y="28" width="73" height="157" fill="url(#yellowFront)" rx="1" />

      {/* Red Top Header Banner ("Now with Iron & Zinc") */}
      <path d="M35 28 L108 28 L108 48 Q70 52 35 48 Z" fill="#DC2626" />
      <text x="71" y="38" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="5.5">
        Now with <tspan fill="#FDE047">IRON &amp; ZINC</tspan>
      </text>

      {/* Nestlé Logo */}
      <text x="71" y="55" textAnchor="middle" fill="#0284C7" fontFamily="sans-serif" fontWeight="800" fontSize="6.5" italic="true">
        Nestlé®
      </text>

      {/* CHUCKIE Main Logo (White bold text with dark brown outline) */}
      <g transform="translate(71, 72)">
        {/* Dark Brown Shadow / Outline */}
        <text x="1" y="1" textAnchor="middle" fill="#451A03" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.5">
          CHUCKIE
        </text>
        {/* Main White Front Text */}
        <text x="0" y="0" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.5">
          CHUCKIE
        </text>
      </g>

      {/* Subtitle "My chocolatey Buddy..." */}
      <text x="71" y="80" textAnchor="middle" fill="#78350F" fontFamily="sans-serif" fontWeight="700" fontSize="4.5" fontStyle="italic">
        My chocolatey Buddy™
      </text>

      {/* Iconic Chuckie Cow Mascot (Jumping Rope Pose) */}
      <g transform="translate(71, 105)">
        {/* Red Jump Rope Curve */}
        <path d="M-22 15 Q 0 -22 22 15" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* White Cow Head */}
        <ellipse cx="0" cy="-6" rx="14" ry="11" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1" />
        
        {/* Black Hair Tuft on Top */}
        <path d="M-4 -16 C-2 -22 4 -22 6 -16 C2 -15 0 -15 -4 -16 Z" fill="#0F172A" />
        
        {/* Ears */}
        <ellipse cx="-13" cy="-10" rx="4" ry="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="0.8" transform="rotate(-20 -13 -10)" />
        <ellipse cx="13" cy="-10" rx="4" ry="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="0.8" transform="rotate(20 13 -10)" />
        
        {/* Cute Eyes & Nose */}
        <circle cx="-5" cy="-7" r="2" fill="#0284C7" />
        <circle cx="5" cy="-7" r="2" fill="#0284C7" />
        <ellipse cx="0" cy="-3" rx="4" ry="2.5" fill="#E2E8F0" />
        
        {/* Happy Open Mouth */}
        <path d="M-4 -2 Q0 3 4 -2" fill="#DC2626" />

        {/* Mascot Blue Pants / Shirt */}
        <path d="M-8 4 L8 4 L10 18 L-10 18 Z" fill="#2563EB" />
        {/* Red Handles */}
        <rect x="-18" y="10" width="4" height="8" rx="1" fill="#DC2626" />
        <rect x="14" y="10" width="4" height="8" rx="1" fill="#DC2626" />
      </g>

      {/* OPTI-GROW Round Badge */}
      <circle cx="71" cy="132" r="10" fill="#DC2626" stroke="#FDE047" strokeWidth="1.5" />
      <text x="71" y="130" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="3.5">
        OPTI-GROW
      </text>
      <text x="71" y="134" textAnchor="middle" fill="#FDE047" fontFamily="sans-serif" fontWeight="700" fontSize="2.8">
        Calci-N®
      </text>

      {/* Rich Dark Chocolate Wave Splash Base */}
      <path d="M35 142 Q 52 132 71 142 Q 90 152 108 142 L108 185 L35 185 Z" fill="url(#chocoGrad)" />
      
      {/* Milk Splash Droplets */}
      <circle cx="50" cy="148" r="1.5" fill="#FFFFFF" />
      <circle cx="92" cy="146" r="2" fill="#FFFFFF" />
      <circle cx="68" cy="150" r="1" fill="#FFFFFF" />

      {/* Bottom Text: CHOCOLATE MILK DRINK */}
      <text x="71" y="178" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="5" letterSpacing="0.3">
        CHOCOLATE MILK DRINK
      </text>
    </svg>
  );
}

