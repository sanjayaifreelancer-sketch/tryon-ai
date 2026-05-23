export interface OnboardingSlideData {
  id: number;
  accentColor: string;
  label: string;
  title: string;
  description: string;
  illustration: "tryon" | "wardrobe" | "ai";
}

export const slides: OnboardingSlideData[] = [
  {
    id: 1,
    accentColor: "#F59E0B",
    label: "Step 1",
    title: "Try any outfit\ninstantly",
    description:
      "Upload a clothing photo and see it on you in seconds — no guessing sizes or styles",
    illustration: "tryon",
  },
  {
    id: 2,
    accentColor: "#10B981",
    label: "Step 2",
    title: "Save your\nwardrobe",
    description:
      "Build your digital wardrobe. Mix & match outfits and save your favourite looks for later",
    illustration: "wardrobe",
  },
  {
    id: 3,
    accentColor: "#7C3AED",
    label: "Step 3",
    title: "Your personal\nAI stylist",
    description:
      "Get outfit suggestions for any occasion — wedding, office, casual — powered by AI",
    illustration: "ai",
  },
];
