
import React from 'react';
import { ShoppingBag, Sparkles, Package, Truck, ShieldCheck, ArrowRight, Bell } from 'lucide-react';
import { Language, getTranslation } from '../translations';

interface StorePageProps {
  language: Language;
}

const StorePage: React.FC<StorePageProps> = ({ language }) => {
  const t = getTranslation(language).store;
  const navT = getTranslation(language).nav;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 animate-in fade-in duration-700 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-xs mb-8 animate-bounce">
            <Sparkles className="h-4 w-4 mr-2" />
            {navT.comingSoon.toUpperCase()}
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 mb-8 tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            {t.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <div className="relative group max-w-sm w-full">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600 rounded-2xl py-5 pl-6 pr-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-lg"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md">
                Notify Me
              </button>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-bold text-slate-500">{t.features.seeds}</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-bold text-slate-500">{t.features.tools}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-bold text-slate-500">{t.features.bio}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
            <img 
              src="https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&q=80&w=800" 
              alt="Farm Marketplace" 
              className="w-full aspect-[4/5] object-cover grayscale opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/30 shadow-2xl">
                <ShoppingBag className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">{t.stayTuned}</h3>
              <p className="text-emerald-50 font-medium">Revolutionizing agricultural retail.</p>
            </div>
          </div>
          
          {/* Decorative floating badges */}
          <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 z-20 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Early Access</p>
                <p className="text-sm font-bold text-slate-900">500+ Farmers Waiting</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 group hover:border-emerald-200 dark:hover:border-emerald-600 transition-all">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Direct from Source</h4>
            <p className="text-slate-500 text-sm leading-relaxed">By eliminating middlemen, we ensure farmers get the best prices and manufacturers reach the field directly.</p>
         </div>
         <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 group hover:border-emerald-200 dark:hover:border-emerald-600 transition-all">
            <h4 className="text-xl font-bold text-slate-900 mb-4">AI Recommendations</h4>
            <p className="text-slate-500 text-sm leading-relaxed">AgriAgent's diagnostic data automatically suggests the exact fertilizers and seeds your soil needs.</p>
         </div>
         <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 group hover:border-emerald-200 dark:hover:border-emerald-600 transition-all">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Rural Logistics</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Last-mile delivery to even the most remote parts of the Pune region via our regional delivery hubs.</p>
         </div>
      </div>
    </div>
  );
};

export default StorePage;
