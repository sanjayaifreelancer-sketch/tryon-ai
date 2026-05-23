import React from "react";
import { View, Text } from "react-native";
import { OnboardingSlideData } from "../constants/onboardingData";

interface IllustrationProps {
  type: OnboardingSlideData["illustration"];
  accentColor: string;
}

function Illustration({ type, accentColor }: IllustrationProps) {
  const bg = accentColor + "12";

  const icons: Record<string, { emoji: string }> = {
    tryon: { emoji: "👕" },
    wardrobe: { emoji: "👗" },
    ai: { emoji: "🤖" },
  };

  const icon = icons[type];

  return (
    <View
      className="items-center justify-center rounded-[28px]"
      style={{
        width: 160,
        height: 160,
        backgroundColor: bg,
      }}
    >
      <Text style={{ fontSize: 64 }}>{icon.emoji}</Text>
      <View
        className="absolute -top-2 -right-2 w-8 h-8 rounded-full items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <Text style={{ fontSize: 14, color: "#FFFFFF" }}>✓</Text>
      </View>
    </View>
  );
}

interface OnboardingSlideProps {
  item: OnboardingSlideData;
}

export default function OnboardingSlide({ item }: OnboardingSlideProps) {
  return (
    <View className="flex-1 bg-white items-center justify-between px-4">
      <View />

      <View className="flex-1 items-center justify-center">
        <Illustration type={item.illustration} accentColor={item.accentColor} />
        <View className="items-center mt-10 px-4">
          <Text
            className="text-xs font-bold uppercase mb-3"
            style={{
              color: item.accentColor,
              letterSpacing: 1,
            }}
          >
            {item.label}
          </Text>
          <Text
            className="text-[26px] font-bold text-[#111111] text-center leading-[34px] mb-3"
          >
            {item.title}
          </Text>
          <Text
            className="text-sm text-[#6B7280] text-center leading-[22px] max-w-[280px]"
          >
            {item.description}
          </Text>
        </View>
      </View>

      <View style={{ height: 80 }} />
    </View>
  );
}
