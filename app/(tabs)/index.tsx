import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { getProgressToNextLevel } from '@/lib/xp';
import { IdentityCard } from '@/components/IdentityCard';
import { ConfidenceTracker } from '@/components/ConfidenceTracker';
import { XPBar } from '@/components/XPBar';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';

const STREAK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const TIPS = [
  "Take a 5-minute break between sessions. Your brain processes new skills during rest.",
  "Watch one replay per week. Seeing your own mistakes is faster than grinding blindly.",
  "Mute toxic teammates. Your mental clarity is worth more than their callouts.",
  "Sleep 7-8 hours. Reaction time and decision-making both tank without it.",
  "Set a session goal before you load in. Vague practice produces vague results.",
];

interface ProfileData { xp: number; level: number; }

export default function HomeScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({ xp: 0, level: 1 });
  const [streak, setStreak] = useState(0);
  const [activeWeekDays, setActiveWeekDays] = useState<number[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const displayName = (user?.user_metadata?.username as string) ?? user?.email?.split('@')[0] ?? 'Gamer';
  const todayTip = TIPS[new Date().getDay() % TIPS.length];

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setLoadingProfile(true);

    const [{ data: profileData }, { data: activityData }] = await Promise.all([
      supabase.from('profiles').select('xp, level').eq('id', user.id).single(),
      supabase
        .from('confidence_logs')
        .select('created_at')
        .eq('user_id', user.id)
        .gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()),
    ]);

    if (profileData) setProfile({ xp: profileData.xp ?? 0, level: profileData.level ?? 1 });

    if (activityData) {
      const days = activityData.map((e) => e.created_at.slice(0, 10));
      setStreak(calcStreak(days));
      setActiveWeekDays(getActiveWeekDayIndices(days));
    }

    setLoadingProfile(false);
  }, [user]);

  useFocusEffect(useCallback(() => { fetchProfile(); }, [fetchProfile]));

  const { current, max, level } = getProgressToNextLevel(profile.xp);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good{getTimeOfDay()},</Text>
            <Text style={styles.username}>{displayName} 👾</Text>
          </View>
          <View style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
          </View>
        </View>

        {/* XP Progress */}
        <View style={styles.xpCard}>
          {loadingProfile
            ? <ActivityIndicator color={Colors.levelUpPurple} />
            : <XPBar xp={current} maxXp={max} level={level} />
          }
        </View>

        {/* Streak */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flame" size={16} color="#FF9800" />
            <Text style={styles.sectionTitle}>Weekly Streak</Text>
            <Text style={styles.streakCount}>{streak > 0 ? `${streak} day${streak !== 1 ? 's' : ''} 🔥` : 'Start today!'}</Text>
          </View>
          <View style={styles.streakRow}>
            {STREAK_DAYS.map((day, i) => (
              <View key={i} style={[styles.streakDay, activeWeekDays.includes(i) && styles.streakActive]}>
                <Text style={[styles.streakDayText, activeWeekDays.includes(i) && styles.streakDayActiveText]}>
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Identity Card */}
        <View style={styles.section}>
          <IdentityCard />
        </View>

        {/* Confidence Tracker */}
        {user && (
          <View style={styles.section}>
            <ConfidenceTracker userId={user.id} />
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickAction icon="book-outline" label="Log Session" color="#6E44FF" />
            <QuickAction icon="bar-chart-outline" label="My Stats" color="#4CAF50" />
            <QuickAction icon="people-outline" label="Community" color="#FF9800" />
            <QuickAction icon="star-outline" label="Goals" color="#F06292" />
          </View>
        </View>

        {/* Today's Tip */}
        <LinearGradient colors={['#2D173D', '#1A0F2E']} style={styles.tipCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb-outline" size={16} color="#FFC107" />
            <Text style={styles.tipLabel}>PRO TIP</Text>
          </View>
          <Text style={styles.tipText}>{todayTip}</Text>
        </LinearGradient>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <TouchableOpacity style={styles.quickItem} activeOpacity={0.7}>
      <View style={[styles.quickIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return ' morning';
  if (h < 17) return ' afternoon';
  return ' evening';
}

function calcStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const unique = [...new Set(dates)].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (unique[0] !== today && unique[0] !== yesterday) return 0;
  let streak = 0;
  let expected = unique[0];
  for (const d of unique) {
    if (d === expected) {
      streak++;
      const next = new Date(expected);
      next.setDate(next.getDate() - 1);
      expected = next.toISOString().slice(0, 10);
    } else break;
  }
  return streak;
}

function getActiveWeekDayIndices(dates: string[]): number[] {
  // Mon=0 ... Sun=6 matching STREAK_DAYS order
  const thisWeek = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    const day = d.getDay(); // 0=Sun
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((day + 6) % 7) + i);
    return monday.toISOString().slice(0, 10);
  });
  const dateSet = new Set(dates);
  return thisWeek.map((iso, i) => dateSet.has(iso) ? i : -1).filter((i) => i >= 0);
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.midnightBlack },
  scroll: { padding: Spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  greeting: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary },
  username: { fontFamily: Fonts.bold, fontSize: 22, color: Colors.softIvory, marginTop: 2 },
  notifBtn: { padding: 8 },
  xpCard: {
    backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.lg,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.border, minHeight: 52, justifyContent: 'center',
  },
  section: { marginBottom: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  sectionTitle: { fontFamily: Fonts.semiBold, fontSize: 15, color: Colors.softIvory, flex: 1 },
  streakCount: { fontFamily: Fonts.bold, fontSize: 13, color: '#FF9800' },
  streakRow: { flexDirection: 'row', gap: 8 },
  streakDay: {
    flex: 1, aspectRatio: 1, borderRadius: BorderRadius.sm,
    backgroundColor: Colors.charcoalGray, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  streakActive: { backgroundColor: 'rgba(110, 68, 255, 0.25)', borderColor: Colors.levelUpPurple },
  streakDayText: { fontFamily: Fonts.bold, fontSize: 12, color: Colors.textSecondary },
  streakDayActiveText: { color: Colors.levelUpPurple },
  quickActions: { flexDirection: 'row', gap: 8 },
  quickItem: { flex: 1, alignItems: 'center', gap: 6 },
  quickIcon: { width: 52, height: 52, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontFamily: Fonts.medium, fontSize: 11, color: Colors.textSecondary, textAlign: 'center' },
  tipCard: { borderRadius: BorderRadius.lg, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  tipLabel: { fontFamily: Fonts.bold, fontSize: 11, color: '#FFC107', letterSpacing: 1 },
  tipText: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary, lineHeight: 21 },
});
