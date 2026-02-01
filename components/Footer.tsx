
import React from 'react';
import { Page } from '../types';
import { Leaf, Twitter, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-emerald-950 dark:bg-slate-900 dark:border-t dark:border-slate-700 text-emerald-50 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-emerald-400 mr-2" />
              <span className="text-xl font-bold tracking-tight">AgriAgent</span>
            </div>
            <p className="text-emerald-200/70 text-sm leading-relaxed mb-6">
              Empowering farmers globally with advanced AI crop diagnostics and market intelligence.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 cursor-pointer hover:text-emerald-400" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-emerald-400" />
              <Github className="h-5 w-5 cursor-pointer hover:text-emerald-400" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400 text-xs uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-sm text-emerald-200/70">
              <li><button onClick={() => onNavigate(Page.Diagnose)} className="hover:text-white">Crop Diagnosis</button></li>
              <li><button onClick={() => onNavigate(Page.Market)} className="hover:text-white">Market Insights</button></li>
              <li><button onClick={() => onNavigate(Page.Store)} className="hover:text-white">AgriStore <span className="text-[10px] text-amber-400 font-bold ml-1">Soon</span></button></li>
              <li><button onClick={() => onNavigate(Page.Schemes)} className="hover:text-white">Govt. Schemes</button></li>
              <li><button onClick={() => onNavigate(Page.Weather)} className="hover:text-white">Weather Forecast</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-400 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm text-emerald-200/70">
              <li><button onClick={() => onNavigate(Page.Team)} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => onNavigate(Page.Academy)} className="hover:text-white">AgriAcademy</button></li>
              <li><button onClick={() => onNavigate(Page.Sustainability)} className="hover:text-white font-bold text-emerald-400">Sustainability</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-400 text-xs uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-emerald-200/70">
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5" />
                <span>support@agriagent.ai</span>
              </div>
              <p className="text-[10px] opacity-40">Regional HQ: Pune, Maharashtra, India</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-emerald-900 dark:border-slate-700 pt-8 text-center text-xs text-emerald-200/40 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AgriAgent AI. All rights reserved. Building the future of agriculture.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
