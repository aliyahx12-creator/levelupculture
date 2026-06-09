import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { XPBar } from '@/components/XPBar';
import { getProgressToNextLevel } from '@/lib/xp';
import {
  scheduleDailyReminder,
  cancelDailyReminder,
  areNotificationsEnabled,
} from '@/lib/notifications';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';

interface Stats {
  xp: number;
  level: number;
  journalCount: number;
  confidenceCount: number;
  streak: number;
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

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const displayName = (user?.user_metadata?.username as string) ?? user?.email?.split('@')[0] ?? 'Gamer';
  const gamerTag = (user?.user_metadata?.gamer_tag as string) ?? null;

  const [stats, setStats] = useState<Stats>({ xp: 0, level: 1, journalCount: 0, confidenceCount: 0, streak: 0 });
  const [loading, setLoading] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [togglingNotif, setTogglingNotif] = useState(false);
  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const [
      { data: profile },
      { count: journalCount },
      { count: confidenceCount },
      { data: activityDates },
    ] = await Promise.all([
      supabase.from('profiles').select('xp, level').eq('id', user.id).single(),
      supabase.from('journal_entries').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('confidence_logs').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase
        .from('confidence_logs')
        .select('created_at')
        .eq('user_id', user.id)
        .gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString()),
    ]);

    const dates = (activityDates ?? []).map((e) => e.created_at.slice(0, 10));

    setStats({
      xp: profile?.xp ?? 0,
      level: profile?.level ?? 1,
      journalCount: journalCount ?? 0,
      confidenceCount: confidenceCount ?? 0,
      streak: calcStreak(dates),
    });

    const notifEnabled = await areNotificationsEnabled();
    setNotificationsOn(notifEnabled);
    setLoading(false);
  }, [user]);

  useFocusEffect(useCallback(() => { fetchStats(); }, [fetchStats]));

  const handleNotificationToggle = async (value: boolean) => {
    if (Platform.OS === 'web') return;
    setTogglingNotif(true);
    if (value) {
      const success = await scheduleDailyReminder(9, 0);
      setNotificationsOn(success);
    } else {
      await cancelDailyReminder();
      setNotificationsOn(false);
    }
    setTogglingNotif(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const { current, max, level } = getProgressToNextLevel(stats.xp);

  const achievements = [
    { icon: '🎮', title: 'First Login',   desc: 'Started the journey',         unlocked: true },
    { icon: '📓', title: 'First Entry',   desc: 'Logged first session',         unlocked: stats.journalCount >= 1 },
    { icon: '🔥', title: '7-Day Streak',  desc: 'Showed up 7 days straight',    unlocked: stats.streak >= 7 },
    { icon: '💪', title: 'Confident',     desc: 'Logged confidence 10 times',   unlocked: stats.confidenceCount >= 10 },
    { icon: '⭐', title: 'Legend',        desc: 'Reached Level 10',             unlocked: stats.level >= 10 },
    { icon: '🤝', title: 'Connected',     desc: 'Joined the Discord',           unlocked: false },
  ];
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Profile Header */}
        <LinearGradient colors={['#2D173D', '#1A0F2E']} style={styles.profileHeader} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{loading ? '?' : stats.level}</Text>
            </View>
          </View>
          <Text style={styles.displayName}>{displayName}</Text>
          {gamerTag ? <Text style={styles.gamerTag}>{gamerTag}</Text> : null}
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.xpContainer}>
            {loading
              ? <ActivityIndicator color={Colors.levelUpPurple} />
              : <XPBar xp={current} maxXp={max} level={level} />
            }
          </View>

          <View style={styles.statsRow}>
            {[
              { value: loading ? '—' : String(stats.journalCount), label: 'Sessions' },
              { value: loading ? '—' : String(stats.streak),        label: 'Streak' },
              { value: loading ? '—' : String(stats.xp),            label: 'Total XP' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <Text style={styles.achCount}>{unlockedCount}/{achievements.length} unlocked</Text>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((ach) => (
              <View key={ach.title} style={[styles.achCard, !ach.unlocked && styles.achLocked]}>
                <Text style={styles.achEmoji}>{ach.icon}</Text>
                <Text style={[styles.achTitle, !ach.unlocked && styles.achTextLocked]}>{ach.title}</Text>
                <Text style={styles.achDesc} numberOfLines={1}>{ach.desc}</Text>
                {ach.unlocked && <View style={styles.achDot} />}
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuList}>

            {/* Daily Reminders toggle */}
            <View style={[styles.menuItem, styles.menuItemBorder]}>
              <View style={styles.menuIconBox}>
                <Ionicons name="notifications-outline" size={18} color={Colors.textSecondary} />
              </View>
              <View style={styles.menuLabelGroup}>
                <Text style={styles.menuLabel}>Daily Identity Reminder</Text>
                <Text style={styles.menuSub}>
                  {Platform.OS === 'web'
                    ? 'Available on mobile app'
                    : notificationsOn ? 'Every day at 9:00 AM' : 'Off'}
                </Text>
              </View>
              {Platform.OS !== 'web' ? (
                togglingNotif
                  ? <ActivityIndicator color={Colors.levelUpPurple} size="small" />
                  : (
                    <Switch
                      value={notificationsOn}
                      onValueChange={handleNotificationToggle}
                      trackColor={{ false: Colors.charcoalGray, true: Colors.levelUpPurple }}
                      thumbColor={Colors.softIvory}
                    />
                  )
              ) : (
                <Text style={styles.webOnlyText}>Mobile only</Text>
              )}
            </View>

            {[
              { icon: 'person-outline',           label: 'Edit Profile' },
              { icon: 'shield-checkmark-outline', label: 'Privacy' },
              { icon: 'help-circle-outline',      label: 'Help & FAQ' },
              { icon: 'information-circle-outline', label: 'About The Level Up Culture' },
            ].map((item, i, arr) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.menuItem, i < arr.length - 1 && styles.menuItemBorder]}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconBox}>
                  <Ionicons name={item.icon as any} size={18} color={Colors.textSecondary} />
                </View>
                <Text style={[styles.menuLabel, { flex: 1 }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sign Out */}
        {!signOutConfirm ? (
          <TouchableOpacity style={styles.signOutBtn} onPress={() => setSignOutConfirm(true)} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={18} color="#FF6B6B" />
            <Text style={styles.signOutText}>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.signOutConfirmRow}>
            <Text style={styles.signOutConfirmText}>Are you sure?</Text>
            <TouchableOpacity style={styles.confirmYes} onPress={handleSignOut}>
              <Text style={styles.confirmYesText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmNo} onPress={() => setSignOutConfirm(false)}>
              <Text style={styles.confirmNoText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.version}>The Level Up Culture v1.0.0</Text>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.midnightBlack },
  scroll: { padding: Spacing.lg },
  profileHeader: {
    borderRadius: BorderRadius.xl, padding: Spacing.xl,
    alignItems: 'center', marginBottom: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border,
  },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(110, 68, 255, 0.3)',
    borderWidth: 3, borderColor: Colors.levelUpPurple,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: Fonts.extraBold, fontSize: 32, color: Colors.levelUpPurple },
  levelBadge: {
    position: 'absolute', bottom: -2, right: -2,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.levelUpPurple,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.deepPlum,
  },
  levelBadgeText: { fontFamily: Fonts.extraBold, fontSize: 11, color: Colors.softIvory },
  displayName: { fontFamily: Fonts.bold, fontSize: 22, color: Colors.softIvory, marginBottom: 2 },
  gamerTag: { fontFamily: Fonts.medium, fontSize: 14, color: Colors.levelUpPurple, marginBottom: 4 },
  email: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary, marginBottom: Spacing.md },
  xpContainer: { width: '100%', marginBottom: Spacing.md, minHeight: 36, justifyContent: 'center' },
  statsRow: {
    flexDirection: 'row', width: '100%',
    borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.md,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontFamily: Fonts.extraBold, fontSize: 20, color: Colors.softIvory },
  statLabel: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  section: { marginBottom: Spacing.lg },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.softIvory },
  achCount: { fontFamily: Fonts.medium, fontSize: 12, color: Colors.textSecondary },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  achCard: {
    width: '30%', backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md, padding: 10,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', gap: 3, position: 'relative',
  },
  achLocked: { opacity: 0.35 },
  achEmoji: { fontSize: 22 },
  achTitle: { fontFamily: Fonts.semiBold, fontSize: 11, color: Colors.softIvory, textAlign: 'center' },
  achTextLocked: { color: Colors.textSecondary },
  achDesc: { fontFamily: Fonts.regular, fontSize: 10, color: Colors.textSecondary, textAlign: 'center' },
  achDot: {
    position: 'absolute', top: 6, right: 6,
    width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.levelUpPurple,
  },
  menuList: {
    backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: Colors.border, overflow: 'hidden',
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: Spacing.md, gap: 12 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIconBox: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: Colors.charcoalGray, alignItems: 'center', justifyContent: 'center',
  },
  menuLabelGroup: { flex: 1 },
  menuLabel: { fontFamily: Fonts.medium, fontSize: 15, color: Colors.softIvory },
  menuSub: { fontFamily: Fonts.regular, fontSize: 11, color: Colors.textSecondary, marginTop: 1 },
  webOnlyText: { fontFamily: Fonts.regular, fontSize: 11, color: Colors.textSecondary },
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: 'rgba(255, 107, 107, 0.3)',
    backgroundColor: 'rgba(255, 107, 107, 0.08)', marginBottom: Spacing.md,
  },
  signOutText: { fontFamily: Fonts.semiBold, fontSize: 15, color: '#FF6B6B' },
  signOutConfirmRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.md,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  signOutConfirmText: { fontFamily: Fonts.medium, fontSize: 14, color: Colors.softIvory, flex: 1 },
  confirmYes: {
    backgroundColor: 'rgba(244,67,54,0.15)', borderRadius: BorderRadius.sm,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(244,67,54,0.3)',
  },
  confirmYesText: { fontFamily: Fonts.semiBold, fontSize: 13, color: '#FF6B6B' },
  confirmNo: { paddingHorizontal: 8, paddingVertical: 6 },
  confirmNoText: { fontFamily: Fonts.medium, fontSize: 13, color: Colors.textSecondary },
  version: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
});
