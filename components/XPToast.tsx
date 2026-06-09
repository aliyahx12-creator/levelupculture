import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, BorderRadius } from '@/lib/theme';

interface Props {
  amount: number;
  leveledUp?: boolean;
  visible: boolean;
  onHide: () => void;
}

export function XPToast({ amount, leveledUp = false, visible, onHide }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (!visible) return;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -10, duration: 300, useNativeDriver: true }),
        ]).start(() => {
          onHide();
          translateY.setValue(20);
        });
      }, 2000);
    });
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity, transform: [{ translateY }] }]}>
      <Ionicons name="flash" size={14} color="#FFC107" />
      <Text style={styles.text}>+{amount} XP</Text>
      {leveledUp && (
        <View style={styles.levelUpBadge}>
          <Text style={styles.levelUpText}>LEVEL UP!</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1A0F2E',
    borderWidth: 1,
    borderColor: Colors.levelUpPurple,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 999,
  },
  text: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.softIvory },
  levelUpBadge: {
    backgroundColor: Colors.levelUpPurple,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  levelUpText: { fontFamily: Fonts.extraBold, fontSize: 10, color: Colors.softIvory, letterSpacing: 1 },
});
