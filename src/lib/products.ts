export interface Sample {
  id: string;
  name: string;
  type: "loop" | "one-shot";
  tags: string[];
  bpm?: number;
  key?: string;
  duration: string;
  /** Optional playable audio preview URL. When missing, the play button
   * still toggles play/pause UI state but has no audio to actually play. */
  url?: string;
}

export interface WordTiming {
  text: string;
  start: number | null;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  providerName: string;
  providerSlug: string;
  providerImage: string;
  image: string;
  downloads: number;
  formats: string[];
  featured?: boolean;
  /** Current selling price, shown on the product card. */
  price: string;
  /** Original price before discount. When present, shown with a strikethrough
   * next to `price` to indicate a discount. */
  originalPrice?: string;
  description: string;
  /** Optional per-word timing (seconds) for syncing the description
   * highlight with previewUrl playback. When present, this is used
   * instead of the character-proportion estimate. */
  wordTimings?: WordTiming[];
  samples?: Sample[];
  /** Optional preview audio URL played from the product card's play button. */
  previewUrl?: string;
}

export const products: Product[] = [
  {
    slug: "concrete-bloom",
    name: "Bersaing",
    tagline: "Lana Rmx",
    providerName: "RizWoow",
    providerSlug: "nightshade-audio",
    providerImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
    image: "/products/concrete-bloom.png",
    downloads: 128,
    formats: ["Wav"],
    featured: true,
    price: "Rp99.000",
    originalPrice: "Rp150.000",
    previewUrl: "/audio/bersaing-preview.mp3",
    description:
      "I love u\nI Miss u\nI need u\nI found u\nakan ku beri semua kepada mu\n\nmari sini\nku buka hati\ndan jangan lagi\nuntuk mencari cari\ntanpa basa basi\ntolong jangan gengsi\nberani\nuntuk menjadikan aku bidadari\n\naku pusing\nhingga tujuh keliling\nlirikan mu\nbuat aku jadi salting\nsampai buat ku terbaring\nrasaingin untuk calling\ntapi sayang aku tak bisa bersaing",
    // Timing per kata (detik), hasil dari Lyric Timing Tool, disinkronkan
    // dengan previewUrl di atas. Kata "I" pertama & "love" disesuaikan
    // manual karena posisinya di awal lagu (0s) sempat tabrakan waktu.
    wordTimings: [
      { text: "I", start: 0 },
      { text: "love", start: 0.1 },
      { text: "u", start: 0.217 },
      { text: "I", start: 0.467 },
      { text: "Miss", start: 0.667 },
      { text: "u", start: 0.983 },
      { text: "I", start: 1.217 },
      { text: "need", start: 1.517 },
      { text: "u", start: 1.817 },
      { text: "I", start: 2.267 },
      { text: "found", start: 2.533 },
      { text: "u", start: 2.817 },
      { text: "akan", start: 4.133 },
      { text: "ku", start: 4.35 },
      { text: "beri", start: 4.65 },
      { text: "semua", start: 5.2 },
      { text: "kepada", start: 5.567 },
      { text: "mu", start: 6.207 },
      { text: "mari", start: 6.896 },
      { text: "sini", start: 7.356 },
      { text: "ku", start: 8.511 },
      { text: "buka", start: 8.967 },
      { text: "hati", start: 9.489 },
      { text: "dan", start: 10.372 },
      { text: "jangan", start: 10.594 },
      { text: "lagi", start: 11.333 },
      { text: "untuk", start: 12.422 },
      { text: "mencari", start: 12.894 },
      { text: "cari", start: 13.561 },
      { text: "tanpa", start: 14.078 },
      { text: "basa", start: 14.55 },
      { text: "basi", start: 15.05 },
      { text: "tolong", start: 15.939 },
      { text: "jangan", start: 16.35 },
      { text: "gengsi", start: 16.811 },
      { text: "berani", start: 17.578 },
      { text: "untuk", start: 19.239 },
      { text: "menjadikan", start: 20.15 },
      { text: "aku", start: 20.811 },
      { text: "bidadari", start: 21.328 },
      { text: "aku", start: 21.511 },
      { text: "pusing", start: 21.944 },
      { text: "hingga", start: 22.611 },
      { text: "tujuh", start: 22.978 },
      { text: "keliling", start: 23.644 },
      { text: "lirikan", start: 24.756 },
      { text: "mu", start: 25.656 },
      { text: "buat", start: 26.084 },
      { text: "aku", start: 26.456 },
      { text: "jadi", start: 26.906 },
      { text: "salting", start: 27.456 },
      { text: "sampai", start: 27.933 },
      { text: "buat", start: 28.267 },
      { text: "ku", start: 28.867 },
      { text: "terbaring", start: 29.2 },
      { text: "rasaingin", start: 29.833 },
      { text: "untuk", start: 30.55 },
      { text: "calling", start: 31.183 },
      { text: "tapi", start: 32.183 },
      { text: "sayang", start: 32.683 },
      { text: "aku", start: 33.15 },
      { text: "tak", start: 33.45 },
      { text: "bisa", start: 33.883 },
      { text: "bersaing", start: 34.333 },
    ],
    samples: [
      {
        id: "cb-01",
        name: "82bpm_Drum_Loop_Kick_Hat_Heavy_01.wav",
        type: "loop",
        tags: ["Drums", "Kick", "Lo-Fi"],
        bpm: 82,
        duration: "0:23",
      },
      {
        id: "cb-02",
        name: "One-Shot_Kick_Dusty_02.wav",
        type: "one-shot",
        tags: ["Drums", "Kick"],
        duration: "0:01",
      },
      {
        id: "cb-03",
        name: "80bpm_Drum_Loop_Kick_Hat_Slow_03.wav",
        type: "loop",
        tags: ["Drums", "Kick", "Lo-Fi"],
        bpm: 80,
        duration: "0:24",
      },
      {
        id: "cb-04",
        name: "One-Shot_Snare_Cracked_04.wav",
        type: "one-shot",
        tags: ["Drums", "Snare"],
        duration: "0:01",
      },
      {
        id: "cb-05",
        name: "One-Shot_Clap_Worn_05.wav",
        type: "one-shot",
        tags: ["Drums", "Clap"],
        duration: "0:01",
      },
      {
        id: "cb-06",
        name: "Bass_One-Shot_E_Synth_Warm_06.wav",
        type: "one-shot",
        tags: ["Synth", "Bass"],
        key: "E",
        duration: "0:02",
      },
      {
        id: "cb-07",
        name: "84bpm_Drum_Loop_Full_Kit_07.wav",
        type: "loop",
        tags: ["Drums", "Full Drums"],
        bpm: 84,
        duration: "0:22",
      },
      {
        id: "cb-08",
        name: "One-Shot_Snare_Room_08.wav",
        type: "one-shot",
        tags: ["Drums", "Snare"],
        duration: "0:01",
      },
      {
        id: "cb-09",
        name: "Clap_001.wav",
        type: "one-shot",
        tags: ["Drums", "Clap"],
        duration: "0:01",
        url: "/audio/concrete-bloom/clap-09.mp3",
      },
      {
        id: "cb-10",
        name: "Crash 2.wav",
        type: "one-shot",
        tags: ["Drums", "Crash"],
        duration: "0:04",
        url: "/audio/concrete-bloom/crash-10.mp3",
      },
      {
        id: "cb-11",
        name: "Drum Loop (43) - 140 bpm.wav",
        type: "loop",
        tags: ["Drums", "Full Drums"],
        bpm: 140,
        duration: "0:14",
        url: "/audio/concrete-bloom/drum-loop-140bpm-11.mp3",
      },
      {
        id: "cb-12",
        name: "HI HAT ST.wav",
        type: "loop",
        tags: ["Drums", "Hi-Hat"],
        duration: "0:04",
        url: "/audio/concrete-bloom/hihat-loop-stereo-12.mp3",
      },
      {
        id: "cb-13",
        name: "Hat_Basic.wav",
        type: "one-shot",
        tags: ["Drums", "Hi-Hat"],
        duration: "0:01",
        url: "/audio/concrete-bloom/hihat-oneshot-13.mp3",
      },
      {
        id: "cb-14",
        name: "HiHat Loop 04.wav",
        type: "loop",
        tags: ["Drums", "Hi-Hat"],
        duration: "0:02",
        url: "/audio/concrete-bloom/hihat-loop-14.mp3",
      },
      {
        id: "cb-15",
        name: "Kick_003_Sensible.wav",
        type: "one-shot",
        tags: ["Drums", "Kick"],
        duration: "0:01",
        url: "/audio/concrete-bloom/kick-15.mp3",
      },
      {
        id: "cb-16",
        name: "MaCdii _ Chopped.wav",
        type: "loop",
        tags: ["Vocal", "Chop"],
        duration: "0:04",
        url: "/audio/concrete-bloom/vocal-chop-16.mp3",
      },
      {
        id: "cb-17",
        name: "RIDE_ARTHA.wav",
        type: "one-shot",
        tags: ["Drums", "Ride"],
        duration: "0:01",
        url: "/audio/concrete-bloom/ride-17.mp3",
      },
      {
        id: "cb-18",
        name: "hip-hop-trap-drums-fat-syncopated-hits_130bpm.wav",
        type: "loop",
        tags: ["Drums", "Full Drums", "Trap"],
        bpm: 130,
        duration: "0:07",
        url: "/audio/concrete-bloom/drum-loop-trap-130bpm-18.mp3",
      },
      {
        id: "cb-19",
        name: "hipdut-percussion-loop_138bpm.wav",
        type: "loop",
        tags: ["Percussion"],
        bpm: 138,
        duration: "0:02",
        url: "/audio/concrete-bloom/percussion-loop-138bpm-19.mp3",
      },
    ],
  },
  {
    slug: "mutiara",
    name: "Mutiara",
    tagline: "Mutiara - Ipank",
    providerName: "RizWoow",
    providerSlug: "nightshade-audio",
    providerImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
    image: "/products/mutiara.png",
    downloads: 0,
    formats: ["Wav"],
    featured: true,
    price: "Rp79.000",
    originalPrice: "Rp120.000",
    previewUrl: "/audio/mutiara-preview.mp3",
    description: "Mutiara - Ipank",
    samples: [
      {
        id: "mt-01",
        name: "Intro_Guitar_Melody.wav",
        type: "loop",
        tags: ["Melody", "Guitar"],
        duration: "0:12",
      },
      {
        id: "mt-02",
        name: "Verse_Drum_Loop.wav",
        type: "loop",
        tags: ["Drums", "Full Drums"],
        bpm: 92,
        duration: "0:18",
      },
      {
        id: "mt-03",
        name: "Chorus_Vocal_Chop.wav",
        type: "loop",
        tags: ["Vocal", "Chop"],
        duration: "0:08",
      },
      {
        id: "mt-04",
        name: "One-Shot_Kick_Warm.wav",
        type: "one-shot",
        tags: ["Drums", "Kick"],
        duration: "0:01",
      },
      {
        id: "mt-05",
        name: "One-Shot_Snare_Tight.wav",
        type: "one-shot",
        tags: ["Drums", "Snare"],
        duration: "0:01",
      },
      {
        id: "mt-06",
        name: "Bass_One-Shot_Deep.wav",
        type: "one-shot",
        tags: ["Bass"],
        key: "A",
        duration: "0:03",
      },
      {
        id: "mt-07",
        name: "Bridge_Piano_Loop.wav",
        type: "loop",
        tags: ["Melody", "Piano"],
        bpm: 92,
        duration: "0:15",
      },
      {
        id: "mt-08",
        name: "Outro_Percussion_Fill.wav",
        type: "one-shot",
        tags: ["Percussion"],
        duration: "0:02",
      },
    ],
  },
  {
    slug: "kewer-kewer",
    name: "Kewer - Kewer",
    tagline: "Color Bass",
    providerName: "RizWoow",
    providerSlug: "nightshade-audio",
    providerImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
    image: "/products/kewer-kewer.png",
    downloads: 0,
    formats: ["Wav"],
    featured: true,
    price: "Rp99.000",
    previewUrl: "/audio/kewer-kewer-preview.mp3",
    description: "Color Bass",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
