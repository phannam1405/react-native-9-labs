import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FF9800' },
          headerTintColor: '#212121',
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="index" options={{ title: '9 Lab React Native' }} />
        <Stack.Screen name="explore" options={{ title: 'Explore' }} />
        <Stack.Screen name="lab01/index" options={{ title: 'I Am Rich' }} />
        <Stack.Screen name="lab02/index" options={{ headerShown: false }} />
        <Stack.Screen name="lab03/index" options={{ title: 'Dice' }} />
        <Stack.Screen name="lab04/index" options={{ title: 'Ask Me Anything' }} />
        <Stack.Screen name="lab05/index" options={{ headerShown: false }} />
        <Stack.Screen name="lab06/index" options={{ headerShown: false }} />
        <Stack.Screen name="lab07/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="lab08/index"
          options={{
            title: 'BMI CALCULATOR',
            headerStyle: { backgroundColor: '#0A0E21' },
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen
          name="lab08/results"
          options={{
            title: 'BMI CALCULATOR RESULTS',
            headerStyle: { backgroundColor: '#0A0E21' },
            headerTintColor: '#ffffff',
          }}
        />        <Stack.Screen name="lab09/index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}