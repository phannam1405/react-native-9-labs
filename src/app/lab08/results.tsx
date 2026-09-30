import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { BottomButton, COLORS, ReuseableCard } from '@/components/lab08/bmi-parts';
import { CalculatorBrain } from '@/lib/calculator-brain';

export default function ResultsScreen() {
  const router = useRouter();
  const { height, weight } = useLocalSearchParams<{ height: string; weight: string }>();

  const brain = new CalculatorBrain(Number(height) || 180, Number(weight) || 60);
  const result = brain.getResult();

  const recalculate = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Mở trực tiếp bằng URL/reload nên không có trang trước để quay lại
      router.replace('/lab08' as Href);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Your Result</Text>

        <ReuseableCard flex={5}>
          <Text
            style={[
              styles.resultText,
              { color: result === 'Normal' ? COLORS.green : COLORS.accent },
            ]}>
            {result.toUpperCase()}
          </Text>
          <Text style={styles.bmiText}>{brain.getBMI()}</Text>
          <Text style={styles.interpretation}>{brain.getInterpretation()}</Text>
        </ReuseableCard>
      </View>

      <BottomButton title="RE-CALCULATE" onPress={recalculate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  body: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.white,
    textAlignVertical: 'bottom',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  resultText: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  bmiText: {
    fontSize: 90,
    fontWeight: '800',
    color: COLORS.white,
  },
  interpretation: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});