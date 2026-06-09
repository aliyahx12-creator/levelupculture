import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';
import { RESOURCES } from '@/lib/resourceData';
import type { Resource } from '@/types';

const CATEGORIES = ['All', 'Mindset', 'Gaming', 'Growth', 'Tech'] as const;

const TYPE_COLORS: Record<string, string> = {
  guide: '#6E44FF', article: '#4CAF50', video: '#FF9800', tool: '#F06292',
};

export default function ResourcesScreen() {
  const [active, setActive] = useState<string>('All');

  const filtered = active === 'All'
    ? RESOURCES
    : RESOURCES.filter((r) => r.category === active.toLowerCase());

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Resource Library</Text>
          <Text style={styles.subtitle}>Curated for beginner gamers leveling up their game and mindset.</Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterBtn, active === cat && styles.filterBtnActive]}
              onPress={() => setActive(cat)}
            >
              <Text style={[styles.filterText, active === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Resources */}
        <View style={styles.grid}>
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const typeColor = TYPE_COLORS[resource.type] ?? Colors.levelUpPurple;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: '/article/[id]', params: { id: resource.id } })}
    >
      <View style={[styles.iconBox, { backgroundColor: `${typeColor}18` }]}>
        <Ionicons name={resource.icon as any ?? 'document-outline'} size={24} color={typeColor} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <View style={[styles.typeBadge, { backgroundColor: `${typeColor}20` }]}>
            <Text style={[styles.typeText, { color: typeColor }]}>{resource.type.toUpperCase()}</Text>
          </View>
          <Ionicons name="chevron-forward" size={14} color={Colors.textSecondary} />
        </View>
        <Text style={styles.cardTitle}>{resource.title}</Text>
        <Text style={styles.cardDesc}>{resource.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.midnightBlack },
  scroll: { padding: Spacing.lg },
  header: { marginBottom: Spacing.lg },
  title: { fontFamily: Fonts.bold, fontSize: 24, color: Colors.softIvory },
  subtitle: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginTop: 4, lineHeight: 20 },
  filterRow: { gap: 8, marginBottom: Spacing.lg, paddingRight: Spacing.md },
  filterBtn: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.charcoalGray,
    borderWidth: 1, borderColor: Colors.border,
  },
  filterBtnActive: { backgroundColor: Colors.levelUpPurple, borderColor: Colors.levelUpPurple },
  filterText: { fontFamily: Fonts.medium, fontSize: 13, color: Colors.textSecondary },
  filterTextActive: { color: Colors.softIvory },
  grid: { gap: 12 },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
    flexDirection: 'row', gap: 14,
  },
  iconBox: {
    width: 52, height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  cardContent: { flex: 1, gap: 4 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  typeBadge: {
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  typeText: { fontFamily: Fonts.bold, fontSize: 9, letterSpacing: 0.8 },
  cardTitle: { fontFamily: Fonts.semiBold, fontSize: 15, color: Colors.softIvory, lineHeight: 21 },
  cardDesc: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
});
