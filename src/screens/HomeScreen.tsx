import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StreakBadge from "../components/StreakBadge";
import TryOnCard from "../components/TryOnCard";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const MOCK_RECENT = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    label: "Navy Blazer & Jeans",
    date: "2 hours ago",
    favorited: false,
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    label: "Olive Midi Dress",
    date: "Yesterday",
    favorited: true,
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cda4b71?w=400",
    label: "Casual Linen Fit",
    date: "2 days ago",
    favorited: false,
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
    label: "Summer Breeze",
    date: "3 days ago",
    favorited: true,
  },
];

export default function HomeScreen({ navigation }: any) {
  const [recentTryOns, setRecentTryOns] = useState(MOCK_RECENT);

  const toggleFavorite = (id: string) => {
    setRecentTryOns((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorited: !item.favorited } : item
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-1">
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
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-4 flex-row items-center justify-between">
            <View>
              <Text className="text-lg text-[#6B7280]">Welcome back,</Text>
              <Text className="text-2xl font-bold text-[#111111]">Alex</Text>
            </View>
            <StreakBadge count={5} />
          </View>

          <View className="px-4 mt-6">
            <View className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F9FAFB] relative">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-4 right-4 bg-white border border-[#E5E7EB] rounded-full px-4 py-2 flex-row items-center" style={{ opacity: 0.95 }}>
                <View className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <Text className="ml-2 text-xs font-medium text-[#111111]">
                  Ready for fitting
                </Text>
              </View>
            </View>
          </View>

          <View className="px-4 mt-6">
            <TouchableOpacity
              className="w-full h-[52px] bg-[#F59E0B] rounded-full flex-row items-center justify-center"
              activeOpacity={0.9}
              onPress={() => navigation.navigate("TryOn")}
              style={{
                shadowColor: "#F59E0B",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 4,
              }}
            >
              <Text className="mr-2 text-lg">✨</Text>
              <Text className="text-base font-bold text-white">
                Try On New Look
              </Text>
            </TouchableOpacity>
          </View>

          <View className="px-4 mt-8">
            <View className="flex-row justify-between items-end mb-4">
              <Text className="text-xl font-semibold text-[#111111]">
                Recent Try-Ons
              </Text>
              <TouchableOpacity>
                <Text className="text-xs font-medium text-[#6B7280]">
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap" style={{ gap: 12 }}>
              {recentTryOns.map((item) => (
                <View key={item.id} style={{ width: CARD_WIDTH }}>
                  <TryOnCard
                    imageUrl={item.imageUrl}
                    label={item.label}
                    date={item.date}
                    favorited={item.favorited}
                    onPress={() => {}}
                    onHeartPress={() => toggleFavorite(item.id)}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
