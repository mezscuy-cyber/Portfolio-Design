import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useEffect } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SOCIAL_LINKS, STATS } from "@/constants/data";
import { useTheme } from "@/contexts/ThemeContext";
import { useColors } from "@/hooks/useColors";
import { FocusFadeView } from "@/components/FocusFadeView";

const SOCIAL_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  github: "github",
  linkedin: "linkedin",
  twitter: "twitter",
  instagram: "instagram",
};

function useFadeSlideIn(delay = 0) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 18, stiffness: 120 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

function useFadeScaleIn(delay = 0) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.82);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    scale.value = withDelay(delay, withSpring(1, { damping: 16, stiffness: 130 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
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
        scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(0.8, { duration: 80 });
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

export default function HomeScreen() {
  const colors = useColors();
  const { isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  async function handleSocial(url: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  }

  async function handleHire() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(SOCIAL_LINKS.email);
  }

  async function handleToggleTheme() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTheme();
  }

  const headerAnim = useFadeSlideIn(0);
  const avatarAnim = useFadeScaleIn(120);
  const nameAnim = useFadeSlideIn(220);
  const titleAnim = useFadeSlideIn(320);
  const bioAnim = useFadeSlideIn(400);
  const statsAnim = useFadeSlideIn(480);
  const socialAnim = useFadeSlideIn(560);
  const ctaAnim = useFadeSlideIn(640);

  const s = styles(colors);

  return (
    <FocusFadeView>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[s.header, headerAnim]}>
          <Text style={s.logoText}>XENODEV</Text>
          <View style={s.headerRight}>
            <View style={s.availableBadge}>
              <View style={s.availableDot} />
              <Text style={s.availableText}>Available</Text>
            </View>
            <Pressable
              style={({ pressed }) => [s.themeToggle, pressed && s.pressed]}
              onPress={handleToggleTheme}
              testID="theme-toggle"
            >
              <Feather
                name={isDark ? "sun" : "moon"}
                size={18}
                color={colors.mutedForeground}
              />
            </Pressable>
          </View>
        </Animated.View>

        <View style={s.heroSection}>
          <Animated.View style={avatarAnim}>
            <Image
              source={require("@/assets/images/profile.png")}
              style={s.profileImage}
              resizeMode="cover"
            />
          </Animated.View>
          <Animated.Text style={[s.heroName, nameAnim]}>LUKMAN.</Animated.Text>
          <Animated.Text style={[s.heroTitle, titleAnim]}>
            CREATIVE DEVELOPER
          </Animated.Text>
          <Animated.Text style={[s.heroBio, bioAnim]}>
            I craft immersive digital experiences that merge bold design with
            precise engineering. From concept to deployment, every pixel matters.
          </Animated.Text>
        </View>

        <Animated.View style={[s.statsRow, statsAnim]}>
          {STATS.map((stat, i) => (
            <View
              key={stat.label}
              style={[s.statItem, i < STATS.length - 1 && s.statBorder]}
            >
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View style={[s.socialRow, socialAnim]}>
          {Object.entries(SOCIAL_ICONS).map(([key, icon]) => (
            <ScalePressable
              key={key}
              style={s.socialBtn}
              onPress={() =>
                handleSocial(SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS])
              }
              testID={`social-${key}`}
            >
              <Feather name={icon} size={20} color={colors.mutedForeground} />
            </ScalePressable>
          ))}
        </Animated.View>

        <Animated.View style={[s.ctaRow, ctaAnim]}>
          <ScalePressable
            style={s.hireBtn}
            onPress={handleHire}
            testID="hire-btn"
          >
            <Text style={s.hireBtnText}>Hire Me</Text>
            <Feather
              name="arrow-right"
              size={18}
              color={colors.primaryForeground}
            />
          </ScalePressable>
          <ScalePressable
            style={s.ghostBtn}
            onPress={() => handleSocial(SOCIAL_LINKS.github)}
            testID="github-btn"
          >
            <Feather name="github" size={18} color={colors.foreground} />
            <Text style={s.ghostBtnText}>View Work</Text>
          </ScalePressable>
        </Animated.View>
      </ScrollView>
    </FocusFadeView>
  );
}

function styles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    logoText: {
      fontSize: 13,
      fontWeight: "700" as const,
      letterSpacing: 3,
      color: colors.primary,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    availableBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    availableDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    availableText: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontWeight: "500" as const,
    },
    themeToggle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    heroSection: {
      alignItems: "center",
      paddingHorizontal: 24,
      marginBottom: 36,
    },
    profileImage: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 24,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    heroName: {
      fontSize: 48,
      fontWeight: "700" as const,
      color: colors.foreground,
      letterSpacing: -1,
      textAlign: "center",
    },
    heroTitle: {
      fontSize: 13,
      fontWeight: "600" as const,
      letterSpacing: 4,
      color: colors.primary,
      marginTop: 4,
      marginBottom: 16,
    },
    heroBio: {
      fontSize: 15,
      lineHeight: 24,
      color: colors.mutedForeground,
      textAlign: "center",
      maxWidth: 320,
    },
    statsRow: {
      flexDirection: "row",
      marginHorizontal: 24,
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 28,
      overflow: "hidden",
    },
    statItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 20,
    },
    statBorder: {
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    statValue: {
      fontSize: 26,
      fontWeight: "700" as const,
      color: colors.primary,
    },
    statLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      fontWeight: "500" as const,
      letterSpacing: 1,
      marginTop: 2,
    },
    socialRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
      marginBottom: 28,
    },
    socialBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    ctaRow: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 24,
    },
    hireBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: colors.radius,
    },
    hireBtnText: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: colors.primaryForeground,
    },
    ghostBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.secondary,
      paddingVertical: 16,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
    },
    ghostBtnText: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: colors.foreground,
    },
    pressed: {
      opacity: 0.7,
    },
  });
}
