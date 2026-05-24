import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tryOnApi } from "../services/api";

export default function AuthScreen({ onComplete, onSkip }: {
  onComplete: () => void;
  onSkip: () => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  const signIn = async (provider: "google" | "apple") => {
    setLoading(provider);
    try {
      if (provider === "google") {
        if (await tryOnApi.isAnonymousUser()) {
          await tryOnApi.linkToGoogle();
        } else {
          await tryOnApi.signInWithGoogle();
        }
      } else {
        if (await tryOnApi.isAnonymousUser()) {
          await tryOnApi.linkToApple();
        } else {
          await tryOnApi.signInWithApple();
        }
      }
      onComplete();
    } catch (e: any) {
      Alert.alert("Sign In Failed", e.message || "Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-20 h-20 rounded-2xl bg-[#F59E0B] items-center justify-center mb-6">
          <Text className="text-4xl">👕</Text>
        </View>
        <Text className="text-2xl font-bold text-[#111111] text-center mb-2">
          Create Your Account
        </Text>
        <Text className="text-sm text-[#6B7280] text-center mb-8 max-w-[280px]">
          Save your wardrobe, sync across devices, and unlock unlimited try-ons.
        </Text>

        <TouchableOpacity
          onPress={() => signIn("google")}
          disabled={loading !== null}
          className="w-full h-[52px] border border-[#E5E7EB] rounded-xl flex-row items-center justify-center mb-3"
        >
          {loading === "google" ? (
            <ActivityIndicator color="#111111" />
          ) : (
            <>
              <Text className="text-lg mr-3">G</Text>
              <Text className="text-base font-semibold text-[#111111]">
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signIn("apple")}
          disabled={loading !== null}
          className="w-full h-[52px] bg-[#111111] rounded-xl flex-row items-center justify-center mb-6"
        >
          {loading === "apple" ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-lg mr-3 text-white"></Text>
              <Text className="text-base font-semibold text-white">
                Continue with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onSkip}>
          <Text className="text-sm text-[#6B7280]">
            Skip for now —{" "}
            <Text className="text-[#F59E0B] font-semibold">3 free try-ons</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
