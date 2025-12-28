export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  locale?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  bio?: string;
}
