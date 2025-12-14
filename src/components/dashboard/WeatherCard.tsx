import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ThermometerSun, ThermometerSnowflake, Wind, Droplets, CloudSunRain, MapPin } from "lucide-react";

interface WeatherInfo {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  description: string;
  tempIcon: string;
  windSpeed: number;
  humidity: number;
}

export const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [alert, setAlert] = useState("");

  const apiKey = "314bbd4161a9f58d5fc3e89febe50b59";
  const defaultCity = "Três de Maio, RS, Brasil";

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            defaultCity
          )}&appid=${apiKey}&units=metric&lang=pt_br`
        );
        const data = await res.json();

        if (data.cod === 200) {
          setWeather({
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            description: data.weather[0].description,
            tempIcon: data.weather[0].icon,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
          });
          setAlert("");
        } else {
          setAlert("Não foi possível carregar os dados do clima.");
        }
      } catch (err) {
        setAlert("Erro ao conectar com a API.");
      }
    }

    fetchWeather();
  }, []);

  const getComfortLabel = (temp: number, humidity: number) => {
    if (temp >= 25 && humidity < 60) return { text: "Clima agradável 🌤️", color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-200" };
    if (temp < 15) return { text: "Frio intenso ❄️", color: "text-blue-700", bg: "bg-blue-100", border: "border-blue-200" };
    if (temp >= 30) return { text: "Calor forte ☀️", color: "text-amber-700", bg: "bg-amber-100", border: "border-amber-200" };
    if (humidity >= 80) return { text: "Clima úmido 💧", color: "text-cyan-700", bg: "bg-cyan-100", border: "border-cyan-200" };
    return { text: "Temperatura moderada 🌥️", color: "text-gray-700", bg: "bg-gray-100", border: "border-gray-200" };
  };

  return (
    <Card className="p-8 bg-white border-gray-200 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-purple-300 shadow-lg">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-center shadow-md">
            <CloudSunRain className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Clima Atual
          </h3>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50"></div>
      </div>

      {alert && (
        <div className="mb-6 p-4 bg-rose-100 border border-rose-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-rose-600" />
            <span className="text-sm text-rose-700 font-medium">{alert}</span>
          </div>
        </div>
      )}

      {weather && (
        <div className="space-y-6">
          {/* Localização e descrição */}
          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-gray-600 capitalize font-medium mt-1">{weather.description}</p>
          </div>

          {/* Temperatura principal */}
          <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-200/50">
            <div className="flex items-center gap-6">
              <div className="p-3 bg-white border border-blue-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.tempIcon}@2x.png`}
                  alt="Ícone do clima"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {weather.temp.toFixed(1).replace(".", ",")}°C
                </p>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Sensação térmica: <span className="text-gray-900 font-semibold">{weather.feelsLike.toFixed(1).replace(".", ",")}°C</span>
                </p>
              </div>
            </div>
          </div>

          {/* Grid de métricas */}
          <div className="grid grid-cols-3 gap-3">
            <div className="group p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-orange-200/50 cursor-pointer">
              <div className="p-2.5 rounded-xl bg-white border border-orange-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <ThermometerSun className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Máxima</span>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {weather.tempMax.toFixed(1)}°C
              </span>
            </div>

            <div className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer">
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <ThermometerSnowflake className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Mínima</span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                {weather.tempMin.toFixed(1)}°C
              </span>
            </div>

            <div className="group p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-cyan-200/50 cursor-pointer">
              <div className="p-2.5 rounded-xl bg-white border border-cyan-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Droplets className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Umidade</span>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                {weather.humidity}%
              </span>
            </div>
          </div>

          {/* Vento */}
          <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md">
                  <Wind className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700 font-medium">Velocidade do vento</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                {weather.windSpeed.toFixed(1)} km/h
              </span>
            </div>
          </div>

          {/* Indicador de conforto */}
          {(() => {
            const comfort = getComfortLabel(weather.temp, weather.humidity);
            return (
              <div className={`p-5 ${comfort.bg} border ${comfort.border} rounded-2xl shadow-sm`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${comfort.bg} border ${comfort.border}`}>
                    <MapPin className={`w-5 h-5 ${comfort.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${comfort.color}`}>
                    {comfort.text}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </Card>
  );
};

// Exemplo de uso
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <WeatherCard />
      </div>
    </div>
  );
}