import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <LinearGradient colors={['#0D0D0D', '#1A0F2E', '#0D0D0D']} style={styles.bg}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Ionicons name="game-controller" size={36} color={Colors.levelUpPurple} />
            </View>
            <Text style={styles.appName}>THE LEVEL UP CULTURE</Text>
            <Text style={styles.tagline}>Level your mind. Level your game.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.sub}>Log in to continue your journey</Text>

            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Input
              label="Email"
              value={email}
              onChangeText={(t) => { setEmail(t); setError(''); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholder="you@email.com"
              icon="mail-outline"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              isPassword
              placeholder="Your password"
              icon="lock-closed-outline"
            />

            <Button title="Log In" onPress={handleLogin} loading={loading} />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.signupRow}>
              <Text style={styles.signupPrompt}>New here? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Create an account</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: Spacing.lg },
  logoArea: { alignItems: 'center', marginBottom: Spacing.xl },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(110, 68, 255, 0.15)',
    borderWidth: 2, borderColor: Colors.levelUpPurple,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontFamily: Fonts.extraBold, fontSize: 18,
    color: Colors.softIvory, letterSpacing: 2, textAlign: 'center',
  },
  tagline: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.xl,
    padding: Spacing.xl, borderWidth: 1, borderColor: Colors.border,
  },
  heading: { fontFamily: Fonts.bold, fontSize: 24, color: Colors.softIvory, marginBottom: 6 },
  sub: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary, marginBottom: Spacing.md },
  errorBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.12)',
    borderWidth: 1, borderColor: 'rgba(244, 67, 54, 0.3)',
    borderRadius: BorderRadius.md, padding: 12, marginBottom: Spacing.md,
  },
  errorText: { fontFamily: Fonts.medium, fontSize: 13, color: '#FF6B6B', flex: 1 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginHorizontal: 12 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  signupPrompt: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary },
  signupLink: { fontFamily: Fonts.semiBold, fontSize: 14, color: Colors.levelUpPurple },
});
