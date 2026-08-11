import React from 'react';
import { FlowerItem } from '../types';
import { FlowerSVG } from './FlowerSVG';
import { Sparkles, Heart, Printer, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShareCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFlowers: FlowerItem[];
}

export const ShareCertificateModal: React.FC<ShareCertificateModalProps> = ({
  isOpen,
  onClose,
  selectedFlowers,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-rose-200 overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Printable Card Area */}
        <div id="printable-certificate" className="border-4 border-rose-200/80 rounded-2xl p-6 bg-gradient-to-br from-amber-50/60 via-white to-pink-50/60 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Official Floral Keepsake</span>
          </div>

          <h3 className="font-serif-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Flowers for Janna 🌸
          </h3>

          <p className="font-handwriting text-2xl text-rose-600 font-medium">
            “Tangled in love, stuck to you like glue”
          </p>

          <p className="text-xs text-stone-500 font-sans-body max-w-xs mx-auto">
            This digital certificate presents a handpicked garden bouquet created with eternal blooms & affection for Janna.
          </p>

          {/* Bouquet Summary Icons */}
          <div className="bg-white/90 rounded-2xl p-4 border border-rose-100 shadow-inner my-2">
            <p className="text-[11px] uppercase font-bold text-stone-400 mb-2">Bouquet Stems</p>
            <div className="flex items-center justify-center flex-wrap gap-3">
              {selectedFlowers.map((f, i) => (
                <div key={i} className="flex flex-col items-center">
                  <FlowerSVG type={f.svgPath} color={f.color} size={40} />
                  <span className="text-[10px] font-semibold text-stone-700 mt-1">{f.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-xs text-stone-600">
            <span>Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <div className="flex items-center gap-1 text-rose-600 font-bold">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>For Janna</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
