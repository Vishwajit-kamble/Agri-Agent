
import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { analyzeCropImage } from '../services/geminiService';
import { DiagnosisResult } from '../types';
import { Language, getTranslation } from '../translations';
import { supabase } from '../lib/supabase';

interface DiagnosePageProps {
  language: Language;
}

const DiagnosePage: React.FC<DiagnosePageProps> = ({ language }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = getTranslation(language).diagnosePage;

  const startCamera = async () => {
    try {
      setShowCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImage(dataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processDiagnosis = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const base64Data = image.split(',')[1];
      const analysisResult = await analyzeCropImage(base64Data, language);

      
      // Save to Supabase if logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { error: dbError } = await supabase.from('diagnoses').insert({
          user_id: session.user.id,
          disease: analysisResult.disease,
          severity: analysisResult.severity,
          description: analysisResult.description,
          recommendations: analysisResult.recommendations,
          confidence: analysisResult.confidence
        });
        if (dbError) console.error("Database save failed:", dbError.message);
      }
      
      setResult(analysisResult);
    } catch (err: any) {
      console.error(err);
      const message =
        typeof err?.message === 'string'
          ? err.message
          : "Failed to analyze image due to a technical issue. Please check your internet connection and API key, then try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{t.title}</h1>
        <p className="text-slate-600">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {showCamera ? (
          <div className="relative aspect-video bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <button 
                onClick={capturePhoto}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-100"
              >
                <div className="w-12 h-12 bg-emerald-600 rounded-full"></div>
              </button>
              <button 
                onClick={stopCamera}
                className="px-6 py-2 bg-slate-900/50 text-white rounded-full backdrop-blur-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : !image ? (
          <div className="p-12 text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={startCamera}
                className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-3xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
              >
                <Camera className="h-12 w-12 text-slate-400 group-hover:text-emerald-600 mb-4" />
                <span className="font-bold text-slate-900">{t.takePhoto}</span>
              </button>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-3xl hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
              >
                <Upload className="h-12 w-12 text-slate-400 group-hover:text-emerald-600 mb-4" />
                <span className="font-bold text-slate-900">{t.uploadImage}</span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img src={image} alt="Crop to diagnose" className="w-full aspect-video object-cover" />
            <button 
              onClick={reset}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-600 hover:text-red-600 shadow-md transition-all"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            {!result && (
              <div className="p-8 bg-white dark:bg-slate-800 text-center">
                <button 
                  onClick={processDiagnosis}
                  disabled={loading}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center mx-auto"
                >
                  {loading ? (
                    <><Loader2 className="animate-spin mr-2 h-5 w-5" /> {t.analyzing}</>
                  ) : (
                    t.runAi
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="p-8 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-2xl ${
                result.severity === 'High' ? 'bg-red-100 text-red-600' :
                result.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{result.disease}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    result.severity === 'High' ? 'bg-red-100 text-red-700' :
                    result.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {result.severity} {t.severity}
                  </span>
                  <span className="text-sm text-slate-500">{t.confidence}: {(result.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {result.description}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-emerald-600" />
                {t.recommendedActions}
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={reset}
              className="mt-8 w-full py-4 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              Start New Analysis
            </button>
          </div>
        )}

        {error && (
          <div className="p-8 bg-red-50 border-t border-red-100 flex items-center gap-3 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosePage;
