export interface TryOnResult {
  id: string;
  imageUrl: string;
  label: string;
  date: string;
  favorited: boolean;
}

export interface WardrobeItem {
  id: string;
  imageUrl: string;
  label: string;
  category: "top" | "bottom" | "full" | "accessory";
  favorited: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  tryOns: number;
  saved: number;
  streak: number;
}
