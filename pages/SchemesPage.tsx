
import React, { useState } from 'react';
import { Search, Landmark, ExternalLink, CheckCircle2, ChevronRight, Filter, Info, MapPin } from 'lucide-react';
import { Language, getTranslation } from '../translations';

interface Scheme {
  id: string;
  name: string;
  category: 'finance' | 'irrigation' | 'equipment' | 'insurance';
  benefit: string;
  eligibility: string;
  source: 'Central' | 'State';
  tag: string;
}

const schemesData: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'finance',
    benefit: '₹6,000 per year in three installments.',
    eligibility: 'All landholding farmer families.',
    source: 'Central',
    tag: 'Income Support'
  },
  {
    id: 'namo-shetkari',
    name: 'Namo Shetkari Mahasanman Nidhi',
    category: 'finance',
    benefit: 'Additional ₹6,000 per year from Maharashtra Govt.',
    eligibility: 'Farmers registered under PM-KISAN in MH.',
    source: 'State',
    tag: 'MH Special'
  },
  {
    id: 'magel-tyala',
    name: 'Magel Tyala Shet Tale (Farm Pond)',
    category: 'irrigation',
    benefit: 'Subsidy up to ₹50,000 for farm pond construction.',
    eligibility: 'Farmers with at least 0.40 hectare of land.',
    source: 'State',
    tag: 'Water Security'
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM (Solar Pumps)',
    category: 'irrigation',
    benefit: '60% subsidy on solar water pumps.',
    eligibility: 'Individual farmers, cooperatives, clusters.',
    source: 'Central',
    tag: 'Renewable Energy'
  },
  {
    id: 'krishi-yantrikaran',
    name: 'SMAM (Agri Mechanization)',
    category: 'equipment',
    benefit: '40% to 50% subsidy on tractors and tools.',
    eligibility: 'Small and marginal farmers preferred.',
    source: 'Central',
    tag: 'Equipment'
  },
  {
    id: 'gopinath-munde',
    name: 'Gopinath Munde Shetkari Apghat Vima',
    category: 'insurance',
    benefit: 'Accidental insurance cover up to ₹2 Lakhs.',
    eligibility: 'Farmers in Maharashtra aged 10-75 years.',
    source: 'State',
    tag: 'Safety'
  }
];

interface SchemesPageProps {
  language: Language;
}

const SchemesPage: React.FC<SchemesPageProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = getTranslation(language).schemes;

  const filteredSchemes = schemesData.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-6">
            <Landmark className="h-4 w-4 mr-2" />
            Empowering Agriculture
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
            <Info className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Update</p>
            <p className="text-sm font-bold text-slate-900">May 2024 Policies</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-12 flex flex-col lg:flex-row gap-6">
        <div className="flex-grow relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-[2rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(t.categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-4 rounded-2xl text-sm font-bold transition-all border ${
                selectedCategory === key 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="group bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-600 transition-all shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 flex flex-col overflow-hidden">
            <div className="p-8 flex-grow">
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  scheme.source === 'Central' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {scheme.source} Govt.
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{scheme.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{scheme.name}</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.benefit}</p>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{scheme.benefit}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.eligibility}</p>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">{scheme.eligibility}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 pt-0 mt-auto">
              <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                {t.applyNow}
                <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Support Card */}
      <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-4">
            <MapPin className="h-4 w-4" />
            Pune District Support
          </div>
          <h2 className="text-3xl font-black mb-6">Need help with documentation?</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Our AgriAgents in the Pune region provide free assistance for 7/12 extracts, 8A documents, and online application portal registrations.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
              Locate Nearest CSC <ExternalLink className="h-4 w-4" />
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
              Download Guidelines
            </button>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-sm">
          <div className="p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10">
            <h4 className="font-bold mb-6 text-slate-200">Required Documents (Checklist)</h4>
            <ul className="space-y-4">
              {['Aadhar Card Linkage', '7/12 Utara (Land Record)', '8A Document', 'Bank Passbook Copy', 'Active Mobile Number'].map((doc, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold text-[10px]">
                    {i+1}
                  </div>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default SchemesPage;
