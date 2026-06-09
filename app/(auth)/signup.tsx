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

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.'); return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.'); return false;
    }
    if (password !== confirm) {
      setError('Passwords do not match.'); return false;
    }
    return true;
  };

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { username: username.trim(), gamer_tag: gamerTag.trim() },
      },
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else if (data.user && !data.session) {
      setSuccess('Account created! Check your email to confirm, then log in.');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <LinearGradient colors={['#0D0D0D', '#1A0F2E', '#0D0D0D']} style={styles.bg}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.backRow}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.backBtn}>
                <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.headerArea}>
            <Text style={styles.heading}>Join the Culture</Text>
            <Text style={styles.sub}>Start your level-up journey today</Text>
          </View>

          <View style={styles.card}>
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={16} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {success ? (
              <View style={styles.successBanner}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
                <Text style={styles.successText}>{success}</Text>
                <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.goLoginBtn}>
                  <Text style={styles.goLoginText}>Log In →</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <Input
              label="Username *"
              value={username}
              onChangeText={(t) => { setUsername(t); setError(''); }}
              placeholder="YourName"
              autoCapitalize="words"
              icon="person-outline"
            />
            <Input
              label="Gamer Tag (optional)"
              value={gamerTag}
              onChangeText={setGamerTag}
              placeholder="xXProPlayerXx"
              autoCapitalize="none"
              icon="game-controller-outline"
            />
            <Input
              label="Email *"
              value={email}
              onChangeText={(t) => { setEmail(t); setError(''); }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@email.com"
              icon="mail-outline"
            />
            <Input
              label="Password *"
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              isPassword
              placeholder="Min 6 characters"
              icon="lock-closed-outline"
            />
            <Input
              label="Confirm Password *"
              value={confirm}
              onChangeText={(t) => { setConfirm(t); setError(''); }}
              isPassword
              placeholder="Repeat password"
              icon="shield-checkmark-outline"
            />

            <Button title="Create Account" onPress={handleSignup} loading={loading} />

            <View style={styles.loginRow}>
              <Text style={styles.loginPrompt}>Already a member? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Log in</Text>
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
  scroll: { flexGrow: 1, padding: Spacing.lg, paddingTop: Spacing.xl },
  backRow: { marginBottom: Spacing.md },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
  backText: { fontFamily: Fonts.medium, fontSize: 14, color: Colors.textSecondary },
  headerArea: { marginBottom: Spacing.lg },
  heading: { fontFamily: Fonts.bold, fontSize: 26, color: Colors.softIvory },
  sub: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.xl,
    padding: Spacing.xl, borderWidth: 1, borderColor: Colors.border,
  },
  errorBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.12)',
    borderWidth: 1, borderColor: 'rgba(244, 67, 54, 0.3)',
    borderRadius: BorderRadius.md, padding: 12, marginBottom: Spacing.md,
  },
  errorText: { fontFamily: Fonts.medium, fontSize: 13, color: '#FF6B6B', flex: 1 },
  successBanner: {
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: BorderRadius.md, padding: 12, marginBottom: Spacing.md, gap: 8,
  },
  successText: { fontFamily: Fonts.medium, fontSize: 13, color: '#4CAF50' },
  goLoginBtn: { alignSelf: 'flex-start' },
  goLoginText: { fontFamily: Fonts.bold, fontSize: 13, color: Colors.levelUpPurple },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.md },
  loginPrompt: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary },
  loginLink: { fontFamily: Fonts.semiBold, fontSize: 14, color: Colors.levelUpPurple },
});
