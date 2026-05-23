import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Plan } from "../types";

interface PlanCardProps {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}

export default function PlanCard({ plan, selected, onSelect }: PlanCardProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.9}
      className={`rounded-2xl p-4 flex flex-col relative ${
        selected
          ? "border-2 border-[#F59E0B] bg-white"
          : "border border-[#E5E7EB] bg-white"
      }`}
      style={{
        shadowColor: selected ? "#F59E0B" : "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: selected ? 0.15 : 0.05,
        shadowRadius: 20,
        elevation: selected ? 4 : 1,
      }}
    >
      {plan.recommended && (
        <View className="absolute top-0 right-0 bg-[#F59E0B] px-3 py-1 rounded-bl-xl rounded-tr-2xl">
          <Text className="text-xs font-bold text-white">Recommended</Text>
        </View>
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold text-[#111111]">{plan.name}</Text>
        <View
          className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
            selected ? "border-[#F59E0B]" : "border-[#D1D5DB]"
          }`}
        >
          {selected && (
            <View className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          )}
        </View>
      </View>
      <View className="flex-row items-baseline gap-1 mt-2">
        <Text className="text-2xl font-bold text-[#111111]">
          ${plan.price}
        </Text>
        <Text className="text-sm text-[#6B7280]">/mo</Text>
      </View>
      <View className="mt-3">
        {plan.features.map((feature: string, i: number) => (
          <View key={i} className="flex-row items-start gap-3 mt-2">
            <Text className="text-[#6B7280] text-sm">✓</Text>
            <Text className="text-sm text-[#6B7280] flex-1">{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
