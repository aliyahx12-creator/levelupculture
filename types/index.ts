export interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: string;
  gamer_tag?: string;
  level?: number;
  xp?: number;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  game?: string;
  mood?: 'great' | 'good' | 'okay' | 'rough';
  wins?: string;
  improvements?: string;
  created_at: string;
}

export interface ConfidenceLog {
  id: string;
  user_id: string;
  score: number;
  note?: string;
  created_at: string;
}

export interface IdentityStatement {
  id: string;
  text: string;
  category: 'mindset' | 'gaming' | 'growth' | 'community';
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'mindset' | 'gaming' | 'growth' | 'tech';
  url?: string;
  type: 'article' | 'video' | 'guide' | 'tool';
  icon?: string;
}
