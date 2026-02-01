
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, MapPin, Zap } from 'lucide-react';

const initialForecast = [
  { day: 'Mon', temp: 32, icon: <Sun className="h-6 w-6 text-amber-500" />, condition: 'Sunny' },
  { day: 'Tue', temp: 31, icon: <Sun className="h-6 w-6 text-amber-500" />, condition: 'Clear' },
  { day: 'Wed', temp: 29, icon: <Cloud className="h-6 w-6 text-slate-400" />, condition: 'Partly Cloudy' },
  { day: 'Thu', temp: 28, icon: <CloudRain className="h-6 w-6 text-sky-600" />, condition: 'Showers' },
  { day: 'Fri', temp: 30, icon: <Sun className="h-6 w-6 text-amber-500" />, condition: 'Clear' },
];

const WeatherPage: React.FC = () => {
  const [currentTemp, setCurrentTemp] = useState(30);
  const [humidity, setHumidity] = useState(55);
  const [windSpeed, setWindSpeed] = useState(14);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => prev + (Math.random() > 0.5 ? 0.1 : -0.1));
      setHumidity(prev => Math.max(30, Math.min(90, prev + (Math.random() > 0.5 ? 1 : -1))));
      setWindSpeed(prev => Math.max(5, Math.min(30, prev + (Math.random() > 0.5 ? 0.5 : -0.5))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Weather Intelligence</h1>
          <div className="flex items-center text-emerald-600 font-medium">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Live</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{currentTemp.toFixed(1)}°C</p>
          </div>
          <div className="h-10 w-px bg-slate-100"></div>
          <Sun className="h-10 w-10 text-amber-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <WeatherStat icon={<Droplets className="text-sky-500"/>} label="Humidity" value={`${humidity}%`} sub="Moderate" />
        <WeatherStat icon={<Wind className="text-slate-500"/>} label="Wind Speed" value={`${windSpeed.toFixed(1)} km/h`} sub="North-East" />
        <WeatherStat icon={<CloudRain className="text-sky-600"/>} label="Precipitation" value="0.0 mm" sub="Dry weather" />
        <WeatherStat icon={<Thermometer className="text-red-500"/>} label="UV Index" value="8" sub="Very High" />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">5-Day Forecast</h3>
          <span className="text-xs text-slate-400 font-medium">Updated 1 min ago</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-slate-100">
          {initialForecast.map((f) => (
            <div key={f.day} className="p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-4">{f.day}</p>
              <div className="flex justify-center mb-4">{f.icon}</div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{f.temp}°</p>
              <p className="text-xs text-slate-400 font-medium">{f.condition}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
            <Zap className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-emerald-900 mb-2">Smart Irrigation Advisory</h4>
            <p className="text-emerald-800/70 leading-relaxed">
              High temperatures expected in Pune for the next 48 hours. We recommend increasing the morning irrigation cycle for your sugarcane and vegetable crops to prevent heat stress. Soil moisture sensors indicate level 4/10.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherStat: React.FC<{ icon: React.ReactNode; label: string; value: string; sub: string }> = ({ icon, label, value, sub }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-emerald-200 dark:hover:border-emerald-600 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">{icon}</div>
      <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</span>
    </div>
    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{value}</p>
    <p className="text-xs text-slate-400 font-medium">{sub}</p>
  </div>
);

export default WeatherPage;
