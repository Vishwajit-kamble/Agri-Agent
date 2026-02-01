
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Loader2, X, Sparkles, MessageCircle } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Language, getTranslation } from '../translations';

interface AgriVaaniProps {
  language: Language;
}

const AgriVaani: React.FC<AgriVaaniProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const t = getTranslation(language).vaani;

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on app language
      const langCode = language === 'mr' ? 'mr-IN' : (language === 'hi' ? 'hi-IN' : 'en-IN');
      recognitionRef.current.lang = langCode;

      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processWithGemini(text);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setTranscript(t.error);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language, t.error]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      stopSpeaking();
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopSpeaking = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }
    setIsSpeaking(false);
  };

  const processWithGemini = async (userText: string) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process as any).env.API_KEY || '' });
      
      // Step 1: Get Text Response
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `You are Agri-Vaani, a friendly voice assistant for rural farmers in India. 
          Respond in ${language === 'mr' ? 'Marathi' : (language === 'hi' ? 'Hindi' : 'English')}. 
          Keep your answer very short (max 2 sentences) because it will be spoken out loud. 
          Use simple words. Do not use markdown.`,
        }
      });

      const textOutput = response.text || '';
      setResponse(textOutput);

      // Step 2: Convert to Speech using Gemini TTS
      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: textOutput }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: language === 'en' ? 'Puck' : 'Kore' },
            },
          },
        },
      });

      const base64Audio = (ttsResponse as any).candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        setIsSpeaking(true);
        const audioBuffer = await decodeAudioData(
          decode(base64Audio),
          audioContextRef.current,
          24000,
          1,
        );
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
        sourceRef.current = source;
      }

    } catch (err) {
      console.error(err);
      setResponse(t.error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[100] w-16 h-16 bg-amber-500 text-white rounded-full shadow-2xl hover:bg-amber-600 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <Volume2 className="h-8 w-8" />
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce">
          LIVE
        </div>
        <span className="absolute left-20 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-amber-100">
          {t.title} (Voice)
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center border border-slate-100 dark:border-slate-700">
        <button 
          onClick={() => {
            stopSpeaking();
            setIsOpen(false);
          }}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-slate-400" />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold mb-4">
            <Sparkles className="h-3 w-3 mr-2" />
            AI VOICE ASSISTANT
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>

        {/* Visual Pulse for Listening */}
        <div className="relative mb-12 h-40 w-40 flex items-center justify-center">
          {(isListening || isSpeaking) && (
            <>
              <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping"></div>
              <div className="absolute inset-4 bg-amber-500/30 rounded-full animate-ping [animation-delay:0.2s]"></div>
            </>
          )}
          <button 
            onClick={toggleListening}
            className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${
              isListening ? 'bg-red-500 text-white scale-110' : 'bg-amber-500 text-white hover:scale-105'
            }`}
          >
            {isListening ? <MicOff className="h-12 w-12" /> : <Mic className="h-12 w-12" />}
          </button>
        </div>

        <div className="w-full space-y-6">
          <div className="min-h-[60px]">
            {isListening && <p className="text-amber-600 font-bold animate-pulse">{t.listening}</p>}
            {isProcessing && <p className="text-slate-400 italic flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> {t.processing}
            </p>}
            {transcript && <p className="text-slate-900 dark:text-slate-100 font-medium bg-slate-50 dark:bg-slate-700 p-4 rounded-2xl italic">"{transcript}"</p>}
          </div>

          <div className="min-h-[100px] border-t border-slate-100 pt-6">
            {isSpeaking && <p className="text-emerald-600 font-bold flex items-center justify-center gap-2 mb-2">
              <Volume2 className="h-4 w-4 animate-bounce" /> {t.speaking}
            </p>}
            {response && <p className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-relaxed">{response}</p>}
            {!transcript && !response && <p className="text-slate-400 text-sm">{t.welcome}</p>}
          </div>
        </div>

        <button 
          onClick={toggleListening}
          className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all"
        >
          {isListening ? t.stop : t.start}
        </button>
      </div>
    </div>
  );
};

export default AgriVaani;
