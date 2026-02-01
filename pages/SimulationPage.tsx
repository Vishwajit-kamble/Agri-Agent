
import React, { useState, useMemo } from 'react';
import { Droplets, Thermometer, Sprout, TrendingUp, Info, AlertTriangle, Lightbulb, RefreshCcw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language, getTranslation } from '../translations';

interface SimulationPageProps {
  language: Language;
}

// This Digital Twin is a prototype visualization using rule-based estimates, not a real-time AI prediction system.
const SimulationPage: React.FC<SimulationPageProps> = ({ language }) => {
  const [water, setWater] = useState(500);
  const [fertilizer, setFertilizer] = useState(100);
  const [crop, setCrop] = useState('Corn');
  const [isSimulating, setIsSimulating] = useState(false);
  const [updateTick, setUpdateTick] = useState(0);

  const t = getTranslation(language).simulation;

  // Simple growth model simulation
  const results = useMemo(() => {
    // Water effect: optimal is around 600-800
    const waterFactor = 1 - Math.abs(water - 700) / 1000;
    // Fertilizer effect: optimal is around 150
    const fertilizerFactor = 1 - Math.abs(fertilizer - 150) / 300;
    
    const baseYield = crop === 'Corn' ? 8 : (crop === 'Wheat' ? 6 : 10);
    const predictedYield = baseYield * waterFactor * fertilizerFactor;
    const sustainabilityScore = (waterFactor * 0.6 + fertilizerFactor * 0.4) * 100;
    const cost = (water * 0.05) + (fertilizer * 2.5);

    // Generate forecast data for a chart (growth over 6 months)
    const chartData = Array.from({ length: 6 }, (_, i) => ({
      month: `Month ${i + 1}`,
      biomass: Math.max(0, (predictedYield / 6) * (i + 1) * (0.8 + Math.random() * 0.4))
    }));

    return {
      yield: Math.max(0, predictedYield).toFixed(1),
      sustainability: Math.max(0, Math.min(100, sustainabilityScore)).toFixed(0),
      cost: cost.toFixed(0),
      chartData
    };
  }, [water, fertilizer, crop]);

  // Rule-based deltas for "Update Forecast": yield ±0.2, sustainability ±2%, cost ±₹10 (no randomness).
  const cycle = updateTick % 3;
  const deltaY = (cycle === 0 ? 0 : cycle === 1 ? 0.2 : -0.2);
  const deltaS = (cycle === 0 ? 0 : cycle === 1 ? 2 : -2);
  const deltaC = (cycle === 0 ? 0 : cycle === 1 ? 10 : -10);
  const displayedYield = (parseFloat(results.yield) + deltaY).toFixed(1);
  const displayedSustain = Math.max(0, Math.min(100, parseFloat(results.sustainability) + deltaS)).toFixed(0);
  const displayedCost = (parseFloat(results.cost) + deltaC).toFixed(0);

  const handleRecalculate = () => {
    setIsSimulating(true);
    setUpdateTick((prev) => prev + 1);
    setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.title}</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-emerald-600" />
              {t.controls}
            </h3>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4">{t.cropType}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Corn', 'Wheat', 'Rice'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCrop(c)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        crop === c ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.waterInput}</label>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{water} L</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={water}
                  onChange={(e) => setWater(parseInt(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.fertilizerInput}</label>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{fertilizer} kg</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={fertilizer}
                  onChange={(e) => setFertilizer(parseInt(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <button
                onClick={handleRecalculate}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
              >
                <RefreshCcw className={`h-4 w-4 ${isSimulating ? 'animate-spin' : ''}`} />
                {isSimulating ? t.runSim : 'Update Forecast'}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {t.optimization}
            </h4>
            <p className="text-sm text-amber-800/80 leading-relaxed">
              Based on historical Pune region averages (demo data), {crop} yields peak when irrigation is around 700L and fertilizer is kept at 150kg/ha.
            </p>
          </div>
        </div>

        {/* Main Simulation View */}
        <div className="lg:col-span-8 space-y-8">
          {/* Results Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.yield}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">{displayedYield}</span>
                <span className="text-sm text-slate-500 mb-1">tons/ha</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${(parseFloat(displayedYield) / 12) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.soilHealth}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-emerald-600">{displayedSustain}%</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-1000" 
                  style={{ width: `${displayedSustain}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.cost}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">₹{displayedCost}</span>
                <span className="text-sm text-slate-500 mb-1">/ha</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-1000" 
                  style={{ width: `${(parseFloat(displayedCost) / 2000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2">{t.simulationMode}</p>

          {/* Visual Twin View */}
          <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden h-[450px] flex flex-col">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Simulated Plot Visual</h3>
                  <p className="text-slate-400 text-sm">Real-time Digital Twin rendering</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/10 text-emerald-400 text-xs font-bold backdrop-blur-md flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  SYSTEMS NOMINAL
                </div>
              </div>

              <div className="flex-grow flex items-center justify-center">
                {/* Visual Farm Grid */}
                <div className="grid grid-cols-4 gap-4 w-full max-w-md">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const health = parseFloat(results.sustainability);
                    let colorClass = 'bg-emerald-600';
                    if (health < 40) colorClass = 'bg-amber-600';
                    if (health < 20) colorClass = 'bg-red-800';
                    
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-xl shadow-inner transition-all duration-1000 ${colorClass}`}
                        style={{ 
                          opacity: 0.3 + (Math.random() * 0.7),
                          transform: `scale(${0.9 + Math.random() * 0.2})`
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={results.chartData}>
                    <defs>
                      <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="biomass" stroke="#10b981" fillOpacity={1} fill="url(#growthGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
