import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

import { SOCIAL_LINKS } from "@/constants/data";
import { F } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { FocusFadeView } from "@/components/FocusFadeView";

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

function useFadeSlideIn(delay = 0) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 480 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 18, stiffness: 115 }));
  }, []);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
}

function ScalePressable({
  style,
  onPress,
  disabled,
  testID,
  children,
}: {
  style: object | object[];
  onPress: () => void;
  disabled?: boolean;
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
      disabled={disabled}
      onPressIn={() => {
        if (disabled) return;
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(0.8, { duration: 80 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        opacity.value = withTiming(1, { duration: 120 });
      }}
      onPress={onPress}
    >
      <Animated.View style={[...(Array.isArray(style) ? style : [style]), animStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

function AnimatedSocialItem({
  index,
  style,
  onPress,
  testID,
  children,
}: {
  index: number;
  style: object;
  onPress: () => void;
  testID?: string;
  children: React.ReactNode;
}) {
  const delay = 380 + index * 60;
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-16);
  const scale = useSharedValue(1);
  const pressOpacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    translateX.value = withDelay(delay, withSpring(0, { damping: 18, stiffness: 120 }));
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value * pressOpacity.value,
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  return (
    <Pressable
      testID={testID}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
        pressOpacity.value = withTiming(0.8, { duration: 80 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        pressOpacity.value = withTiming(1, { duration: 120 });
      }}
      onPress={onPress}
    >
      <Animated.View style={[style, animStyle]}>{children}</Animated.View>
    </Pressable>
  );
}

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

  const headerAnim = useFadeSlideIn(0);
  const formAnim = useFadeSlideIn(100);
  const dividerAnim = useFadeSlideIn(260);
  const socialTitleAnim = useFadeSlideIn(320);

  const s = styles(colors);
  const canSend =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0;

  return (
    <FocusFadeView>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[s.sectionHeader, headerAnim]}>
          <Text style={s.sectionLabel}>GET IN TOUCH</Text>
          <Text style={s.sectionTitle}>Let's Build{"\n"}Something Insane.</Text>
        </Animated.View>

        <Animated.View style={[s.form, formAnim]}>
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

          <ScalePressable
            style={[s.sendBtn, !canSend && s.sendBtnDisabled]}
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
          </ScalePressable>
        </Animated.View>

        <Animated.View style={[s.divider, dividerAnim]} />

        <View style={s.socialSection}>
          <Animated.Text style={[s.socialTitle, socialTitleAnim]}>
            Or find me on
          </Animated.Text>
          <View style={s.socialList}>
            {SOCIAL_ENTRIES.map((entry, index) => (
              <AnimatedSocialItem
                key={entry.key}
                index={index}
                style={s.socialItem}
                onPress={() => handleSocial(SOCIAL_LINKS[entry.key])}
                testID={`contact-social-${entry.key}`}
              >
                <View style={s.socialIcon}>
                  <Feather name={entry.icon} size={20} color={colors.primary} />
                </View>
                <Text style={s.socialLabel}>{entry.label}</Text>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={colors.mutedForeground}
                />
              </AnimatedSocialItem>
            ))}
          </View>
        </View>
      </ScrollView>
    </FocusFadeView>
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
      fontFamily: F[600],
      letterSpacing: 3,
      color: colors.primary,
      marginBottom: 6,
    },
    sectionTitle: {
      fontSize: 36,
      fontWeight: "700" as const,
      fontFamily: F[700],
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
      fontFamily: F[600],
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
      fontFamily: F[400],
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
      fontFamily: F[600],
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
      fontFamily: F[600],
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
      fontFamily: F[500],
      color: colors.foreground,
    },
  });
}
