import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, BorderRadius } from '@/lib/theme';

const DISCORD_URL = 'https://discord.gg/sBR6eYd9J';

const COMMUNITY_PILLARS = [
  { icon: 'heart-outline', title: 'Safe Space', desc: 'No gatekeeping. No toxicity. Everyone is welcome here regardless of skill level.' },
  { icon: 'school-outline', title: 'Always Learning', desc: 'Ask any question. We celebrate beginners and reward curiosity.' },
  { icon: 'people-outline', title: 'Real Community', desc: 'Build genuine friendships with people who share your passion for growth.' },
  { icon: 'trophy-outline', title: 'Celebrate Wins', desc: 'Your first kill, your first match, your first hour — every milestone matters.' },
];

const EVENTS = [
  { title: 'Beginner Game Night', date: 'Every Friday 8 PM EST', icon: '🎮', desc: 'Chill sessions for beginners. No pressure, just fun.' },
  { title: 'Mindset Monday', date: 'Every Monday', icon: '🧠', desc: 'Short discussions on the mental side of gaming.' },
  { title: 'Level Up Sessions', date: 'Bi-weekly', icon: '⚡', desc: 'Group coaching and tips from experienced community members.' },
];

export default function CommunityScreen() {
  const openDiscord = () => {
    Alert.alert(
      'Join Our Discord',
      'You\'ll be taken to The Level Up Culture Discord server.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join Discord', onPress: () => Linking.openURL(DISCORD_URL) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={['#2D173D', '#1A0F2E', '#0D0D0D']}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroIconRow}>
            <View style={styles.heroIcon}>
              <Ionicons name="people" size={32} color={Colors.levelUpPurple} />
            </View>
          </View>
          <Text style={styles.heroTitle}>Join the Culture</Text>
          <Text style={styles.heroSubtitle}>
            A community built by beginners, for beginners. Level up your game and your mindset — together.
          </Text>
          <TouchableOpacity style={styles.discordBtn} onPress={openDiscord} activeOpacity={0.85}>
            <LinearGradient
              colors={['#5865F2', '#4752C4']}
              style={styles.discordGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="logo-discord" size={20} color="#fff" />
              <Text style={styles.discordBtnText}>Join Discord Server</Text>
              <Ionicons name="chevron-forward" size={16} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { value: '1,200+', label: 'Members' },
            { value: '4.9★', label: 'Vibes' },
            { value: '0', label: 'Toxicity' },
          ].map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Community Pillars */}
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.pillarsGrid}>
          {COMMUNITY_PILLARS.map((p) => (
            <View key={p.title} style={styles.pillarCard}>
              <View style={styles.pillarIcon}>
                <Ionicons name={p.icon as any} size={22} color={Colors.levelUpPurple} />
              </View>
              <Text style={styles.pillarTitle}>{p.title}</Text>
              <Text style={styles.pillarDesc}>{p.desc}</Text>
            </View>
          ))}
        </View>

        {/* Events */}
        <Text style={styles.sectionTitle}>Regular Events</Text>
        <View style={styles.eventsList}>
          {EVENTS.map((event) => (
            <View key={event.title} style={styles.eventCard}>
              <Text style={styles.eventEmoji}>{event.icon}</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventDesc}>{event.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to level up with us?</Text>
          <Text style={styles.ctaText}>Our Discord is the hub. Jump in, introduce yourself, and find your squad.</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={openDiscord}>
            <Text style={styles.ctaBtnText}>Open Discord →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.midnightBlack },
  scroll: { padding: Spacing.lg },
  hero: {
    borderRadius: BorderRadius.xl, padding: Spacing.xl,
    alignItems: 'center', marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  heroIconRow: { marginBottom: 12 },
  heroIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(110, 68, 255, 0.15)',
    borderWidth: 2, borderColor: 'rgba(110, 68, 255, 0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: { fontFamily: Fonts.extraBold, fontSize: 26, color: Colors.softIvory, textAlign: 'center', marginBottom: 8 },
  heroSubtitle: {
    fontFamily: Fonts.regular, fontSize: 14, color: Colors.textSecondary,
    textAlign: 'center', lineHeight: 22, marginBottom: 24,
  },
  discordBtn: { width: '100%', borderRadius: BorderRadius.md, overflow: 'hidden' },
  discordGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, paddingHorizontal: 24, gap: 10,
  },
  discordBtnText: { fontFamily: Fonts.bold, fontSize: 15, color: '#fff', flex: 1, textAlign: 'center' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md },
  statValue: { fontFamily: Fonts.extraBold, fontSize: 20, color: Colors.levelUpPurple },
  statLabel: { fontFamily: Fonts.medium, fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.softIvory, marginBottom: 12 },
  pillarsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Spacing.lg },
  pillarCard: {
    width: '47%', backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border, gap: 6,
  },
  pillarIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(110, 68, 255, 0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  pillarTitle: { fontFamily: Fonts.semiBold, fontSize: 14, color: Colors.softIvory },
  pillarDesc: { fontFamily: Fonts.regular, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  eventsList: { gap: 10, marginBottom: Spacing.lg },
  eventCard: {
    flexDirection: 'row', gap: 14,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  eventEmoji: { fontSize: 28, marginTop: 2 },
  eventInfo: { flex: 1, gap: 2 },
  eventTitle: { fontFamily: Fonts.semiBold, fontSize: 15, color: Colors.softIvory },
  eventDate: { fontFamily: Fonts.medium, fontSize: 12, color: Colors.levelUpPurple },
  eventDesc: { fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  ctaCard: {
    backgroundColor: Colors.deepPlum,
    borderRadius: BorderRadius.xl, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.border, alignItems: 'center',
  },
  ctaTitle: { fontFamily: Fonts.bold, fontSize: 18, color: Colors.softIvory, textAlign: 'center', marginBottom: 8 },
  ctaText: {
    fontFamily: Fonts.regular, fontSize: 13, color: Colors.textSecondary,
    textAlign: 'center', marginBottom: 20, lineHeight: 20,
  },
  ctaBtn: {
    backgroundColor: Colors.levelUpPurple, borderRadius: BorderRadius.md,
    paddingHorizontal: 28, paddingVertical: 12,
  },
  ctaBtnText: { fontFamily: Fonts.bold, fontSize: 15, color: Colors.softIvory },
});
