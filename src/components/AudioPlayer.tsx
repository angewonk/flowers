import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronUp, ChevronDown, Heart, Disc } from 'lucide-react';
import { SONG_INFO, GLUE_SONG_LYRICS } from '../data/song';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  hasUserInteracted: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  hasUserInteracted,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(115); // ~1:55 min
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Sync state with HTML audio
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && hasUserInteracted) {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay prevented by browser policy:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, hasUserInteracted]);

  // Track progress timer for lyrics sync
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) return 0;
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handleTimeSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const activeLyricIndex = GLUE_SONG_LYRICS.reduce((acc, lyric, idx) => {
    if (currentTime >= lyric.time) return idx;
    return acc;
  }, 0);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={SONG_INFO.audioUrl}
        loop
        muted={isMuted}
        onLoadedMetadata={() => {
          if (audioRef.current?.duration) {
            setDuration(Math.floor(audioRef.current.duration));
          }
        }}
      />

      {/* Embedded YouTube Audio Backup for authentic Glue Song experience */}
      <div className="sr-only">
        <iframe
          ref={iframeRef}
          title="beabadoobee Glue Song Player"
          width="1"
          height="1"
          src={`https://www.youtube-nocookie.com/embed/${SONG_INFO.youtubeId}?enablejsapi=1&autoplay=${isPlaying && hasUserInteracted ? 1 : 0}&loop=1&playlist=${SONG_INFO.youtubeId}`}
          allow="autoplay"
        />
      </div>

      {/* Floating Sticky Music Player Widget */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-40 max-w-md mx-auto md:mx-0">
        <div className="bg-white/90 backdrop-blur-md border border-rose-200 shadow-xl rounded-2xl p-3 md:p-4 text-stone-800 transition-all duration-300 hover:shadow-2xl hover:border-rose-300">
          <div className="flex items-center justify-between gap-3">
            
            {/* Spinning Vinyl & Song Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full bg-stone-900 border-2 border-rose-300 flex items-center justify-center shrink-0 shadow-md ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-rose-400 border border-stone-800 flex items-center justify-center">
                  <Disc className="w-2.5 h-2.5 text-white" />
                </div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <p className="font-serif-display font-semibold text-sm text-stone-900 truncate">
                    {SONG_INFO.title}
                  </p>
                </div>
                <p className="text-xs text-rose-600 font-medium truncate">
                  {SONG_INFO.artist} • <span className="text-stone-500 font-normal">For Janna 💖</span>
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-stone-500 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Main Play/Pause Button */}
              <button
                onClick={onTogglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
                title={isPlaying ? "Pause Glue Song" : "Play Glue Song"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
              </button>

              {/* Lyrics Drawer Toggle */}
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className={`p-2 rounded-full transition-colors ${
                  showLyrics ? 'bg-rose-100 text-rose-700' : 'text-stone-500 hover:text-rose-600 hover:bg-rose-50'
                }`}
                title="Lyrics for Janna"
              >
                {showLyrics ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-stone-400 font-mono w-7 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleTimeSeek}
              className="flex-1 h-1 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <span className="text-[10px] text-stone-400 font-mono w-7">{formatTime(duration)}</span>
          </div>

          {/* Live Lyrics Banner (Collapsed preview) */}
          {!showLyrics && (
            <div className="mt-1.5 pt-1.5 border-t border-rose-100 flex items-center justify-between text-xs text-stone-600 italic">
              <span className="truncate font-handwriting text-sm text-rose-700 font-medium">
                "{GLUE_SONG_LYRICS[activeLyricIndex]?.text}"
              </span>
              <Heart className="w-3 h-3 text-rose-400 shrink-0 fill-rose-300 ml-2 animate-pulse" />
            </div>
          )}
        </div>

        {/* Expanded Lyrics Card */}
        {showLyrics && (
          <div className="mt-2 bg-white/95 backdrop-blur-md border border-rose-200 rounded-2xl p-4 shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between border-b border-rose-100 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <h4 className="font-serif-display text-sm font-bold text-stone-800">
                  Glue Song Lyrics
                </h4>
              </div>
              <span className="text-[11px] bg-rose-100 text-rose-700 font-medium px-2 py-0.5 rounded-full">
                beabadoobee
              </span>
            </div>

            <div className="space-y-2 text-center py-1">
              {GLUE_SONG_LYRICS.map((lyric, idx) => {
                const isActive = idx === activeLyricIndex;
                return (
                  <p
                    key={idx}
                    className={`transition-all duration-300 font-sans-body text-xs md:text-sm ${
                      isActive
                        ? 'text-rose-600 font-bold scale-105 bg-rose-50 py-1 px-2 rounded-lg border border-rose-200 shadow-sm'
                        : 'text-stone-500 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {lyric.text}
                  </p>
                );
              })}
            </div>
            <div className="mt-3 pt-2 border-t border-rose-100 text-center text-[11px] text-stone-400">
              Dedicated to Janna 🌸 • Stuck like glue
            </div>
          </div>
        )}
      </div>
    </>
  );
};
