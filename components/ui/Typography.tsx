import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/lib/theme';

interface Props {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  style?: TextStyle;
  align?: 'left' | 'center' | 'right';
}

export function Typography({ children, variant = 'body', color, style, align = 'left' }: Props) {
  return (
    <Text style={[styles[variant], { color: color ?? Colors.textPrimary, textAlign: align }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: { fontFamily: Fonts.extraBold, fontSize: 28, lineHeight: 36 },
  h2: { fontFamily: Fonts.bold, fontSize: 22, lineHeight: 30 },
  h3: { fontFamily: Fonts.semiBold, fontSize: 18, lineHeight: 26 },
  body: { fontFamily: Fonts.regular, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: Fonts.regular, fontSize: 12, lineHeight: 18 },
  label: { fontFamily: Fonts.medium, fontSize: 13, lineHeight: 18, letterSpacing: 0.5 },
});
