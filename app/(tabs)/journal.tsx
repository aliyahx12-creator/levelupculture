import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { awardXP, XP_REWARDS } from '@/lib/xp';
import { XPToast } from '@/components/XPToast';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';
import type { JournalEntry } from '@/types';

const MOODS = [
  { key: 'great', label: 'Great', emoji: '🔥', color: '#6E44FF' },
  { key: 'good',  label: 'Good',  emoji: '😊', color: '#4CAF50' },
  { key: 'okay',  label: 'Okay',  emoji: '😐', color: '#FF9800' },
  { key: 'rough', label: 'Rough', emoji: '😤', color: '#F44336' },
] as const;

export default function JournalScreen() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formError, setFormError] = useState('');
  const [xpToast, setXPToast] = useState<{ amount: number; leveledUp: boolean } | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [game, setGame] = useState('');
  const [wins, setWins] = useState('');
  const [improvements, setImprovements] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('good');

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) setEntries(data as JournalEntry[]);
    setLoading(false);
    setRefreshing(false);
  }, [user]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEntries();
  };

  const resetForm = () => {
    setTitle(''); setContent(''); setGame('');
    setWins(''); setImprovements(''); setMood('good');
    setFormError('');
  };

  const handleSave = async () => {
    setFormError('');
    if (!title.trim() || !content.trim()) {
      setFormError('Please add a title and session notes.');
      return;
    }
    if (!user) return;
    setSaving(true);

    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
        game: game.trim() || null,
        mood,
        wins: wins.trim() || null,
        improvements: improvements.trim() || null,
      })
      .select()
      .single();

    setSaving(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    setEntries((prev) => [data as JournalEntry, ...prev]);
    resetForm();
    setModalVisible(false);

    // Award XP
    const result = await awardXP(user.id, XP_REWARDS.JOURNAL_ENTRY);
    setXPToast({ amount: XP_REWARDS.JOURNAL_ENTRY, leveledUp: result.leveledUp });
  };

  const handleDelete = async (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    await supabase.from('journal_entries').delete().eq('id', id);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.levelUpPurple} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {xpToast && (
        <XPToast
          amount={xpToast.amount}
          leveledUp={xpToast.leveledUp}
          visible={!!xpToast}
          onHide={() => setXPToast(null)}
        />
      )}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Gaming Journal</Text>
          <Text style={styles.subtitle}>{entries.length} {entries.length === 1 ? 'entry' : 'entries'} logged</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color={Colors.softIvory} />
        </TouchableOpacity>
      </View>

      {entries.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="book-outline" size={48} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>No entries yet</Text>
          <Text style={styles.emptyText}>Start logging your gaming sessions to track your growth.</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.emptyBtnText}>Write First Entry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.levelUpPurple} />}
          renderItem={({ item }) => (
            <EntryCard entry={item} onDelete={handleDelete} />
          )}
        />
      )}

      {/* New Entry Modal */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Entry</Text>
            <TouchableOpacity onPress={() => { resetForm(); setModalVisible(false); }}>
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
            {formError ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={15} color="#FF6B6B" />
                <Text style={styles.errorText}>{formError}</Text>
              </View>
            ) : null}

            <Text style={styles.fieldLabel}>Session Title *</Text>
            <TextInput
              style={styles.fieldInput}
              value={title}
              onChangeText={(t) => { setTitle(t); setFormError(''); }}
              placeholder="e.g. First Ranked Match"
              placeholderTextColor={Colors.textSecondary}
            />

            <Text style={styles.fieldLabel}>Game (optional)</Text>
            <TextInput
              style={styles.fieldInput}
              value={game}
              onChangeText={setGame}
              placeholder="e.g. Valorant, Minecraft..."
              placeholderTextColor={Colors.textSecondary}
            />

            <Text style={styles.fieldLabel}>How did the session go? *</Text>
            <TextInput
              style={[styles.fieldInput, styles.textarea]}
              value={content}
              onChangeText={(t) => { setContent(t); setFormError(''); }}
              placeholder="Write freely about your session..."
              placeholderTextColor={Colors.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.fieldLabel}>Today's Mood</Text>
            <View style={styles.moodRow}>
              {MOODS.map((m) => (
                <TouchableOpacity
                  key={m.key}
                  style={[styles.moodBtn, mood === m.key && { borderColor: m.color, backgroundColor: `${m.color}20` }]}
                  onPress={() => setMood(m.key)}
                >
                  <Text style={styles.moodEmoji}>{m.emoji}</Text>
                  <Text style={[styles.moodLabel, mood === m.key && { color: m.color }]}>{m.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Wins (optional)</Text>
            <TextInput
              style={styles.fieldInput}
              value={wins}
              onChangeText={setWins}
              placeholder="What went well?"
              placeholderTextColor={Colors.textSecondary}
            />

            <Text style={styles.fieldLabel}>Areas to Improve (optional)</Text>
            <TextInput
              style={styles.fieldInput}
              value={improvements}
              onChangeText={setImprovements}
              placeholder="What will you work on next?"
              placeholderTextColor={Colors.textSecondary}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
              <LinearGradient
                colors={['#9B7DFF', '#6E44FF']}
                style={[styles.saveBtnGradient, saving && { opacity: 0.6 }]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              >
                {saving
                  ? <ActivityIndicator color={Colors.softIvory} />
                  : <Text style={styles.saveBtnText}>Save Entry</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function EntryCard({ entry, onDelete }: { entry: JournalEntry; onDelete: (id: string) => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const moodData = MOODS.find((m) => m.key === entry.mood) ?? MOODS[1];
  const dateStr = new Date(entry.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <View style={styles.entryCard}>
      <View style={styles.entryTop}>
        <View style={styles.entryMeta}>
          <Text style={styles.entryTitle}>{entry.title}</Text>
          {entry.game && (
            <View style={styles.gameTag}>
              <Text style={styles.gameTagText}>{entry.game}</Text>
            </View>
          )}
        </View>
        <View style={styles.entryActions}>
          <View style={[styles.moodBadge, { backgroundColor: `${moodData.color}20` }]}>
            <Text style={styles.moodBadgeText}>{moodData.emoji}</Text>
          </View>
          {confirmDelete ? (
            <View style={styles.deleteConfirm}>
              <TouchableOpacity onPress={() => onDelete(entry.id)} style={styles.confirmYes}>
                <Text style={styles.confirmYesText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmDelete(false)}>
                <Text style={styles.confirmNoText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setConfirmDelete(true)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={15} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.entryContent} numberOfLines={2}>{entry.content}</Text>

      {entry.wins && (
        <View style={styles.winRow}>
          <Ionicons name="checkmark-circle" size={13} color="#4CAF50" />
          <Text style={styles.winText} numberOfLines={1}>{entry.wins}</Text>
        </View>
      )}

      {entry.improvements && (
        <View style={styles.improveRow}>
          <Ionicons name="arrow-up-circle" size={13} color="#FF9800" />
          <Text style={styles.improveText} numberOfLines={1}>{entry.improvements}</Text>
        </View>
      )}

      <Text style={styles.entryDate}>{dateStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.midnightBlack },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: Spacing.lg, paddingBottom: Spacing.md,
  },
  title: { fontFamily: Fonts.bold, fontSize: 24, color: Colors.softIvory },
  subtitle: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  addBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.levelUpPurple,
    alignItems: 'center', justifyContent: 'center',
  },
  list: { padding: Spacing.lg, paddingTop: 0, gap: 12 },
  entryCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  entryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  entryMeta: { flex: 1, gap: 4, marginRight: 8 },
  entryActions: { alignItems: 'flex-end', gap: 6 },
  entryTitle: { fontFamily: Fonts.semiBold, fontSize: 16, color: Colors.softIvory },
  gameTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(110, 68, 255, 0.15)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: 'rgba(110, 68, 255, 0.3)',
  },
  gameTagText: { fontFamily: Fonts.medium, fontSize: 11, color: Colors.levelUpPurple },
  moodBadge: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  moodBadgeText: { fontSize: 17 },
  deleteBtn: { padding: 4 },
  deleteConfirm: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  confirmYes: { backgroundColor: 'rgba(244,67,54,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(244,67,54,0.3)' },
  confirmYesText: { fontFamily: Fonts.semiBold, fontSize: 11, color: '#FF6B6B' },
  confirmNoText: { fontFamily: Fonts.medium, fontSize: 11, color: Colors.textSecondary },
  entryContent: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginBottom: 8, lineHeight: 20 },
  winRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  winText: { fontFamily: Fonts.regular, fontSize: 12, color: '#4CAF50', flex: 1 },
  improveRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 },
  improveText: { fontFamily: Fonts.regular, fontSize: 12, color: '#FF9800', flex: 1 },
  entryDate: { fontFamily: Fonts.regular, fontSize: 11, color: Colors.textSecondary, marginTop: 4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: Spacing.xl },
  emptyTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.softIvory },
  emptyText: { fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  emptyBtn: {
    backgroundColor: Colors.levelUpPurple, borderRadius: BorderRadius.md,
    paddingHorizontal: 24, paddingVertical: 12, marginTop: 8,
  },
  emptyBtnText: { fontFamily: Fonts.semiBold, fontSize: 15, color: Colors.softIvory },
  modal: { flex: 1, backgroundColor: Colors.midnightBlack },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  modalTitle: { fontFamily: Fonts.bold, fontSize: 20, color: Colors.softIvory },
  modalScroll: { padding: Spacing.lg, paddingBottom: 40 },
  errorBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.12)',
    borderWidth: 1, borderColor: 'rgba(244, 67, 54, 0.3)',
    borderRadius: BorderRadius.md, padding: 12, marginBottom: Spacing.md,
  },
  errorText: { fontFamily: Fonts.medium, fontSize: 13, color: '#FF6B6B', flex: 1 },
  fieldLabel: { fontFamily: Fonts.medium, fontSize: 13, color: Colors.textSecondary, marginBottom: 6, marginTop: 4 },
  fieldInput: {
    backgroundColor: Colors.charcoalGray, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.border,
    paddingVertical: 12, paddingHorizontal: 14,
    fontFamily: Fonts.regular, fontSize: 15, color: Colors.softIvory,
    marginBottom: 12,
  },
  textarea: { height: 100 },
  moodRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  moodBtn: {
    flex: 1, alignItems: 'center', gap: 4, paddingVertical: 10,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.charcoalGray,
  },
  moodEmoji: { fontSize: 20 },
  moodLabel: { fontFamily: Fonts.medium, fontSize: 11, color: Colors.textSecondary },
  saveBtn: { marginTop: 8, borderRadius: BorderRadius.md, overflow: 'hidden' },
  saveBtnGradient: { paddingVertical: 14, alignItems: 'center', justifyContent: 'center', minHeight: 50 },
  saveBtnText: { fontFamily: Fonts.bold, fontSize: 15, color: Colors.softIvory },
});
