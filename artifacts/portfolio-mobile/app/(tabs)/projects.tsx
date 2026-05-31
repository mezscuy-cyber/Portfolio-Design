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

import { PROJECTS } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function ProjectsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  async function handleProject(url: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  }

  const s = styles(colors);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>SELECTED WORK</Text>
        <Text style={s.sectionTitle}>Projects</Text>
      </View>

      <View style={s.list}>
        {PROJECTS.map((project) => (
          <View key={project.id} style={s.card}>
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
              <Pressable
                style={({ pressed }) => [s.viewBtn, pressed && s.pressed]}
                onPress={() => handleProject(project.url)}
                testID={`project-${project.id}`}
              >
                <Text style={s.viewBtnText}>View Project</Text>
                <Feather name="arrow-right" size={16} color={colors.primary} />
              </Pressable>
            </View>
          </View>
        ))}
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
    pressed: {
      opacity: 0.7,
    },
  });
}
