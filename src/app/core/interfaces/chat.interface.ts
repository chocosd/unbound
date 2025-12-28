export type Language = 'ENG' | 'FR' | 'ES' | 'DE' | 'RUS' | 'ZH' | 'JA' | 'PT' | 'IT';

export interface TranslationEntry {
  message: string;
  version: number; // version of the source message translated
  timestamp: string; // ISO when translation created
}

export type Translations = Partial<Record<Language, TranslationEntry>>;

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  languages: Language[]; // preference order, e.g. ['ENG','FR']
  autoTranslate?: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  user: { id: string; name: string; image: string };
  timestamp: Date;
  reactions: { [index: string]: number }[];
  version: number;
}

export interface DisplayMessage {
  text: string;
  lang: Language;
  translatedFrom?: Language;
}
