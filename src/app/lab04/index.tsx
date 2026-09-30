import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ANSWERS = [
  'CÓ',
  'KHÔNG',
  'CHẮC CHẮN RỒI',
  'HỎI LẠI SAU',
  'ĐỪNG TRÔNG CHỜ',
  'TRIỂN VỌNG TỐT',
  'CHƯA RÕ, THỬ LẠI',
  'RẤT NGHI NGỜ',
];

const DEFAULT_TEXT = 'HỎI\nĐI';

function randomAnswer(current: string) {
  let next = current;

  while (next === current) {
    next = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  }
  return next;
}

export default function Lab04Screen() {
  const [answer, setAnswer] = useState(DEFAULT_TEXT);

  const ask = () => setAnswer((prev) => randomAnswer(prev));

  return (
    <View style={styles.container}>
      <Pressable onPress={ask} style={styles.ball}>
        <View style={styles.shine} />
        <View style={styles.window}>
          <View style={styles.triangle}>
            <Text style={styles.answer}>{answer}</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.shadow} />

      <Text style={styles.hint}>Nghĩ một câu hỏi rồi chạm vào quả cầu</Text>

      <Pressable
        onPress={ask}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>Hỏi lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8FF',
    padding: 24,
  },
  ball: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 22,
    left: 50,
    width: 70,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    transform: [{ rotate: '-25deg' }],
  },
  window: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#0D47A1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  answer: {
    color: '#BBDEFB',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  shadow: {
    width: 180,
    height: 16,
    borderRadius: 90,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginTop: 8,
  },
  hint: {
    marginTop: 28,
    fontSize: 15,
    color: '#5E4B7A',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 36,
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