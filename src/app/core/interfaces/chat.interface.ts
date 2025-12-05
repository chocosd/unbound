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
  author: Pick<User, 'id' | 'name' | 'avatarUrl' | 'languages'>;
  text: string; // original text
  lang: Language; // original language
  version: number; // bump when edited
  timestamp: string; // created
  editedAt?: string; // last edited
  translations: Translations;
  reactions?: { key: string; count: number; reactedByMe?: boolean }[];
}

export interface DisplayMessage {
  text: string;
  lang: Language;
  translatedFrom?: Language;
}
