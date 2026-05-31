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

import { CV_URL, SERVICES, TOOLS } from "@/constants/data";
import { F } from "@/constants/fonts";
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

function RevealItem({
  scrollY,
  screenHeight,
  style,
  children,
  offset = 60,
}: {
  scrollY: SharedValue<number>;
  screenHeight: number;
  style?: object;
  children?: React.ReactNode;
  offset?: number;
}) {
  const layoutY = useSharedValue(9999);

  const progress = useDerivedValue(() => {
    const isVisible = scrollY.value + screenHeight > layoutY.value + offset;
    return isVisible ? withTiming(1, { duration: 480 }) : withTiming(0, { duration: 0 });
  });

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 24 }],
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

function RevealToolTag({
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
    const isVisible = scrollY.value + screenHeight > layoutY.value + 80;
    return isVisible ? withTiming(1, { duration: 400 }) : withTiming(0, { duration: 0 });
  });

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.85 + 0.15 * progress.value }],
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

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const topPad = Platform.OS === "web" ? 67 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 84;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  async function handleDownloadCV() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(CV_URL);
  }

  const headerAnim = useFadeSlideIn(0);
  const imageAnim = useFadeSlideIn(80);
  const bioAnim = useFadeSlideIn(160);

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
          <Text style={s.sectionLabel}>ABOUT ME</Text>
          <Text style={s.sectionTitle}>Not Your Average{"\n"}Dev.</Text>
        </Animated.View>

        <Animated.View style={imageAnim}>
          <Image
            source={require("@/assets/images/about.png")}
            style={s.aboutImage}
            resizeMode="cover"
          />
        </Animated.View>

        <Animated.Text style={[s.bio, bioAnim]}>
          I'm Lukman — a creative developer with 8+ years of experience building
          digital products that sit at the intersection of art and engineering.
          {"\n\n"}
          My work spans web architecture, mobile apps, and generative art. I
          believe the best software is invisible — it gets out of the way and
          lets people do what they came to do.
        </Animated.Text>

        <ScalePressable
          style={s.cvBtn}
          onPress={handleDownloadCV}
          testID="download-cv-btn"
        >
          <Feather name="download" size={18} color={colors.primaryForeground} />
          <Text style={s.cvBtnText}>Download CV</Text>
        </ScalePressable>

        <RevealItem scrollY={scrollY} screenHeight={screenHeight} style={s.divider} />

        <RevealItem scrollY={scrollY} screenHeight={screenHeight} style={s.block}>
          <Text style={s.blockLabel}>SERVICES</Text>
          <Text style={s.blockTitle}>What I Do</Text>
          <View style={s.servicesGrid}>
            {SERVICES.map((service) => (
              <RevealItem
                key={service.id}
                scrollY={scrollY}
                screenHeight={screenHeight}
                style={s.serviceCard}
                offset={100}
              >
                <View style={s.serviceIconWrap}>
                  <Feather
                    name={service.icon as keyof typeof Feather.glyphMap}
                    size={22}
                    color={colors.primary}
                  />
                </View>
                <Text style={s.serviceTitle}>{service.title}</Text>
                <Text style={s.serviceDesc}>{service.description}</Text>
              </RevealItem>
            ))}
          </View>
        </RevealItem>

        <RevealItem scrollY={scrollY} screenHeight={screenHeight} style={s.divider} />

        <RevealItem
          scrollY={scrollY}
          screenHeight={screenHeight}
          style={s.block}
          offset={80}
        >
          <Text style={s.blockLabel}>TOOLS</Text>
          <Text style={s.blockTitle}>My Stack</Text>
          <View style={s.toolsWrap}>
            {TOOLS.map((tool) => (
              <RevealToolTag
                key={tool}
                scrollY={scrollY}
                screenHeight={screenHeight}
                style={s.toolTag}
              >
                <Text style={s.toolText}>{tool}</Text>
              </RevealToolTag>
            ))}
          </View>
        </RevealItem>
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
    aboutImage: {
      width: "100%",
      height: 220,
      marginBottom: 24,
    },
    bio: {
      paddingHorizontal: 24,
      fontSize: 15,
      fontFamily: F[400],
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
      fontFamily: F[600],
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
      fontFamily: F[600],
      letterSpacing: 3,
      color: colors.primary,
      marginBottom: 6,
    },
    blockTitle: {
      fontSize: 28,
      fontWeight: "700" as const,
      fontFamily: F[700],
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
      fontFamily: F[700],
      color: colors.foreground,
      marginBottom: 6,
    },
    serviceDesc: {
      fontSize: 14,
      fontFamily: F[400],
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
      fontFamily: F[600],
      color: colors.foreground,
    },
  });
}
