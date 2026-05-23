import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlanCard from "../components/PlanCard";
import { Plan } from "../types";

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "5 AI try-ons per day",
      "Standard resolution exports",
      "Basic wardrobe storage",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    recommended: true,
    features: [
      "Unlimited AI try-ons",
      "High resolution (4K) exports",
      "Advanced lighting controls",
      "Unlimited wardrobe storage",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    features: [
      "Everything in Pro",
      "Custom digital avatars",
      "Priority render queue",
    ],
  },
];

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const handleStartTrial = () => {
    Alert.alert(
      "Start Free Trial",
      "You selected the " +
        PLANS.find((p) => p.id === selectedPlan)?.name +
        " plan. Payment via Razorpay/Stripe will be integrated here.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row justify-center items-center px-4 h-14 border-b border-[#E5E7EB]">
        <TouchableOpacity className="absolute left-4">
          <Text className="text-xl">✕</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-[#111111]">TryOn AI</Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-8 mb-6">
          <Text className="text-2xl font-bold text-[#111111]">
            Choose Your Plan
          </Text>
          <Text className="text-sm text-[#6B7280] mt-2 text-center">
            Unlock unlimited styles and premium AI fitting tools.
          </Text>
        </View>

        <View className="gap-4">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-4">
        <TouchableOpacity
          onPress={handleStartTrial}
          className="w-full h-[52px] bg-[#F59E0B] rounded-2xl items-center justify-center"
          activeOpacity={0.9}
          style={{
            shadowColor: "#F59E0B",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 4,
          }}
        >
          <Text className="text-base font-bold text-white">
            Start Free Trial
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
