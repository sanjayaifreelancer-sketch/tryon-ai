import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTERS = ["All", "Tops", "Bottoms", "Full"];

const MOCK_ITEMS = [
  { id: "1", imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", label: "Essential Linen Shirt", category: "top", favorited: false },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400", label: "Vintage Denim Jacket", category: "top", favorited: false },
  { id: "3", imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400", label: "Utility Cargo Pants", category: "bottom", favorited: true },
  { id: "4", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", label: "Classic White Sneakers", category: "full", favorited: false },
  { id: "5", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", label: "Graphic Cotton Tee", category: "top", favorited: false },
  { id: "6", imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400", label: "Flowy Summer Dress", category: "full", favorited: true },
];

export default function WardrobeScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState(MOCK_ITEMS);

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter(
          (item) => item.category === activeFilter.toLowerCase()
        );

  const toggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorited: !item.favorited } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

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
        <Text className="text-2xl font-bold text-[#111111] mt-6 mb-6">
          My Wardrobe
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          className="mb-6"
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full border ${
                activeFilter === filter
                  ? "bg-[#F59E0B] border-[#F59E0B]"
                  : "bg-white border-[#E5E7EB]"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  activeFilter === filter ? "text-white" : "text-[#111111]"
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {filteredItems.map((item) => (
            <View key={item.id} style={{ width: "47%" }}>
              <View className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
                <View className="aspect-[3/4] bg-[#F9FAFB] relative overflow-hidden">
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="p-3 flex-row justify-between items-center">
                  <Text
                    className="text-xs font-medium text-[#6B7280] flex-1 mr-2"
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => toggleFavorite(item.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: item.favorited ? "#F59E0B" : "#D1D5DB",
                        }}
                      >
                        {item.favorited ? "♥" : "♡"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteItem(item.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={{ fontSize: 16, color: "#D1D5DB" }}>
                        🗑
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity
            className="rounded-xl border border-dashed border-[#E5E7EB] bg-[#F9FAFB] items-center justify-center"
            style={{ width: "47%", aspectRatio: 3 / 4 }}
          >
            <View className="w-12 h-12 rounded-full bg-[#E5E7EB] items-center justify-center mb-2">
              <Text className="text-2xl text-[#6B7280]">+</Text>
            </View>
            <Text className="text-xs font-medium text-[#6B7280]">Add Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
