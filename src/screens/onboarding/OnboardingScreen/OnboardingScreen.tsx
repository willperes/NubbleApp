import React, { useRef, useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { Box } from "@components";

import { OnboardingPage } from "./components/OnboardingPage";
import { OnboardingPageItem, onboardingPages } from "./onboardingData";

export function OnboardingScreen() {
  const [pageIndex, setPageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  function onPressNext() {
    const isLastPage = pageIndex === onboardingPages.length - 1;
    if (isLastPage) {
      onFinishOnboarding();
      return;
    }

    const nextIndex = pageIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setPageIndex(nextIndex);
  }

  function onFinishOnboarding() {
    // TODO: implement this
  }

  function renderItem({ item }: ListRenderItemInfo<OnboardingPageItem>) {
    return (
      <OnboardingPage
        pageItem={item}
        onPressNext={onPressNext}
        onPressSkip={onFinishOnboarding}
      />
    );
  }

  return (
    <Box flex={1}>
      <FlatList
        ref={flatListRef}
        data={onboardingPages}
        renderItem={renderItem}
        keyExtractor={({ title }) => title}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    </Box>
  );
}
