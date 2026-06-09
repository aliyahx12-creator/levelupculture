import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/lib/theme';

interface Props {
  xp: number;
  maxXp?: number;
  level?: number;
}

export function XPBar({ xp, maxXp = 500, level = 1 }: Props) {
  const progress = Math.min(xp / maxXp, 1);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.levelText}>LVL {level}</Text>
        <Text style={styles.xpText}>{xp} / {maxXp} XP</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` as any }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  levelText: { fontFamily: Fonts.bold, fontSize: 12, color: Colors.levelUpPurple, letterSpacing: 1 },
  xpText: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary },
  track: {
    height: 6,
    backgroundColor: Colors.charcoalGray,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.levelUpPurple,
  },
});
