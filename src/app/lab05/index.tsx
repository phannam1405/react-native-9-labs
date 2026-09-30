import { useAudioPlayer } from 'expo-audio';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTES = [
  { color: '#F44336', source: require('@/assets/lab05/note1.wav') },
  { color: '#FF9800', source: require('@/assets/lab05/note2.wav') },
  { color: '#FFEB3B', source: require('@/assets/lab05/note3.wav') },
  { color: '#4CAF50', source: require('@/assets/lab05/note4.wav') },
  { color: '#009688', source: require('@/assets/lab05/note5.wav') },
  { color: '#2196F3', source: require('@/assets/lab05/note6.wav') },
  { color: '#9C27B0', source: require('@/assets/lab05/note7.wav') },
];

type KeyProps = {
  color: string;
  source: number;
};

function XyloKey({ color, source }: KeyProps) {
  const player = useAudioPlayer(source);

  const playSound = () => {
    player.seekTo(0); // tua về đầu để bấm liên tiếp vẫn phát lại được
    player.play();
  };

  return (
    <Pressable
      onPress={playSound}
      style={({ pressed }) => [
        styles.key,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
    />
  );
}

export default function Lab05Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.keys}>
        {NOTES.map((note, index) => (
          <XyloKey key={index} color={note.color} source={note.source} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keys: {
    flex: 1,
    gap: 6,
    padding: 6,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  key: {
    flex: 1,
    borderRadius: 40,
  },
  pressed: {
    opacity: 0.7,
  },
});