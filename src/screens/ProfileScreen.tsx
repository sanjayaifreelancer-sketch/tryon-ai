import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MENU_ITEMS = [
  { icon: "👤", label: "Account" },
  { icon: "🔔", label: "Notifications" },
  { icon: "🔒", label: "Privacy" },
  { icon: "❓", label: "Help & Support" },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row justify-between items-center px-4 h-14 border-b border-[#E5E7EB]">
        <TouchableOpacity className="p-2 -ml-2">
          <Text className="text-xl">☰</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-[#111111]">TryOn AI</Text>
        <TouchableOpacity className="p-2 -mr-2">
          <Text className="text-xl">🛍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-8">
          <View className="w-28 h-28 rounded-full border border-[#E5E7EB] p-1 mb-4 bg-white">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
              }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-bold text-[#111111] mb-1">
            Alex Taylor
          </Text>
          <Text className="text-sm text-[#6B7280] flex-row items-center">
            @alextstyle{"  "}
            <Text className="text-[#F59E0B]">✓</Text>
          </Text>
        </View>

        <View className="flex-row mt-8" style={{ gap: 12 }}>
          {[
            { value: "42", label: "Try-ons" },
            { value: "12", label: "Saved" },
            { value: "5", label: "Streak", icon: true },
          ].map((stat, i) => (
            <View
              key={i}
              className="flex-1 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] items-center justify-center py-4"
            >
              <Text className="text-xl font-bold text-[#F59E0B] flex-row items-center">
                {stat.value}
                {stat.icon && <Text className="text-sm ml-1"> 🔥</Text>}
              </Text>
              <Text className="text-xs font-medium text-[#6B7280] mt-1">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] overflow-hidden mt-8">
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              className={`flex-row items-center px-4 py-4 ${
                i < MENU_ITEMS.length - 1 ? "border-b border-[#E5E7EB]" : ""
              }`}
            >
              <Text className="text-xl mr-4">{item.icon}</Text>
              <Text className="flex-1 text-sm font-medium text-[#111111]">
                {item.label}
              </Text>
              <Text className="text-[#6B7280]">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="mt-8 w-full py-4 rounded-xl border border-[#E5E7EB] items-center">
          <Text className="text-sm font-medium text-red-500">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
