import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, BorderRadius, Spacing } from '@/lib/theme';

const STATEMENTS = [
  "I am a confident, capable gamer who grows with every session.",
  "I belong in this community. My presence has value.",
  "Every loss is data. Every win is proof. I keep leveling up.",
  "I face challenges head-on. I am not afraid to be a beginner.",
  "My journey is uniquely mine. I celebrate my progress.",
  "I am building skills that transfer beyond the screen.",
  "I show up, I practice, and I improve every single day.",
  "I am resilient. Lag, loss, or tilt — I reset and come back stronger.",
  "I am worthy of taking up space in gaming spaces.",
  "I am a work in progress, and that is something to be proud of.",
];

export function IdentityCard() {
  const [index, setIndex] = useState(() => new Date().getDate() % STATEMENTS.length);
  const fadeAnim = new Animated.Value(1);

  const shuffle = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIndex((prev) => (prev + 1) % STATEMENTS.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <LinearGradient
      colors={['#2D173D', '#1A0F2E', '#0D0D0D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="flash" size={12} color={Colors.levelUpPurple} />
          <Text style={styles.badgeText}>DAILY IDENTITY</Text>
        </View>
        <TouchableOpacity onPress={shuffle} style={styles.refreshBtn}>
          <Ionicons name="refresh" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Animated.Text style={[styles.statement, { opacity: fadeAnim }]}>
        {STATEMENTS[index]}
      </Animated.Text>

      <View style={styles.footer}>
        <Ionicons name="heart" size={14} color={Colors.levelUpPurple} />
        <Text style={styles.footerText}>Read this. Believe it.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(110, 68, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(110, 68, 255, 0.3)',
  },
  badgeText: {
    fontFamily: Fonts.bold,
    fontSize: 10,
    color: Colors.levelUpPurple,
    letterSpacing: 1,
  },
  refreshBtn: { padding: 4 },
  statement: {
    fontFamily: Fonts.semiBold,
    fontSize: 17,
    color: Colors.softIvory,
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
