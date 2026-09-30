import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Đổi URL thành /lab01 ... /lab09 để xem từng lab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF7FF',
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
  },
});