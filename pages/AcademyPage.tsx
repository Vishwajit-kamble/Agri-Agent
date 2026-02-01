
import React, { useState, useEffect, useCallback } from 'react';
import { Play, BookOpen, BarChart2, Video, Sparkles, Clock, Users, ArrowRight, Zap, Target, X, CheckCircle, Droplets, Bug, Landmark } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Language, getTranslation } from '../translations';

interface AcademyPageProps {
  language: Language;
}

const liveInsightsData = [
  { name: 'Kharif', potential: 85, activeFarmers: 1200 },
  { name: 'Rabi', potential: 70, activeFarmers: 950 },
  { name: 'Zaid', potential: 45, activeFarmers: 300 },
];

const cropPopularity = [
  { name: 'Sugarcane', value: 400, color: '#10b981' },
  { name: 'Soybean', value: 300, color: '#3b82f6' },
  { name: 'Onion', value: 200, color: '#f59e0b' },
  { name: 'Grapes', value: 150, color: '#8b5cf6' },
];

const modules = [
  {
    title: 'Farming Basics & Soil Biology',
    desc: 'Understanding pH levels, organic matter, and the hidden life in your soil that powers growth.',
    duration: '18 mins',
    level: 'Beginner',
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    color: 'bg-blue-50'
  },
  {
    title: 'Smart Irrigation & Water Harvesting',
    desc: 'Learn drip irrigation setup and rainwater harvesting techniques for dry Pune seasons.',
    duration: '22 mins',
    level: 'Intermediate',
    icon: <Droplets className="h-6 w-6 text-sky-600" />,
    color: 'bg-sky-50'
  },
  {
    title: 'Pest Management: Bio vs Chemical',
    desc: 'How to identify pests early and use integrated pest management (IPM) for healthier crops.',
    duration: '30 mins',
    level: 'Intermediate',
    icon: <Bug className="h-6 w-6 text-red-600" />,
    color: 'bg-red-50'
  },
  {
    title: 'Seasonal Mastery: Crop Cycles',
    desc: 'Deep dive into Kharif, Rabi, and Zaid seasons. Which crops win in which weather?',
    duration: '25 mins',
    level: 'Beginner',
    icon: <Clock className="h-6 w-6 text-emerald-600" />,
    color: 'bg-emerald-50'
  },
  {
    title: 'Modern Agri-Tech & Drones',
    desc: 'Using drones, AI diagnostics, and precision irrigation to maximize yield efficiently.',
    duration: '20 mins',
    level: 'Advanced',
    icon: <Zap className="h-6 w-6 text-amber-600" />,
    color: 'bg-amber-50'
  },
  {
    title: 'Mandi Market & Revenue Mastery',
    desc: 'Understanding APMC cycles, pricing strategies, and how to negotiate better at the Mandi.',
    duration: '35 mins',
    level: 'Advanced',
    icon: <Landmark className="h-6 w-6 text-purple-600" />,
    color: 'bg-purple-50'
  }
];

// YouTube thumbnail URL (hqdefault = 480x360, widely available for all videos)
const getYouTubeThumbnail = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

const videos = [
  {
    id: '3TPy-T3kzO4',
    title: 'Day in Life: High-Tech Farming',
    thumbnail: getYouTubeThumbnail('3TPy-T3kzO4'),
    views: '12K',
    duration: '8:45',
    tags: ['Lifestyle', 'Tech']
  },
  {
    id: 'hEZshglhFuE',
    title: 'Hydroponics for Beginners',
    thumbnail: getYouTubeThumbnail('hEZshglhFuE'),
    views: '8.4K',
    duration: '12:20',
    tags: ['Tutorial', 'Innovation']
  },
  {
    id: 'eqpAbjD13nQ',
    title: 'Precision Soil Testing Guide',
    thumbnail: getYouTubeThumbnail('eqpAbjD13nQ'),
    views: '25K',
    duration: '6:15',
    tags: ['Basics', 'Tutorial']
  },
  {
    id: 'Ct3CL22RpTg',
    title: 'Sustainable Water Management',
    thumbnail: getYouTubeThumbnail('Ct3CL22RpTg'),
    views: '15K',
    duration: '10:05',
    tags: ['Ecology', 'Water']
  },
  {
    id: 'z2hIVIU5Vqk',
    title: 'Organic Fertilizer Secrets',
    thumbnail: getYouTubeThumbnail('z2hIVIU5Vqk'),
    views: '32K',
    duration: '14:30',
    tags: ['Bio', 'Fertilizer']
  },
  {
    id: 'z4daLqmureU',
    title: 'Future of Agriculture 2025',
    thumbnail: getYouTubeThumbnail('z4daLqmureU'),
    views: '50K',
    duration: '18:10',
    tags: ['Trends', 'Future']
  }
];

const VALID_VIDEO_ID = /^[a-zA-Z0-9_-]{10,15}$/;
const isValidVideoId = (id: string | null): id is string =>
  !!id && id.trim().length > 0 && VALID_VIDEO_ID.test(id.trim());

const AcademyPage: React.FC<AcademyPageProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'dashboard' | 'videos'>('modules');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const t = getTranslation(language).academy;

  const handleVideoClick = useCallback((videoId: string) => {
    if (!isValidVideoId(videoId)) return;
    setSelectedVideo(videoId);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // Close video on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedVideo]);

  // Prevent background scroll when modal is open; restore on close or unmount
  useEffect(() => {
    if (!selectedVideo) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedVideo]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero Section */}
      <section className="text-center mb-16 relative py-12 px-6 rounded-[3rem] bg-gradient-to-br from-emerald-600 to-teal-700 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-emerald-50 text-xs font-bold mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            THE FUTURE OF FARMING
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">{t.title}</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab('modules')}
              className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              {t.startLearning} <ArrowRight className="h-5 w-5" />
            </button>
            <div className="flex -space-x-3 items-center ml-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-600 bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                  U{i}
                </div>
              ))}
              <span className="ml-6 text-sm font-bold text-emerald-100">1.2K+ Enrolled</span>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => setActiveTab('modules')}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'modules' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          {t.modules}
        </button>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'dashboard' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'videos' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Video className="h-4 w-4" />
          Videos
        </button>
      </div>

      {/* Content Sections */}
      <div className="min-h-[600px]">
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            {modules.map((m, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-600 hover:shadow-xl transition-all flex flex-col">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${m.color}`}>
                  {m.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{m.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {m.desc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{m.level}</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{m.duration}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors">
                    <Play className="h-3 w-3" />
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{t.dashboardTitle}</h3>
                    <p className="text-slate-400">Real-time insights from our regional monitoring network</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold border border-emerald-500/20">
                    LIVE SYNC
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[350px]">
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Regional Growth Potential Index</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={liveInsightsData}>
                        <defs>
                          <linearGradient id="potentialGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#10b981' }} />
                        <Area type="monotone" dataKey="potential" stroke="#10b981" fill="url(#potentialGrad)" strokeWidth={3} />
                        <Area type="monotone" dataKey="activeFarmers" stroke="#3b82f6" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Popular Crop Distribution (Pune)</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cropPopularity} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          width={80}
                        />
                        <Tooltip
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                        />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                          {cropPopularity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex items-center gap-6 shadow-sm">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Community Impact</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100">5.2K New Farmers</p>
                  </div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 flex items-center gap-6 shadow-sm">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Target className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Course Progress</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100">Pune Hotspot Active</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-10">{t.videosTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((v) => (
                <div 
                  key={v.id} 
                  className="group cursor-pointer"
                  onClick={() => handleVideoClick(v.id)}
                >
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-4 shadow-sm border border-slate-100">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] text-white font-bold">
                      {v.duration}
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {v.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-emerald-600/80 backdrop-blur-md rounded-lg text-[10px] text-white font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">{v.title}</h4>
                  <p className="text-xs text-slate-400 font-medium">{v.views} views • Educational Content</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseVideo();
            }
          }}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseVideo}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>
            {/* YouTube iframe embedded for educational preview. Playback depends on YouTube availability. */}
            {isValidVideoId(selectedVideo) && (
              <iframe
                key={selectedVideo}
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}

      {/* Learning Path Section */}
      <section className="mt-24 p-12 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex flex-col lg:flex-row items-center gap-12 shadow-sm">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold text-emerald-900">Your Journey to Master Farmer</h2>
          <p className="text-emerald-800/70 leading-relaxed text-lg">
            Complete all modules to receive a digital certification from AgriAgent and unlock specialized AI mentoring for your first crop cycle.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">1</div>
              <span className="text-emerald-900 font-bold">Watch Video Lectures</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">2</div>
              <span className="text-emerald-900 font-bold">Practice with Digital Twin Simulators</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">3</div>
              <span className="text-slate-500 font-bold">Earn Certification</span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full max-w-sm">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-emerald-50 dark:border-slate-700 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-bold mb-2">Certification Track</h4>
            <p className="text-slate-500 text-sm mb-6">Complete your profile to track progress</p>
            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
              Join Path
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyPage;
