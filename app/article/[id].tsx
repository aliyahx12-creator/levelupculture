import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';
import { ARTICLES, type ContentBlock } from '@/lib/articles';
import { RESOURCES } from '@/lib/resourceData';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = ARTICLES.find((a) => a.id === id);
  const resource = RESOURCES.find((r) => r.id === id);

  if (!article || !resource) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Article not found.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const CATEGORY_COLORS: Record<string, string> = {
    mindset: '#6E44FF',
    gaming: '#4CAF50',
    growth: '#FF9800',
    tech: '#2196F3',
  };

  const categoryColor = CATEGORY_COLORS[resource.category] ?? Colors.levelUpPurple;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={Colors.softIvory} />
        </TouchableOpacity>
        <View style={styles.headerBadges}>
          <View style={[styles.badge, { backgroundColor: `${categoryColor}22` }]}>
            <Text style={[styles.badgeText, { color: categoryColor }]}>
              {resource.category.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: `${Colors.levelUpPurple}22` }]}>
            <Text style={[styles.badgeText, { color: Colors.levelUpPurple }]}>
              {resource.type.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{resource.title}</Text>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{article.readTime} min read</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>Level Up Culture</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Intro */}
        <Text style={styles.intro}>{article.intro}</Text>

        {/* Content blocks */}
        {article.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerTitle}>Keep leveling up.</Text>
          <Text style={styles.footerBody}>
            Join the Level Up Culture community on Discord to discuss this, ask questions, and connect with other players on the same journey.
          </Text>
          <TouchableOpacity style={styles.footerBtn} onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back-outline" size={15} color={Colors.levelUpPurple} />
            <Text style={styles.footerBtnText}>Back to Resources</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return <Text style={styles.blockHeading}>{block.text}</Text>;

    case 'body':
      return <Text style={styles.blockBody}>{block.text}</Text>;

    case 'tip':
      return (
        <View style={styles.tipBox}>
          <View style={styles.tipIconRow}>
            <Ionicons name="bulb" size={15} color="#FFB800" />
            <Text style={styles.tipLabel}>TIP</Text>
          </View>
          <Text style={styles.tipText}>{block.text}</Text>
        </View>
      );

    case 'callout':
      return (
        <View style={styles.calloutBox}>
          <View style={styles.calloutAccent} />
          <Text style={styles.calloutText}>{block.text}</Text>
        </View>
      );

    case 'list':
      return (
        <View style={styles.listBox}>
          {(block.items ?? []).map((item, i) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.midnightBlack },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  errorText: { fontFamily: Fonts.medium, fontSize: 15, color: Colors.textSecondary, marginBottom: 16 },
  backBtn: {
    backgroundColor: Colors.levelUpPurple, borderRadius: BorderRadius.md,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  backBtnText: { fontFamily: Fonts.bold, fontSize: 14, color: Colors.softIvory },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    gap: 12,
  },
  backIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.charcoalGray,
    alignItems: 'center', justifyContent: 'center',
  },
  headerBadges: { flexDirection: 'row', gap: 8, flex: 1 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full },
  badgeText: { fontFamily: Fonts.bold, fontSize: 10, letterSpacing: 0.8 },

  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl * 2 },

  titleBlock: { marginBottom: Spacing.md },
  title: {
    fontFamily: Fonts.extraBold, fontSize: 26,
    color: Colors.softIvory, lineHeight: 34, marginBottom: 10,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary },
  metaDot: {
    width: 3, height: 3, borderRadius: 2,
    backgroundColor: Colors.textSecondary,
  },

  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.lg },

  intro: {
    fontFamily: Fonts.medium, fontSize: 16,
    color: Colors.softIvory, lineHeight: 26,
    marginBottom: Spacing.lg,
    opacity: 0.9,
  },

  blockHeading: {
    fontFamily: Fonts.bold, fontSize: 18,
    color: Colors.softIvory, lineHeight: 26,
    marginTop: Spacing.lg, marginBottom: 8,
  },
  blockBody: {
    fontFamily: Fonts.regular, fontSize: 15,
    color: Colors.textSecondary, lineHeight: 25,
    marginBottom: Spacing.md,
  },

  tipBox: {
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: 'rgba(255, 184, 0, 0.25)',
    padding: Spacing.md,
    marginVertical: Spacing.md,
  },
  tipIconRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  tipLabel: { fontFamily: Fonts.bold, fontSize: 10, color: '#FFB800', letterSpacing: 1 },
  tipText: { fontFamily: Fonts.medium, fontSize: 14, color: Colors.softIvory, lineHeight: 22 },

  calloutBox: {
    flexDirection: 'row',
    backgroundColor: Colors.deepPlum,
    borderRadius: BorderRadius.lg,
    borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md,
    marginVertical: Spacing.md,
    gap: 12, alignItems: 'flex-start',
  },
  calloutAccent: {
    width: 3, borderRadius: 2,
    backgroundColor: Colors.levelUpPurple,
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  calloutText: {
    fontFamily: Fonts.semiBold, fontSize: 15,
    color: Colors.softIvory, lineHeight: 23,
    flex: 1, fontStyle: 'italic',
  },

  listBox: { marginVertical: Spacing.sm },
  listItem: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  bullet: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: Colors.levelUpPurple,
    marginTop: 9, flexShrink: 0,
  },
  listText: {
    fontFamily: Fonts.regular, fontSize: 14,
    color: Colors.textSecondary, lineHeight: 22, flex: 1,
  },

  footer: { marginTop: Spacing.xl, alignItems: 'center' },
  footerLine: { height: 1, backgroundColor: Colors.border, width: '100%', marginBottom: Spacing.lg },
  footerTitle: {
    fontFamily: Fonts.extraBold, fontSize: 20,
    color: Colors.softIvory, marginBottom: 8, textAlign: 'center',
  },
  footerBody: {
    fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary,
    textAlign: 'center', lineHeight: 20, marginBottom: Spacing.lg,
  },
  footerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: Colors.levelUpPurple,
    borderRadius: BorderRadius.md, paddingHorizontal: 20, paddingVertical: 10,
  },
  footerBtnText: { fontFamily: Fonts.semiBold, fontSize: 14, color: Colors.levelUpPurple },
});
