import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import {
  Image,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PROJECTS } from "@/constants/data";
import { useColors } from "@/hooks/useColors";
import { FocusFadeView } from "@/components/FocusFadeView";

function useFadeSlideIn(delay = 0) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 450 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 18, stiffness: 120 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

function ScalePressable({
  style,
  onPress,
  testID,
  children,
}: {
  style: object;
  onPress: () => void;
  testID?: string;
  children: React.ReactNode;
}) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable
      testID={testID}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(0.75, { duration: 80 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(1, { duration: 120 });
      }}
      onPress={onPress}
    >
      <Animated.View style={[style, animStyle]}>{children}</Animated.View>
    </Pressable>
  );
}

function RevealCard({
  scrollY,
  screenHeight,
  style,
  children,
}: {
  scrollY: SharedValue<number>;
  screenHeight: number;
  style: object;
  children: React.ReactNode;
}) {
  const layoutY = useSharedValue(9999);

  const progress = useDerivedValue(() => {
    const isVisible = scrollY.value + screenHeight > layoutY.value + 60;
    return isVisible ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 0 });
  });

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 32 }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    layoutY.value = e.nativeEvent.layout.y;
  };

  return (
    <Animated.View style={[style, animStyle]} onLayout={onLayout}>
      {children}
    </Animated.View>
  );
}

export default function ProjectsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const topPad = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  async function handleProject(url: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  }

  const headerAnim = useFadeSlideIn(0);
  const s = styles(colors);

  return (
    <FocusFadeView>
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View style={[s.sectionHeader, headerAnim]}>
          <Text style={s.sectionLabel}>SELECTED WORK</Text>
          <Text style={s.sectionTitle}>Projects</Text>
        </Animated.View>

        <View style={s.list}>
          {PROJECTS.map((project) => (
            <RevealCard
              key={project.id}
              scrollY={scrollY}
              screenHeight={screenHeight}
              style={s.card}
            >
              <Image
                source={project.image}
                style={s.cardImage}
                resizeMode="cover"
              />
              <View style={s.cardBody}>
                <Text style={s.cardCategory}>{project.category}</Text>
                <Text style={s.cardTitle}>{project.title}</Text>
                <Text style={s.cardDesc}>{project.description}</Text>
                <View style={s.tagRow}>
                  {project.tags.map((tag) => (
                    <View key={tag} style={s.tag}>
                      <Text style={s.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <ScalePressable
                  style={s.viewBtn}
                  onPress={() => handleProject(project.url)}
                  testID={`project-${project.id}`}
                >
                  <Text style={s.viewBtnText}>View Project</Text>
                  <Feather name="arrow-right" size={16} color={colors.primary} />
                </ScalePressable>
              </View>
            </RevealCard>
          ))}
        </View>
      </Animated.ScrollView>
    </FocusFadeView>
  );
}

function styles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    sectionHeader: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: "600" as const,
      letterSpacing: 3,
      color: colors.primary,
      marginBottom: 6,
    },
    sectionTitle: {
      fontSize: 36,
      fontWeight: "700" as const,
      color: colors.foreground,
      letterSpacing: -0.5,
    },
    list: {
      paddingHorizontal: 24,
      gap: 20,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: 200,
      backgroundColor: colors.secondary,
    },
    cardBody: {
      padding: 20,
    },
    cardCategory: {
      fontSize: 11,
      fontWeight: "600" as const,
      letterSpacing: 2,
      color: colors.primary,
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: "700" as const,
      color: colors.foreground,
      marginBottom: 8,
    },
    cardDesc: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.mutedForeground,
      marginBottom: 16,
    },
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 16,
    },
    tag: {
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    tagText: {
      fontSize: 12,
      fontWeight: "500" as const,
      color: colors.mutedForeground,
    },
    viewBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    viewBtnText: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.primary,
    },
  });
}
