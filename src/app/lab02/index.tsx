import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const NAME = 'Phan Văn Nam';
const JOB = 'REACT NATIVE DEVELOPER';
const PHONE = '+84 000 000 000';
const EMAIL = 'email@example.com';

type InfoCardProps = {
  icon: string;
  text: string;
};

function InfoCard({ icon, text }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

export default function Lab02Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
            source={require('@/assets/images/react-logo.png')}
          style={styles.avatar}
          contentFit="contain"
        />
        <Text style={styles.name}>{NAME}</Text>
        <Text style={styles.job}>{JOB}</Text>

        <View style={styles.cards}>
          <InfoCard icon="📞" text={PHONE} />
          <InfoCard icon="✉️" text={EMAIL} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5722',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  name: {
    marginTop: 16,
    fontSize: 32,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#ffffff',
  },
  job: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 3,
    color: '#FFE0D6',
  },
  cards: {
    alignSelf: 'stretch',
    maxWidth: 420,
    width: '100%',
    marginTop: 28,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 14,
  },
  cardIcon: {
    fontSize: 18,
  },
  cardText: {
    fontSize: 16,
    color: '#E64A19',
  },
});