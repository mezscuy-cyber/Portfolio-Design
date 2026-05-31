import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SOCIAL_LINKS, STATS } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const SOCIAL_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  github: "github",
  linkedin: "linkedin",
  twitter: "twitter",
  instagram: "instagram",
};

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad =
    Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  async function handleSocial(url: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  }

  async function handleHire() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(SOCIAL_LINKS.email);
  }

  const s = styles(colors);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.header}>
        <Text style={s.logoText}>XENODEV</Text>
        <View style={s.availableBadge}>
          <View style={s.availableDot} />
          <Text style={s.availableText}>Available</Text>
        </View>
      </View>

      <View style={s.heroSection}>
        <Image
          source={require("@/assets/images/profile.png")}
          style={s.profileImage}
          resizeMode="cover"
        />
        <Text style={s.heroName}>LUKMAN.</Text>
        <Text style={s.heroTitle}>CREATIVE DEVELOPER</Text>
        <Text style={s.heroBio}>
          I craft immersive digital experiences that merge bold design with
          precise engineering. From concept to deployment, every pixel matters.
        </Text>
      </View>

      <View style={s.statsRow}>
        {STATS.map((stat, i) => (
          <View key={stat.label} style={[s.statItem, i < STATS.length - 1 && s.statBorder]}>
            <Text style={s.statValue}>{stat.value}</Text>
            <Text style={s.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={s.socialRow}>
        {Object.entries(SOCIAL_ICONS).map(([key, icon]) => (
          <Pressable
            key={key}
            style={({ pressed }) => [s.socialBtn, pressed && s.pressed]}
            onPress={() => handleSocial(SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS])}
            testID={`social-${key}`}
          >
            <Feather name={icon} size={20} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>

      <View style={s.ctaRow}>
        <Pressable
          style={({ pressed }) => [s.hireBtn, pressed && s.pressed]}
          onPress={handleHire}
          testID="hire-btn"
        >
          <Text style={s.hireBtnText}>Hire Me</Text>
          <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [s.ghostBtn, pressed && s.pressed]}
          onPress={() => handleSocial(SOCIAL_LINKS.github)}
          testID="github-btn"
        >
          <Feather name="github" size={18} color={colors.foreground} />
          <Text style={s.ghostBtnText}>View Work</Text>
        </Pressable>
      </View>
    </ScrollView>
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
