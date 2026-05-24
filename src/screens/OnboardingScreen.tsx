import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingSlide from "../components/OnboardingSlide";
import DotIndicator from "../components/DotIndicator";
import { slides } from "../constants/onboardingData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingScreenProps {
  navigation: any;
  onFinish: () => void;
  onAuth: () => void;
}

export default function OnboardingScreen({
  navigation,
  onFinish,
  onAuth,
}: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isLastSlide = currentIndex === slides.length - 1;

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    },
    [currentIndex]
  );

  const goNext = () => {
    if (isLastSlide) {
      onFinish();
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="absolute top-0 right-0 z-20 px-4 pt-4">
        <TouchableOpacity onPress={onFinish} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text className="text-sm font-medium text-[#6B7280]">Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-8 pt-4">
        <DotIndicator
          total={slides.length}
          currentIndex={currentIndex}
          accentColors={slides.map((s) => s.accentColor)}
        />

        <TouchableOpacity
          onPress={goNext}
          activeOpacity={0.9}
          className="w-full h-[52px] rounded-2xl items-center justify-center flex-row mt-6"
          style={{
            backgroundColor: isLastSlide
              ? currentSlide.accentColor
              : "#111111",
          }}
        >
          <Text className="text-base font-bold text-white">
            {isLastSlide ? "Try for Free" : "Next"}
          </Text>
          {!isLastSlide && (
            <Text className="text-white text-lg ml-2">→</Text>
          )}
        </TouchableOpacity>

        {isLastSlide ? (
          <TouchableOpacity className="items-center mt-5" onPress={onAuth}>
            <Text className="text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Text className="font-semibold text-[#F59E0B] underline">
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="items-center mt-5" onPress={onFinish}>
            <Text className="text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Text className="font-semibold text-[#111111] underline">
                Log in
              </Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
