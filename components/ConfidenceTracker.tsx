import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { awardXP, XP_REWARDS } from '@/lib/xp';
import { XPToast } from '@/components/XPToast';
import { Colors, Fonts, BorderRadius, Spacing } from '@/lib/theme';

const LEVELS = [
  { score: 1, label: 'Rookie',   color: '#FF6B6B', icon: 'skull-outline'      },
  { score: 2, label: 'Starter',  color: '#FF9800', icon: 'flame-outline'       },
  { score: 3, label: 'Rising',   color: '#FFC107', icon: 'trending-up-outline' },
  { score: 4, label: 'Leveling', color: '#66BB6A', icon: 'shield-outline'      },
  { score: 5, label: 'Legend',   color: '#6E44FF', icon: 'trophy-outline'      },
] as const;

const SCORE_COLORS: Record<number, string> = {
  1: '#FF6B6B', 2: '#FF9800', 3: '#FFC107', 4: '#66BB6A', 5: '#6E44FF',
};

interface HistoryEntry { created_at: string; score: number; }

interface Props {
  userId: string;
}

export function ConfidenceTracker({ userId }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [loggedToday, setLoggedToday] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState('');
  const [xpToast, setXPToast] = useState<{ amount: number; leveledUp: boolean } | null>(null);

  const todayISO = new Date().toISOString().slice(0, 10);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const { data } = await supabase
      .from('confidence_logs')
      .select('created_at, score')
      .eq('user_id', userId)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    if (data) {
      setHistory(data);
      const todayEntry = data.find((e) => e.created_at.slice(0, 10) === todayISO);
      if (todayEntry) {
        setSelected(todayEntry.score);
        setLoggedToday(true);
      }
    }
    setLoading(false);
  }, [userId, todayISO]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLog = async () => {
    if (selected === null || loggedToday) return;
    setError('');
    setSaving(true);

    const { error: dbError } = await supabase
      .from('confidence_logs')
      .insert({ user_id: userId, score: selected });

    setSaving(false);

    if (dbError) {
      setError('Could not save. Try again.');
      return;
    }

    setLoggedToday(true);
    setHistory((prev) => [...prev, { created_at: new Date().toISOString(), score: selected }]);

    // Award XP
    const result = await awardXP(userId, XP_REWARDS.CONFIDENCE_LOG);
    setXPToast({ amount: XP_REWARDS.CONFIDENCE_LOG, leveledUp: result.leveledUp });
  };

  // Build last 7 days slots
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().slice(0, 10);
    const entry = history.find((e) => e.created_at.slice(0, 10) === iso);
    return { iso, score: entry?.score ?? null, dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0) };
  });

  const avgScore = history.length
    ? Math.round((history.reduce((s, e) => s + e.score, 0) / history.length) * 10) / 10
    : null;

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={Colors.levelUpPurple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {xpToast && (
        <XPToast
          amount={xpToast.amount}
          leveledUp={xpToast.leveledUp}
          visible={!!xpToast}
          onHide={() => setXPToast(null)}
        />
      )}
      <View style={styles.header}>
        <Ionicons name="pulse" size={16} color={Colors.levelUpPurple} />
        <Text style={styles.title}>Confidence Check-In</Text>
        {avgScore !== null && (
          <View style={styles.avgBadge}>
            <Text style={styles.avgText}>7-day avg: {avgScore}</Text>
          </View>
        )}
      </View>

      <Text style={styles.subtitle}>How are you feeling about your gaming today?</Text>

      {/* Level buttons */}
      <View style={styles.levels}>
        {LEVELS.map((level) => (
          <TouchableOpacity
            key={level.score}
            onPress={() => !loggedToday && setSelected(level.score)}
            disabled={loggedToday}
            style={[
              styles.levelBtn,
              selected === level.score && { borderColor: level.color, backgroundColor: `${level.color}20` },
              loggedToday && selected !== level.score && styles.dimmed,
            ]}
          >
            <Ionicons
              name={level.icon as any}
              size={22}
              color={selected === level.score ? level.color : Colors.textSecondary}
            />
            <Text style={[styles.levelLabel, selected === level.score && { color: level.color }]}>
              {level.label}
            </Text>
            <Text style={[styles.levelScore, selected === level.score && { color: level.color }]}>
              {level.score}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Log button or confirmed banner */}
      {!loggedToday ? (
        <TouchableOpacity
          onPress={handleLog}
          disabled={selected === null || saving}
          style={[styles.logBtn, (selected === null || saving) && styles.logBtnDisabled]}
        >
          {saving
            ? <ActivityIndicator color={Colors.softIvory} size="small" />
            : <Text style={styles.logBtnText}>Log Today's Confidence</Text>
          }
        </TouchableOpacity>
      ) : (
        <View style={styles.loggedBanner}>
          <Ionicons name="checkmark-circle" size={16} color="#66BB6A" />
          <Text style={styles.loggedText}>Logged! Come back tomorrow.</Text>
        </View>
      )}

      {/* 7-day history bar */}
      {history.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.historyLabel}>Last 7 Days</Text>
          <View style={styles.historyRow}>
            {last7.map(({ iso, score, dayLabel }) => (
              <View key={iso} style={styles.historyDay}>
                <View style={styles.historyBarTrack}>
                  {score !== null && (
                    <View
                      style={[
                        styles.historyBarFill,
                        {
                          height: `${(score / 5) * 100}%` as any,
                          backgroundColor: SCORE_COLORS[score],
                        },
                      ]}
                    />
                  )}
                </View>
                <Text style={[styles.historyDayLabel, iso === todayISO && { color: Colors.levelUpPurple }]}>
                  {dayLabel}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  centered: { alignItems: 'center', justifyContent: 'center', minHeight: 80 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  title: { fontFamily: Fonts.bold, fontSize: 16, color: Colors.softIvory, flex: 1 },
  avgBadge: {
    backgroundColor: 'rgba(110, 68, 255, 0.15)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: 'rgba(110, 68, 255, 0.3)',
  },
  avgText: { fontFamily: Fonts.bold, fontSize: 11, color: Colors.levelUpPurple },
  subtitle: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginBottom: Spacing.md },
  levels: { flexDirection: 'row', gap: 8, marginBottom: Spacing.md },
  levelBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 10,
    borderRadius: BorderRadius.md, borderWidth: 1,
    borderColor: Colors.border, backgroundColor: Colors.charcoalGray, gap: 4,
  },
  levelLabel: { fontFamily: Fonts.medium, fontSize: 10, color: Colors.textSecondary },
  levelScore: { fontFamily: Fonts.bold, fontSize: 13, color: Colors.textSecondary },
  dimmed: { opacity: 0.35 },
  logBtn: {
    backgroundColor: Colors.levelUpPurple, paddingVertical: 12,
    borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center', minHeight: 44,
  },
  logBtnDisabled: { opacity: 0.4 },
  logBtnText: { fontFamily: Fonts.semiBold, fontSize: 14, color: Colors.softIvory },
  loggedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    padding: 12, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.25)',
  },
  loggedText: { fontFamily: Fonts.medium, fontSize: 13, color: '#66BB6A' },
  errorText: { fontFamily: Fonts.medium, fontSize: 12, color: '#FF6B6B', marginBottom: 8 },
  historySection: { marginTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.md },
  historyLabel: { fontFamily: Fonts.medium, fontSize: 11, color: Colors.textSecondary, marginBottom: 8, letterSpacing: 0.5 },
  historyRow: { flexDirection: 'row', gap: 6, alignItems: 'flex-end', height: 48 },
  historyDay: { flex: 1, alignItems: 'center', gap: 4 },
  historyBarTrack: {
    flex: 1, width: '100%', backgroundColor: Colors.charcoalGray,
    borderRadius: 4, overflow: 'hidden', justifyContent: 'flex-end',
  },
  historyBarFill: { width: '100%', borderRadius: 4 },
  historyDayLabel: { fontFamily: Fonts.medium, fontSize: 10, color: Colors.textSecondary },
});
