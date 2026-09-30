import Slider from '@react-native-community/slider';
import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  BottomButton,
  COLORS,
  IconContent,
  ReuseableCard,
  RoundIconButton,
} from '@/components/lab08/bmi-parts';

type Gender = 'male' | 'female' | null;

export default function Lab08Screen() {
  const router = useRouter();
  const [gender, setGender] = useState<Gender>(null);
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(30);

  const calculate = () => {
    router.push(`/lab08/results?height=${height}&weight=${weight}` as Href);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {/* Giới tính */}
        <View style={styles.row}>
          <ReuseableCard active={gender === 'male'} onPress={() => setGender('male')}>
            <IconContent icon="♂" label="MALE" />
          </ReuseableCard>
          <ReuseableCard active={gender === 'female'} onPress={() => setGender('female')}>
            <IconContent icon="♀" label="FEMALE" />
          </ReuseableCard>
        </View>

        {/* Chiều cao */}
        <ReuseableCard>
          <Text style={styles.label}>HEIGHT</Text>
          <View style={styles.valueRow}>
            <Text style={styles.bigNumber}>{height}</Text>
            <Text style={styles.label}>cm</Text>
          </View>
          <Slider
            style={styles.slider}
            value={height}
            minimumValue={120}
            maximumValue={220}
            step={1}
            onValueChange={(value) => setHeight(Math.round(value))}
            minimumTrackTintColor={COLORS.white}
            maximumTrackTintColor={COLORS.label}
            thumbTintColor={COLORS.accent}
          />
        </ReuseableCard>

        {/* Cân nặng và tuổi */}
        <View style={styles.row}>
          <ReuseableCard>
            <Text style={styles.label}>WEIGHT</Text>
            <Text style={styles.bigNumber}>{weight}</Text>
            <View style={styles.buttonRow}>
              <RoundIconButton label="−" onPress={() => setWeight((w) => Math.max(1, w - 1))} />
              <RoundIconButton label="+" onPress={() => setWeight((w) => w + 1)} />
            </View>
          </ReuseableCard>
          <ReuseableCard>
            <Text style={styles.label}>AGE</Text>
            <Text style={styles.bigNumber}>{age}</Text>
            <View style={styles.buttonRow}>
              <RoundIconButton label="−" onPress={() => setAge((a) => Math.max(1, a - 1))} />
              <RoundIconButton label="+" onPress={() => setAge((a) => a + 1)} />
            </View>
          </ReuseableCard>
        </View>
      </View>

      <BottomButton title="CALCULATE" onPress={calculate} />
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
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 18,
    color: COLORS.label,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  bigNumber: {
    fontSize: 50,
    fontWeight: '800',
    color: COLORS.white,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
});