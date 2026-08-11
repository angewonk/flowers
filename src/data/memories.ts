import { ReasonCard, FlowerFortune, PolaroidMemory } from '../types';

export const REASONS_FOR_JANNA: ReasonCard[] = [
  {
    id: '1',
    title: 'Your Soft & Kind Heart',
    shortNote: 'You bring warmth into every room you enter without even trying.',
    fullMessage: 'Dearest Janna, your genuine kindness and gentle spirit are so rare. The way you care for people and brighten up small moments means more than words can say.',
    iconName: 'Heart',
    tag: 'Kindness',
    color: 'from-pink-100 to-rose-100 text-rose-800 border-rose-200'
  },
  {
    id: '2',
    title: 'Your Radiant Smile',
    shortNote: 'Like a golden sunflower on a cloudy day.',
    fullMessage: 'Whenever you smile, it feels like all worries melt away. Seeing you happy is easily one of the best parts of any day.',
    iconName: 'Sun',
    tag: 'Sunshine',
    color: 'from-amber-100 to-yellow-100 text-amber-800 border-amber-200'
  },
  {
    id: '3',
    title: 'The Comfort You Give',
    shortNote: 'Being around you feels like coming home.',
    fullMessage: 'You possess a peaceful, cozy presence that makes everything feel safe and right. Just talking to you brings so much calm.',
    iconName: 'Sparkles',
    tag: 'Sanctuary',
    color: 'from-purple-100 to-fuchsia-100 text-purple-800 border-purple-200'
  },
  {
    id: '4',
    title: 'Your Adorable Laugh',
    shortNote: 'The sweetest melody that instantly lifts the mood.',
    fullMessage: 'Your laugh is pure magic, Janna! Hearing you laugh makes me want to tell silly jokes just to hear it over and over again.',
    iconName: 'Music',
    tag: 'Joy',
    color: 'from-rose-100 to-pink-100 text-pink-800 border-pink-200'
  },
  {
    id: '5',
    title: 'You Are Truly Special',
    shortNote: 'One of a kind in every beautiful way possible.',
    fullMessage: 'There is nobody quite like you, Janna. You are thoughtful, unique, incredibly precious, and deeply cherished.',
    iconName: 'Flower2',
    tag: 'Precious',
    color: 'from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200'
  },
  {
    id: '6',
    title: 'Glued To You Forever',
    shortNote: 'Just like in beabadoobee’s Glue Song! 🎶',
    fullMessage: '“I’ve never known someone like you... stuck to you like glue.” Today, tomorrow, and every day after, you deserve all the flowers in the world.',
    iconName: 'Gift',
    tag: 'Forever',
    color: 'from-rose-100 to-amber-100 text-rose-900 border-rose-300'
  }
];

export const FLOWER_FORTUNES: FlowerFortune[] = [
  {
    id: 'f1',
    flowerName: 'Cherry Blossom',
    emoji: '🌸',
    compliment: 'Today is a reminder that Janna’s presence makes everything bloom.',
    quote: 'Like flowers after rain, you bring freshness and light.',
    color: 'bg-pink-100 text-pink-800 border-pink-300'
  },
  {
    id: 'f2',
    flowerName: 'Golden Sunflower',
    emoji: '🌻',
    compliment: 'You have a golden soul that lights up the path for everyone around you.',
    quote: 'Keep turning toward the light, beautiful Janna!',
    color: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'f3',
    flowerName: 'Royal Peony',
    emoji: '🌺',
    compliment: 'You deserve soft hugs, sweet rest, and a bouquet of joy today.',
    quote: 'Softness is your power, and elegance is your grace.',
    color: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  {
    id: 'f4',
    flowerName: 'Lavender Blossom',
    emoji: '🪻',
    compliment: 'Take a deep breath, Janna. You are doing wonderfully and loved beyond measure.',
    quote: 'Peace lives wherever you are.',
    color: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  {
    id: 'f5',
    flowerName: 'Sweet Tulip',
    emoji: '🌷',
    compliment: 'Something wonderfully happy is heading your way today!',
    quote: 'Sincere hearts always bloom in time.',
    color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
  }
];

export const POLAROID_MEMORIES: PolaroidMemory[] = [
  {
    id: 'p1',
    title: 'A Garden for Janna',
    dateStr: 'Always & Forever',
    caption: 'Flowers that will never wilt, made just for you.',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop',
    rotation: '-rotate-2'
  },
  {
    id: 'p2',
    title: 'Glued to You 🎶',
    dateStr: 'Listening to beabadoobee',
    caption: '“I’ve never known someone like you...”',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    rotation: 'rotate-3'
  },
  {
    id: 'p3',
    title: 'For My Favorite Person',
    dateStr: 'With All My Heart',
    caption: 'Hope these flowers bring a big smile to your face, Janna!',
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=600&auto=format&fit=crop',
    rotation: '-rotate-1'
  }
];
