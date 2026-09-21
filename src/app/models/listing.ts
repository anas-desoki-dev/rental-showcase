export type Category = 'car' | 'yacht' | 'helicopter' | 'buggy';

export interface Listing {
  id: number;
  category: Category;
  emoji: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  pricePerDay: number; // AED
}
