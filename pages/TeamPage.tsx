
import React from 'react';
import { Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';
import { Language, getTranslation } from '../translations';

interface TeamPageProps {
  language: Language;
}

const members = [
  {
    name: 'Vishwajit Sunil Kamble',
    role: 'Project Lead (AI)',
    bio: 'Visionary leader focused on AI strategy, model design, and system vision. Orchestrating the future of smart agriculture through AgriAgent.',
    gender: 'male',
    image: '/team/boy-1.png.png',
  },
  {
    name: 'Sanskruti Mahendra Neharkar',
    role: 'Backend & Cloud Engineer',
    bio: 'Specialist in high-performance APIs and scalable cloud architectures. Ensuring robust data delivery and secure AI integrations.',
    gender: 'female',
    image: '/team/girl-1.png.png',
  },
  {
    name: 'Samiksha Patil',
    role: 'Front-End Developer',
    bio: 'Crafting responsive, high-performance web interfaces. Turning complex designs into seamless, interactive experiences for farmers.',
    gender: 'female',
    image: '/team/girl-2.png.png',
  },
  {
    name: 'Varad Lingse',
    role: 'UI/UX Designer',
    bio: 'Designing intuitive user flows and aesthetic layouts. Focused on making advanced technology accessible and user-friendly.',
    gender: 'male',
    image: '/team/boy-2.png.png',
  }
];

const TeamPage: React.FC<TeamPageProps> = ({ language }) => {
  const t = getTranslation(language).teamPage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-in fade-in duration-700 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="text-center mb-24">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mb-6 uppercase tracking-widest">
          The Innovators
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          The multidisciplinary team behind AgriAgent, dedicated to empowering farmers through cutting-edge technology and design excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {members.map((m) => (
          <div 
            key={m.name} 
            className="group flex flex-col bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-2xl hover:shadow-emerald-100/40 p-8"
          >
            <div className="relative mb-8 rounded-[2rem] bg-slate-100 overflow-hidden aspect-square border-4 border-white shadow-md transition-transform group-hover:-translate-y-2">
              <img
                src={m.image}
                alt={m.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">Image not found</div>';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <ExternalLink className="text-white h-6 w-6 ml-auto" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{m.name}</h3>
            <p className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">{m.role}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-8 flex-grow">
              {m.bio}
            </p>
            
            <div className="flex gap-4 pt-6 border-t border-slate-50">
              <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Linkedin className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy Section */}
      <div className="mt-32 relative overflow-hidden rounded-[4rem] bg-slate-900 p-16 lg:p-24 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-emerald-400 font-black text-sm uppercase tracking-[0.3em] mb-10">Our Philosophy</h2>
          <p className="text-white text-2xl lg:text-4xl font-light italic leading-tight mb-12">
            "We believe that the future of food security lies at the intersection of local traditional wisdom and global artificial intelligence."
          </p>
          <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </div>
    </div>
  );
};

export default TeamPage;
