const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export type WeatherData = {
  city: string;
  country: string;
  description: string;
  icon: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  tempMin: number;
  tempMax: number;
  localTime: string;
};

function toWeatherData(json: any): WeatherData {
  // Giờ địa phương = giờ hiện tại (UTC) + độ lệch múi giờ của thành phố (giây)
  const localSeconds = Math.floor(Date.now() / 1000) + json.timezone;
  const localTime = new Date(localSeconds * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  return {
    city: json.name,
    country: json.sys?.country ?? '',
    description: json.weather?.[0]?.description ?? '',
    icon: json.weather?.[0]?.icon ?? '01d',
    temp: Math.round(json.main.temp),
    feelsLike: Math.round(json.main.feels_like),
    humidity: json.main.humidity,
    windSpeed: json.wind?.speed ?? 0,
    tempMin: Math.round(json.main.temp_min),
    tempMax: Math.round(json.main.temp_max),
    localTime,
  };
}

async function request(query: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('Chưa có API key. Hãy thêm EXPO_PUBLIC_OPENWEATHER_API_KEY vào .env.local.');
  }

  const response = await fetch(`${BASE_URL}?${query}&appid=${API_KEY}&units=metric&lang=vi`);

  if (response.status === 404) throw new Error('Không tìm thấy thành phố này.');
  if (response.status === 401) {
    throw new Error('API key không hợp lệ hoặc chưa được kích hoạt.');
  }
  if (!response.ok) throw new Error(`Lỗi từ máy chủ (${response.status}).`);

  return toWeatherData(await response.json());
}

export function getWeatherByCity(city: string) {
  return request(`q=${encodeURIComponent(city.trim())}`);
}

export function getWeatherByCoords(latitude: number, longitude: number) {
  return request(`lat=${latitude}&lon=${longitude}`);
}