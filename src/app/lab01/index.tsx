import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export default function Lab01Screen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/lab01/rich.jpg')}
        style={styles.image}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF7FF',
  },
  image: {
    width: 260,
    height: 260,
  },
});