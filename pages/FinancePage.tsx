
import React, { useState } from 'react';
import { CreditCard, Wallet, ShieldCheck, PieChart, ArrowUpRight, CheckCircle2, AlertCircle, Info, Landmark, Coins, Lock, UserPlus, X, Umbrella, CloudLightning, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language, getTranslation } from '../translations';
import { Page } from '../types';

interface FinancePageProps {
  language: Language;
  user?: any;
  onNavigate: (page: Page) => void;
}

const cashflowData = [
  { month: 'Oct', expenses: 4500, income: 0 },
  { month: 'Nov', expenses: 3200, income: 0 },
  { month: 'Dec', expenses: 1500, income: 0 },
  { month: 'Jan', expenses: 1200, income: 5000 },
  { month: 'Feb', expenses: 800, income: 12000 },
  { month: 'Mar', expenses: 1000, income: 15000 },
];

const insurancePlans = [
  {
    id: 'pmfby',
    name: 'PMFBY (Standard)',
    icon: <Umbrella className="h-6 w-6" />,
    color: 'bg-emerald-100 text-emerald-600',
    description: 'Government-subsidized crop insurance covering yield losses due to natural calamities.',
    premium: '2% of sum insured',
    coverage: 'Up to ₹25,000 / hectare',
    bestFor: 'Basic protection for staple crops like Wheat & Rice.',
    processing: '15-30 Days'
  },
  {
    id: 'climate-shield',
    name: 'Climate-Shield Plus',
    icon: <CloudLightning className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-600',
    description: 'Index-based insurance that pays out automatically when weather thresholds (heat/rain) are crossed.',
    premium: '₹850 / annum',
    coverage: 'Up to ₹40,000 / hectare',
    bestFor: 'Sugarcane & Grapes in the Pune microclimate regions.',
    processing: '7 Days (Instant Payout)'
  },
  {
    id: 'revenue-guard',
    name: 'Revenue-Guard',
    icon: <TrendingDown className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-600',
    description: 'Hybrid protection against both crop failure and market price volatility in local Mandis.',
    premium: '₹1,200 / annum',
    coverage: 'Up to 90% of expected revenue',
    bestFor: 'High-value cash crops like Soybeans & Onions.',
    processing: '14 Days'
  }
];

const FinancePage: React.FC<FinancePageProps> = ({ language, user, onNavigate }) => {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const t = getTranslation(language).finance;

  // Simulated credit score
  const creditScore = user ? 745 : null;

  const handleLoanApply = () => {
    setShowComingSoonModal(true);
  };

  const handleInsuranceView = () => {
    setShowInsuranceModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t.title}</h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl">
            {t.subtitle}
          </p>
        </div>
        
        {/* Credit Score Display - Authenticated vs Guest */}
        <div className={`px-6 py-4 rounded-3xl text-white shadow-xl flex items-center gap-6 transition-all duration-500 ${
          user ? 'bg-emerald-600 shadow-emerald-200/50' : 'bg-slate-800 shadow-slate-200/50'
        }`}>
          <div className="text-center relative">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{t.creditScore}</p>
            {user ? (
              <p className="text-3xl font-black">{creditScore}</p>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold tracking-widest opacity-30 select-none">***</p>
                <button 
                  onClick={() => setShowComingSoonModal(true)}
                  className="text-[10px] font-bold underline hover:text-emerald-300 transition-colors"
                >
                  {t.loginToView}
                </button>
              </div>
            )}
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Status</p>
            {user ? (
              <p className="text-sm font-bold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                EXCELLENT
              </p>
            ) : (
              <p className="text-sm font-bold flex items-center gap-1 opacity-40">
                <Lock className="h-4 w-4" />
                LOCKED
              </p>
            )}
          </div>
        </div>
      </div>

      {user ? (
        <div className="mb-12 p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8 animate-in slide-in-from-top-4 duration-700">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm text-slate-500 dark:text-slate-400">
            <Info className="h-10 w-10" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.comingSoon}</h3>
            <p className="text-slate-600">Finance tools and credit features will be available here soon.</p>
          </div>
        </div>
      ) : (
        <div className="mb-12 p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-8 animate-in slide-in-from-top-4 duration-700">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm text-emerald-600 dark:text-emerald-400">
            <UserPlus className="h-10 w-10" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">{t.authRequired}</h3>
            <p className="text-emerald-800/70">{t.authDesc}</p>
          </div>
          <button 
            onClick={() => onNavigate(Page.Login)}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all whitespace-nowrap"
          >
            Create Account
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Micro Loans */}
        <div className={`bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col transition-opacity ${!user ? 'opacity-90' : ''}`}>
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
            <Coins className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t.microLoans}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
            {t.loanDescription}
          </p>
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Interest Rate</span>
              <span className="font-bold text-emerald-600">4% p.a.</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Max Amount</span>
              <span className="font-bold">₹50,000</span>
            </div>
          </div>
          <button 
            onClick={handleLoanApply}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            {!user && <Lock className="h-4 w-4 text-slate-400" />}
            {t.applyNow}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Insurance */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t.insurance}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
            {t.insureDescription}
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs font-bold text-slate-900">Current Risk Level: High</p>
                <p className="text-[10px] text-slate-400">Predicted Heatwave in Shirur Cluster</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleInsuranceView}
            className="w-full py-4 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <Umbrella className="h-4 w-4" />
            {t.viewPlans}
          </button>
        </div>

        {/* Cash Flow Tracker */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col lg:col-span-1">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{t.trackExpenses}</h3>
              <p className="text-xs text-slate-400">Pune Region Farm Avg</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <PieChart className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="flex-grow h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflowData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#incomeGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex items-center justify-between p-4 bg-emerald-50 rounded-2xl">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.totalSavings}</span>
            <span className="text-lg font-black text-emerald-700">₹84,200</span>
          </div>
        </div>
      </div>

      {/* Credit Scoring Info */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-[10px] font-bold mb-6">
              AI CREDIT SCORING
            </div>
            <h2 className="text-3xl font-bold mb-6">How your score is calculated</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Unlike traditional banks, AgriAgent uses satellite imagery, yield history, and Mandi repayment data to build your credit profile. Regular usage of the <b>Diagnose</b> and <b>Digital Twin</b> features increases your score by proving proactive management.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-xl"><Landmark className="h-5 w-5 text-emerald-400" /></div>
                <span className="text-xs text-slate-300">Govt. Linkage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-xl"><ShieldCheck className="h-5 w-5 text-emerald-400" /></div>
                <span className="text-xs text-slate-300">KYC Verified</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
            <h4 className="text-lg font-bold mb-6">Eligibility Checklist</h4>
            <div className="space-y-4">
              <CheckItem label="7-day app activity" completed={!!user} />
              <CheckItem label="Successful crop diagnosis" completed={!!user} />
              <CheckItem label="Mandi transaction history" completed={!!user} />
              <CheckItem label="Aadhar/PAN verification" completed={!!user} />
              <CheckItem label="Soil health certificate (Optional)" />
            </div>
          </div>
        </div>
        
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
      </div>

      {/* Loan Application Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Apply for Input Credit</h3>
                <p className="text-slate-500">Fast-track loan for seeds & fertilizers</p>
              </div>
              <button onClick={() => setShowLoanModal(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Loan Amount (₹)</label>
                <input type="number" placeholder="e.g. 25000" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Repayment Period</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-emerald-500 transition-all">
                  <option>3 Months (Post Harvest)</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>
              <button 
                type="button"
                onClick={() => {
                  alert("Loan request submitted! Our partner bank will contact you within 24 hours.");
                  setShowLoanModal(false);
                }}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Insurance Plans Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[2.5rem] shadow-2xl p-8 lg:p-12 overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold mb-3">
                  PUNE REGION SPECIALIZED
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{t.insurancePlans}</h3>
                <p className="text-slate-500 mt-2">Compare and select the best protection for your seasonal harvest.</p>
              </div>
              <button onClick={() => setShowInsuranceModal(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insurancePlans.map((plan) => (
                <div key={plan.id} className="flex flex-col bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden group hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all p-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${plan.color}`}>
                    {plan.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{plan.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {plan.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                      <span className="text-slate-400">Premium</span>
                      <span className="font-bold text-slate-900">{plan.premium}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                      <span className="text-slate-400">Max Coverage</span>
                      <span className="font-bold text-slate-900">{plan.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Processing Time</span>
                      <span className="font-bold text-emerald-600">{plan.processing}</span>
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded-xl mb-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Best For</p>
                    <p className="text-[11px] text-slate-600 font-medium">{plan.bestFor}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setShowInsuranceModal(false);
                      setShowComingSoonModal(true);
                    }}
                    className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg text-amber-500 shadow-sm">
                <Info className="h-5 w-5" />
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                <b>Note:</b> Final premium amounts may vary based on your precise geolocation and verified soil data. Government subsidies for PMFBY are automatically applied during checkout.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-300 text-center border border-slate-100 dark:border-slate-700">
            <div className="bg-slate-100 p-4 rounded-2xl inline-flex mb-6">
              <Info className="h-10 w-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.comingSoon}</h3>
            <p className="text-slate-600 text-sm mb-8">Finance tools and credit features will be available here soon.</p>
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckItem: React.FC<{ label: string; completed?: boolean }> = ({ label, completed }) => (
  <div className="flex items-center gap-3">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${completed ? 'bg-emerald-500' : 'border border-white/20'}`}>
      {completed && <CheckCircle2 className="h-3 w-3 text-white" />}
    </div>
    <span className={`text-sm transition-colors ${completed ? 'text-white' : 'text-white/40'}`}>{label}</span>
  </div>
);

export default FinancePage;
