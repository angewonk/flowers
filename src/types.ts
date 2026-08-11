export interface FlowerItem {
  id: string;
  name: string;
  botanicalName: string;
  meaning: string;
  category: 'romantic' | 'tender' | 'joyful' | 'everlasting';
  color: string;
  lightBg: string;
  accentColor: string;
  borderColor: string;
  svgPath: string;
  description: string;
  symbolism: string;
  stemColor?: string;
  petalShape?: string;
}

export interface LyricLine {
  time: number;
  text: string;
}

export interface ReasonCard {
  id: string;
  title: string;
  shortNote: string;
  fullMessage: string;
  iconName: string;
  tag: string;
  color: string;
}

export interface FlowerFortune {
  id: string;
  flowerName: string;
  emoji: string;
  compliment: string;
  quote: string;
  color: string;
}

export interface PolaroidMemory {
  id: string;
  title: string;
  dateStr: string;
  caption: string;
  imageUrl: string;
  rotation: string;
}
