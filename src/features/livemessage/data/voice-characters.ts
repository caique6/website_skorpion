export interface VoiceCharacter {
  name: string;
  image: string;
  voiceId: string | null;
}

export const VOICE_CHARACTERS: VoiceCharacter[] = [
  { name: "Helena", image: "/person/helena.png", voiceId: "pf_dora" },
  { name: "Miguel", image: "/person/miguel.png", voiceId: "pm_alex" },
  { name: "Arthur", image: "/person/arthur.png", voiceId: "pm_santa" },
  { name: "Luli", image: "/person/lulis.png", voiceId: null },
  { name: "Bolso Nabo", image: "/person/bolsonabo.png", voiceId: null },
  { name: "Caiquera", image: "/person/caiquera.png", voiceId: null },
  { name: "Lipão", image: "/person/lipao.png", voiceId: null },
  { name: "Palhaço", image: "/person/palhaco.png", voiceId: null },
  { name: "SK", image: "/person/sk.png", voiceId: null },
];
