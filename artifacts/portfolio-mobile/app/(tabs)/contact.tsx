import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SOCIAL_LINKS } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

interface SocialEntry {
  key: keyof typeof SOCIAL_LINKS;
  icon: keyof typeof Feather.glyphMap;
  label: string;
}

const SOCIAL_ENTRIES: SocialEntry[] = [
  { key: "github", icon: "github", label: "GitHub" },
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "twitter", icon: "twitter", label: "Twitter" },
  { key: "instagram", icon: "instagram", label: "Instagram" },
];

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  async function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const subject = encodeURIComponent(`Hey Lukman — from ${name}`);
    const body = encodeURIComponent(
      `Hi Lukman,\n\n${message}\n\nBest,\n${name}\n${email}`
    );
    Linking.openURL(`mailto:hello@xeno.dev?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  async function handleSocial(url: string) {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  }

  const s = styles(colors);
  const canSend = name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>GET IN TOUCH</Text>
        <Text style={s.sectionTitle}>Let's Build{"\n"}Something Insane.</Text>
      </View>

      <View style={s.form}>
        <View style={s.field}>
          <Text style={s.fieldLabel}>Name</Text>
          <TextInput
            style={s.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="words"
            testID="input-name"
          />
        </View>

        <View style={s.field}>
          <Text style={s.fieldLabel}>Email</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            keyboardType="email-address"
            testID="input-email"
          />
        </View>

        <View style={s.field}>
          <Text style={s.fieldLabel}>Message</Text>
          <TextInput
            style={[s.input, s.textarea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Tell me about your project..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            testID="input-message"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            s.sendBtn,
            !canSend && s.sendBtnDisabled,
            pressed && canSend && s.pressed,
          ]}
          onPress={handleSend}
          disabled={!canSend}
          testID="send-btn"
        >
          {sent ? (
            <>
              <Feather name="check" size={18} color={colors.primaryForeground} />
              <Text style={s.sendBtnText}>Sent!</Text>
            </>
          ) : (
            <>
              <Text style={s.sendBtnText}>Send Message</Text>
              <Feather name="send" size={18} color={colors.primaryForeground} />
            </>
          )}
        </Pressable>
      </View>

      <View style={s.divider} />

      <View style={s.socialSection}>
        <Text style={s.socialTitle}>Or find me on</Text>
        <View style={s.socialList}>
          {SOCIAL_ENTRIES.map((entry) => (
            <Pressable
              key={entry.key}
              style={({ pressed }) => [s.socialItem, pressed && s.pressed]}
              onPress={() => handleSocial(SOCIAL_LINKS[entry.key])}
              testID={`contact-social-${entry.key}`}
            >
              <View style={s.socialIcon}>
                <Feather name={entry.icon} size={20} color={colors.primary} />
              </View>
              <Text style={s.socialLabel}>{entry.label}</Text>
              <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
            </Pressable>
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
      marginBottom: 32,
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
    form: {
      paddingHorizontal: 24,
      gap: 16,
      marginBottom: 32,
    },
    field: {
      gap: 8,
    },
    fieldLabel: {
      fontSize: 13,
      fontWeight: "600" as const,
      color: colors.foreground,
      letterSpacing: 0.3,
    },
    input: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: colors.radius,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 15,
      color: colors.foreground,
    },
    textarea: {
      height: 120,
      paddingTop: 14,
    },
    sendBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: colors.radius,
      marginTop: 4,
    },
    sendBtnDisabled: {
      opacity: 0.4,
    },
    sendBtnText: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.primaryForeground,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: 24,
      marginBottom: 28,
    },
    socialSection: {
      paddingHorizontal: 24,
    },
    socialTitle: {
      fontSize: 13,
      fontWeight: "600" as const,
      color: colors.mutedForeground,
      letterSpacing: 1,
      marginBottom: 16,
    },
    socialList: {
      gap: 8,
    },
    socialItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: colors.radius,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    socialIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    socialLabel: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500" as const,
      color: colors.foreground,
    },
    pressed: {
      opacity: 0.7,
    },
  });
}
