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

import { CV_URL, SERVICES, TOOLS } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  async function handleDownloadCV() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(CV_URL);
  }

  const s = styles(colors);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>ABOUT ME</Text>
        <Text style={s.sectionTitle}>Not Your Average{"\n"}Dev.</Text>
      </View>

      <Image
        source={require("@/assets/images/about.png")}
        style={s.aboutImage}
        resizeMode="cover"
      />

      <Text style={s.bio}>
        I'm Lukman — a creative developer with 8+ years of experience building
        digital products that sit at the intersection of art and engineering.
        {"\n\n"}
        My work spans web architecture, mobile apps, and generative art. I
        believe the best software is invisible — it gets out of the way and lets
        people do what they came to do.
      </Text>

      <Pressable
        style={({ pressed }) => [s.cvBtn, pressed && s.pressed]}
        onPress={handleDownloadCV}
        testID="download-cv-btn"
      >
        <Feather name="download" size={18} color={colors.primaryForeground} />
        <Text style={s.cvBtnText}>Download CV</Text>
      </Pressable>

      <View style={s.divider} />

      <View style={s.block}>
        <Text style={s.blockLabel}>SERVICES</Text>
        <Text style={s.blockTitle}>What I Do</Text>
        <View style={s.servicesGrid}>
          {SERVICES.map((service) => (
            <View key={service.id} style={s.serviceCard}>
              <View style={s.serviceIconWrap}>
                <Feather
                  name={service.icon as keyof typeof Feather.glyphMap}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <Text style={s.serviceTitle}>{service.title}</Text>
              <Text style={s.serviceDesc}>{service.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.divider} />

      <View style={s.block}>
        <Text style={s.blockLabel}>TOOLS</Text>
        <Text style={s.blockTitle}>My Stack</Text>
        <View style={s.toolsWrap}>
          {TOOLS.map((tool) => (
            <View key={tool} style={s.toolTag}>
              <Text style={s.toolText}>{tool}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
    aboutImage: {
      width: "100%",
      height: 220,
      marginBottom: 24,
    },
    bio: {
      paddingHorizontal: 24,
      fontSize: 15,
      lineHeight: 26,
      color: colors.mutedForeground,
      marginBottom: 20,
    },
    cvBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.primary,
      marginHorizontal: 24,
      paddingVertical: 14,
      borderRadius: colors.radius,
      marginBottom: 32,
    },
    cvBtnText: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: colors.primaryForeground,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: 24,
      marginBottom: 32,
    },
    block: {
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    blockLabel: {
      fontSize: 11,
      fontWeight: "600" as const,
      letterSpacing: 3,
      color: colors.primary,
      marginBottom: 6,
    },
    blockTitle: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: colors.foreground,
      marginBottom: 20,
      letterSpacing: -0.5,
    },
    servicesGrid: {
      gap: 12,
    },
    serviceCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: colors.radius,
      padding: 20,
    },
    serviceIconWrap: {
      width: 42,
      height: 42,
      borderRadius: 10,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    serviceTitle: {
      fontSize: 16,
      fontWeight: "700" as const,
      color: colors.foreground,
      marginBottom: 6,
    },
    serviceDesc: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.mutedForeground,
    },
    toolsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    toolTag: {
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    toolText: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.foreground,
    },
    pressed: {
      opacity: 0.7,
    },
  });
}
