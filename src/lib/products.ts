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
  description: string;
  samples?: Sample[];
  /** Optional preview audio URL played from the product card's play button. */
  previewUrl?: string;
}

export const products: Product[] = [
  {
    slug: "concrete-bloom",
    name: "Bersaing",
    tagline: "Textured Lo-Fi Percussion & Foley",
    providerName: "RizWoow",
    providerSlug: "nightshade-audio",
    providerImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
    image: "/products/concrete-bloom.png",
    downloads: 128,
    formats: ["Wav"],
    featured: true,
    previewUrl: "/audio/bersaing-preview.mp3",
    description:
      "Bersaing by RizWoow is a collection of 128 samples built for hazy, lo-fi productions.\n\nDusty percussion loops sit alongside field-recorded foley, giving every hit a worn, tactile character. Layered tape hiss and subtle pitch drift keep the whole kit feeling analog and alive.\n\nThe pack features carefully prepared sounds from close-mic'd drums, cracked vinyl textures, and room-recorded ambience.\n\nAll sounds are royalty-free for commercial tracks, remixes, and DJ sets.\n\nFind that dusty, half-lit vibe with Bersaing from RizWoow.",
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
    slug: "glass-horizon",
    name: "Glass Horizon",
    tagline: "Ethereal Pads & Ambient Textures",
    providerName: "Faraway Sounds",
    providerSlug: "faraway-sounds",
    providerImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    downloads: 94,
    formats: ["Wav"],
    description:
      "Glass Horizon by Faraway Sounds is a collection of 94 samples designed for wide, cinematic ambient work.\n\nEvolving pads and granular textures drift slowly beneath shimmering top-end detail, perfect for scoring, sound design, or slow-burn intros.\n\nThe pack features carefully prepared sounds from bowed metal, reversed strings, and softly modulated synth layers.\n\nAll sounds are royalty-free for commercial tracks, remixes, and DJ sets.\n\nFind that wide-open, weightless vibe with Glass Horizon from Faraway Sounds.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
