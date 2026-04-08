export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  externalLinks: { title: string; url: string }[];
}

export type Category = 'Prevention' | 'Treatment' | 'Living with HIV' | 'Services' | 'News' | 'User Stories';
