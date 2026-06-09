import { supabase } from './supabase';

// XP needed to reach each level (index = level - 1)
export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000];

export const XP_REWARDS = {
  JOURNAL_ENTRY: 50,
  CONFIDENCE_LOG: 25,
} as const;

export function getLevelFromXP(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function getProgressToNextLevel(xp: number): { current: number; max: number; level: number } {
  const level = getLevelFromXP(xp);
  const floorXP = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const ceilXP = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return { current: xp - floorXP, max: ceilXP - floorXP, level };
}

export async function awardXP(
  userId: string,
  amount: number,
): Promise<{ newXP: number; newLevel: number; leveledUp: boolean }> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', userId)
    .single();

  const currentXP = profile?.xp ?? 0;
  const currentLevel = profile?.level ?? 1;
  const newXP = currentXP + amount;
  const newLevel = getLevelFromXP(newXP);

  await supabase
    .from('profiles')
    .upsert({ id: userId, xp: newXP, level: newLevel, updated_at: new Date().toISOString() });

  return { newXP, newLevel, leveledUp: newLevel > currentLevel };
}
