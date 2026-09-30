import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const DOT_PATTERNS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

type DieProps = {
  value: number;
  onPress: () => void;
};

function Die({ value, onPress }: DieProps) {
  const dots = DOT_PATTERNS[value];

  return (
    <Pressable onPress={onPress} style={styles.die}>
      {Array.from({ length: 9 }, (_, cell) => (
        <View key={cell} style={styles.cell}>
          {dots.includes(cell) && <View style={styles.dot} />}
        </View>
      ))}
    </Pressable>
  );
}

export default function Lab03Screen() {
  const [leftDice, setLeftDice] = useState(1);
  const [rightDice, setRightDice] = useState(2);

  const rollDice = () => {
    setLeftDice(rollDie());
    setRightDice(rollDie());
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Die value={leftDice} onPress={rollDice} />
        <Die value={rightDice} onPress={rollDice} />
      </View>

      <Text style={styles.total}>Tổng: {leftDice + rightDice}</Text>

      <Pressable
        onPress={rollDice}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Lắc xúc xắc</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 28,
  },
  die: {
    width: 110,
    height: 110,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FF6D00',
    backgroundColor: '#ffffff',
  },
  cell: {
    width: '33.3333%',
    height: '33.3333%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6D00',
  },
  total: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  button: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
});