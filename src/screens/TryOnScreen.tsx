import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { tryOnApi } from "../services/api";
import { trialService } from "../services/trial";

export default function TryOnScreen({ navigation }: any) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"original" | "result">("original");
  const [remainingTryOns, setRemainingTryOns] = useState(3);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    trialService.remainingTryOns().then(setRemainingTryOns);
    tryOnApi.isAnonymousUser().then((anon) => setIsPro(!anon));
  }, []);

  const pickUserImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera roll access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setUserImage(result.assets[0].uri);
    }
  };

  const pickClothingImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setClothingImage(result.assets[0].uri);
    }
  };

  const handleTryOn = async () => {
    if (!userImage || !clothingImage) {
      Alert.alert("Missing images", "Please select both a user photo and a clothing item.");
      return;
    }

    if (!isPro) {
      const expired = await trialService.isTrialExpired();
      if (expired) {
        Alert.alert(
          "Free Trial Ended",
          "You've used all your free try-ons. Upgrade to Pro for unlimited access!",
          [
            { text: "Later", style: "cancel" },
            { text: "Upgrade", onPress: () => navigation.navigate("Subscription") },
          ]
        );
        return;
      }
    }

    setLoading(true);
    try {
      const response = await tryOnApi.generateTryOn({
        userImage,
        clothingImage,
      });
      setResultImage(response.resultImage);
      setViewMode("result");
      if (!isPro) {
        await trialService.incrementTryOn();
        const remaining = await trialService.remainingTryOns();
        setRemainingTryOns(remaining);
      }
    } catch {
      Alert.alert("Error", "Failed to generate try-on. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!resultImage) return;
    try {
      const Sharing = require("expo-sharing");
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(resultImage, {
          mimeType: "image/jpeg",
          dialogTitle: "Share your try-on",
        });
      }
    } catch {
      Alert.alert("Share", "Sharing is not available on this platform.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row justify-between items-center px-4 h-14 border-b border-[#E5E7EB]">
        <TouchableOpacity className="p-2 -ml-2">
          <Text className="text-xl">☰</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-[#111111]">Try On</Text>
        <View className="flex-row items-center">
          {!isPro && (
            <View className="bg-[#FFF7ED] px-2 py-1 rounded-full mr-2">
              <Text className="text-xs font-semibold text-[#F59E0B]">
                {remainingTryOns} free
              </Text>
            </View>
          )}
          <TouchableOpacity className="p-2 -mr-2">
            <Text className="text-xl">🛍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-xl font-semibold text-[#111111] mt-6 mb-3">
          Your Photo
        </Text>
        <TouchableOpacity
          onPress={pickUserImage}
          className="rounded-2xl border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] items-center justify-center p-8 min-h-[200px]"
        >
          {userImage ? (
            <Image
              source={{ uri: userImage }}
              className="w-full h-48 rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <>
              <Text className="text-5xl mb-2">📷</Text>
              <Text className="text-sm text-[#6B7280] text-center">
                Tap to upload a full-body photo{"\n"}for the best AI try-on experience.
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mt-6 mb-3">
          <Text className="text-xl font-semibold text-[#111111]">
            Selected Item
          </Text>
          {clothingImage && (
            <TouchableOpacity onPress={pickClothingImage}>
              <Text className="text-sm font-medium text-[#F59E0B]">Change</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={pickClothingImage}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-4 flex-row items-center"
        >
          {clothingImage ? (
            <>
              <Image
                source={{ uri: clothingImage }}
                className="w-20 h-24 rounded-lg"
                resizeMode="cover"
              />
              <View className="ml-4 flex-1">
                <Text className="text-xs text-[#6B7280] uppercase tracking-wider">
                  Selected Garment
                </Text>
                <Text className="text-sm font-bold text-[#111111] mt-1">
                  Clothing Item
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text className="text-4xl mr-4">👗</Text>
              <Text className="text-sm text-[#6B7280] flex-1">
                Tap to select a clothing item
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTryOn}
          disabled={loading}
          className="w-full h-[52px] bg-[#F59E0B] rounded-full flex-row items-center justify-center mt-6"
          activeOpacity={0.9}
          style={{
            shadowColor: "#F59E0B",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 4,
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="mr-2 text-lg">✨</Text>
              <Text className="text-base font-bold text-white">Try It On</Text>
            </>
          )}
        </TouchableOpacity>

        <Text className="text-xl font-semibold text-[#111111] mt-8 mb-3">
          Result Preview
        </Text>
        <View className="rounded-2xl border border-[#E5E7EB] overflow-hidden bg-[#F9FAFB] min-h-[300px] items-center justify-center relative">
          {resultImage ? (
            <Image
              source={{ uri: resultImage }}
              className="w-full h-[300px]"
              resizeMode="cover"
            />
          ) : (
            <>
              <Text className="text-6xl text-[#D1D5DB] mb-4">🤖</Text>
              <Text className="text-sm text-[#6B7280] text-center max-w-[250px]">
                Upload your photo and tap "Try It On" to see the AI-generated fitting here.
              </Text>
            </>
          )}

          {resultImage && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
              <View className="bg-white border border-[#E5E7EB] rounded-full p-1 flex-row">
                <TouchableOpacity
                  onPress={() => setViewMode("original")}
                  className={`px-4 py-1.5 rounded-full ${
                    viewMode === "original" ? "bg-[#111111]" : ""
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      viewMode === "original" ? "text-white" : "text-[#6B7280]"
                    }`}
                  >
                    Original
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setViewMode("result")}
                  className={`px-4 py-1.5 rounded-full ${
                    viewMode === "result" ? "bg-[#111111]" : ""
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      viewMode === "result" ? "text-white" : "text-[#6B7280]"
                    }`}
                  >
                    AI Try-On
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {resultImage && (
          <TouchableOpacity
            onPress={handleShare}
            className="w-full h-[48px] border border-[#F59E0B] rounded-full items-center justify-center mt-4 mb-8"
          >
            <Text className="text-base font-bold text-[#F59E0B]">
              Share Result
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
