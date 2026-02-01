
import React from 'react';
import { Leaf, Droplets, Recycle, TreePine, ShieldCheck } from 'lucide-react';
import { Language, getTranslation } from '../translations';

interface SustainabilityPageProps {
  language: Language;
}

const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ language }) => {
  const t = getTranslation(language).sustainability;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-6">
          <Leaf className="h-4 w-4 mr-2" />
          Planet First Initiative
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">{t.title}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
          <Droplets className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mb-6" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t.precision}</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.precisionDesc}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
          <Recycle className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mb-6" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t.soil}</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.soilDesc}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all">
          <TreePine className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mb-6" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Carbon Tracking</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Helping farmers monitor carbon sequestration to qualify for green credits and subsidies.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-emerald-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">Regenerative Farming</h2>
          <p className="text-emerald-100/70 text-lg leading-relaxed mb-8">
            AgriAgent isn't just about yield; it's about the next 100 years. Our AI identifies optimal crop rotation patterns that restore natural nutrients to the soil.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-bold">Eco-Certified</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
            className="rounded-3xl shadow-2xl" 
            alt="Nature" 
          />
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPage;
