import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getWeatherByCity,
  getWeatherByCoords,
  type WeatherData,
} from '@/lib/weather';

// Thử lấy vị trí GPS trước, nếu bị từ chối hoặc lỗi thì dùng Hà Nội
async function loadInitialWeather(): Promise<WeatherData> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const position = await Location.getCurrentPositionAsync({});
      return await getWeatherByCoords(position.coords.latitude, position.coords.longitude);
    }
  } catch {
    // bỏ qua, dùng thành phố mặc định bên dưới
  }
  return getWeatherByCity('Hanoi');
}

type StatProps = {
  label: string;
  value: string;
};

function Stat({ label, value }: StatProps) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function Lab09Screen() {
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lần đầu mở màn hình: lấy thời tiết theo vị trí thiết bị
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await loadInitialWeather();
        if (!cancelled) setWeather(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Đã có lỗi xảy ra.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const search = async () => {
    if (!cityInput.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(cityInput);
      setWeather(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.panel}>
          <Text style={styles.title}>Weather App</Text>

          {/* Ô tìm kiếm */}
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter city name (e.g. London)"
              placeholderTextColor="#8A94A6"
              value={cityInput}
              onChangeText={setCityInput}
              onSubmitEditing={search}
              returnKeyType="search"
            />
            <Pressable
              onPress={search}
              style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}>
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </View>

          {loading && <ActivityIndicator style={styles.loading} size="large" color="#2196F3" />}

          {error && <Text style={styles.error}>{error}</Text>}

          {weather && !loading && (
            <>
              <Text style={styles.city}>
                📍 {weather.city}
                {weather.country ? `, ${weather.country}` : ''}
              </Text>
              <Text style={styles.localTime}>{weather.localTime} local time</Text>

              <View style={styles.mainCard}>
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
                  style={styles.icon}
                  contentFit="contain"
                />
                <Text style={styles.description}>{weather.description}</Text>
                <Text style={styles.temp}>{weather.temp}°C</Text>
                <Text style={styles.feelsLike}>Feels like {weather.feelsLike}°C</Text>

                <View style={styles.statsRow}>
                  <Stat label="Humidity" value={`${weather.humidity}%`} />
                  <Stat label="Wind Speed" value={`${weather.windSpeed} m/s`} />
                </View>
                <View style={styles.statsRow}>
                  <Stat label="Min Temp" value={`${weather.tempMin}°C`} />
                  <Stat label="Max Temp" value={`${weather.tempMax}°C`} />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EEFB',
  },
  scroll: {
    padding: 16,
    alignItems: 'center',
  },
  panel: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#F4F7FF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DCE5F7',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2A44',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C9D3E8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1F2A44',
  },
  searchButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
  loading: {
    marginTop: 32,
    marginBottom: 16,
  },
  error: {
    marginTop: 20,
    color: '#D32F2F',
    textAlign: 'center',
    fontSize: 15,
  },
  city: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2A44',
    textAlign: 'center',
  },
  localTime: {
    fontSize: 12,
    color: '#8A94A6',
    textAlign: 'center',
    marginTop: 2,
  },
  mainCard: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    textTransform: 'capitalize',
  },
  temp: {
    fontSize: 44,
    fontWeight: '700',
    color: '#1F2A44',
    marginTop: 4,
  },
  feelsLike: {
    fontSize: 12,
    color: '#8A94A6',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 10,
  },
  stat: {
    flex: 1,
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7A99',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
    marginTop: 2,
  },
});