import React from "react";
import { View, Text } from "react-native";

interface StreakBadgeProps {
  count: number;
}

export default function StreakBadge({ count }: StreakBadgeProps) {
  return (
    <View className="flex-row items-center bg-[#FFF7ED] px-3 py-1.5 rounded-full border border-[#FED7AA]">
      <Text className="text-base">🔥</Text>
      <Text className="ml-1 text-sm font-semibold text-[#F59E0B]">{count}</Text>
    </View>
  );
}
