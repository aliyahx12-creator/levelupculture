import { useEffect, Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/lib/theme';

SplashScreen.preventAutoHideAsync();

interface ErrorBoundaryState { error: Error | null }

class ErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <View style={eb.container}>
          <Text style={eb.title}>Something went wrong</Text>
          <Text style={eb.subtitle}>Please screenshot this and send it to support.</Text>
          <ScrollView style={eb.scroll}>
            <Text style={eb.message}>{this.state.error.message}</Text>
            <Text style={eb.stack}>{this.state.error.stack}</Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const eb = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 24, paddingTop: 60 },
  title: { color: '#FF4444', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#888', fontSize: 13, marginBottom: 20 },
  scroll: { flex: 1 },
  message: { color: '#F8F6F2', fontSize: 14, marginBottom: 16 },
  stack: { color: '#888', fontSize: 11, lineHeight: 18 },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ErrorBoundary>
      <StatusBar style="light" backgroundColor={Colors.midnightBlack} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.midnightBlack } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="article/[id]" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </ErrorBoundary>
  );
}
