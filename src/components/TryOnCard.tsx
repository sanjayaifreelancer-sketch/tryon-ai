import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";

interface TryOnCardProps {
  imageUrl: string;
  label: string;
  date: string;
  favorited: boolean;
  onPress?: () => void;
  onHeartPress?: () => void;
}

export default function TryOnCard({
  imageUrl,
  label,
  date,
  favorited,
  onPress,
  onHeartPress,
}: TryOnCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden"
    >
      <View className="aspect-square relative overflow-hidden bg-[#F9FAFB]">
        <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="p-3 flex-row justify-between items-center">
        <View className="flex-1 mr-2">
          <Text
            className="text-xs font-medium text-[#111111]"
            numberOfLines={1}
          >
            {label}
          </Text>
          <Text className="text-xs text-[#6B7280] mt-1">{date}</Text>
        </View>
        <TouchableOpacity onPress={onHeartPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={{ fontSize: 18, color: favorited ? "#F59E0B" : "#D1D5DB" }}>
            {favorited ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
