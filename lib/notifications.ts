import { Platform } from 'react-native';

const STATEMENTS = [
  "I am a confident, capable gamer who grows with every session.",
  "I belong in this community. My presence has value.",
  "Every loss is data. Every win is proof. I keep leveling up.",
  "I face challenges head-on. I am not afraid to be a beginner.",
  "My journey is uniquely mine. I celebrate my progress.",
  "I am building skills that transfer beyond the screen.",
  "I show up, I practice, and I improve every single day.",
  "I am resilient. Lag, loss, or tilt — I reset and come back stronger.",
];

function randomStatement(): string {
  return STATEMENTS[Math.floor(Math.random() * STATEMENTS.length)];
}

export async function requestPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const Notifications = await import('expo-notifications');
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyReminder(hour = 9, minute = 0): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const Notifications = await import('expo-notifications');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  const granted = await requestPermissions();
  if (!granted) return false;

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '⚡ Your Daily Identity',
      body: randomStatement(),
    },
    trigger: { hour, minute, repeats: true } as any,
  });

  return true;
}

export async function cancelDailyReminder(): Promise<void> {
  if (Platform.OS === 'web') return;
  const Notifications = await import('expo-notifications');
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function areNotificationsEnabled(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const Notifications = await import('expo-notifications');
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  return scheduled.length > 0;
}
