import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const COLORS = {
  background: '#0A0E21',
  card: '#1D1E33',
  cardActive: '#111328',
  accent: '#EB1555',
  label: '#8D8E98',
  white: '#FFFFFF',
  green: '#24D876',
  button: '#4C4F5E',
};

// ---------- ReuseableCard ----------
type ReuseableCardProps = {
  children?: ReactNode;
  active?: boolean;
  onPress?: () => void;
  flex?: number;
};

export function ReuseableCard({ children, active, onPress, flex = 1 }: ReuseableCardProps) {
  const cardStyle = [
    styles.card,
    { flex, backgroundColor: active ? COLORS.cardActive : COLORS.card },
  ];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={cardStyle}>
        {children}
      </Pressable>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}

// ---------- IconContent ----------
type IconContentProps = {
  icon: string;
  label: string;
};

export function IconContent({ icon, label }: IconContentProps) {
  return (
    <View style={styles.iconContent}>
      <Text style={styles.iconText}>{icon}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

// ---------- RoundIconButton ----------
type RoundIconButtonProps = {
  label: string;
  onPress: () => void;
};

export function RoundIconButton({ label, onPress }: RoundIconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.roundButton, pressed && styles.pressed]}>
      <Text style={styles.roundButtonText}>{label}</Text>
    </Pressable>
  );
}

// ---------- BottomButton ----------
type BottomButtonProps = {
  title: string;
  onPress: () => void;
};

export function BottomButton({ title, onPress }: BottomButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <SafeAreaView edges={['bottom']} style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>{title}</Text>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContent: {
    alignItems: 'center',
    gap: 8,
  },
  iconText: {
    fontSize: 64,
    color: COLORS.white,
  },
  labelText: {
    fontSize: 18,
    color: COLORS.label,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    fontSize: 26,
    color: COLORS.white,
    lineHeight: 30,
  },
  bottomButton: {
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  bottomButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});