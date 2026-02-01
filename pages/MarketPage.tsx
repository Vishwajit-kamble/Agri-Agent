import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  MapPin,
  Bell,
  CheckCircle2,
  X,
} from "lucide-react";
import { MarketPrice } from "../types";
import { supabase } from "../lib/supabase";
import { Language } from "../translations";

/* ---------------- LANGUAGE TEXT ---------------- */

const marketText = {
  en: {
    marketTitle: "Market Intelligence",
    location: "Pune APMC Mandi, Maharashtra",
    livePrices: "Live Mandi Prices",
    unit: "₹ / Quintal",
    priceHistoryTitle:
      "Average Mandi Price History (₹ / Quintal) – Pune Region",
    infoNote:
      "Live prices reflect today's transactions. Historical prices show average monthly mandi rates.",
    alertTitle: "Mandi Alert",
    alertDesc:
      "Soybean arrivals in Pune Mandi have increased by 20% today. Expect slight price correction by evening session.",
    setAlert: "Set Price Alerts",
    alertsActive: "Alerts Active",
    avgPrice: "Average Price",
    maxPrice: "Max Price",
    topSources: "Top Regional Sources",
    logistics: "Mandi Logistics",
    truck: "Truck Availability",
    storage: "Storage Capacity",
    high: "High",
    full: "85% Full",
    loginToSetAlerts: "Please login to set price alerts.",
  },
  mr: {
    marketTitle: "बाजार माहिती",
    location: "पुणे एपीएमसी मंडी, महाराष्ट्र",
    livePrices: "थेट मंडी दर",
    unit: "₹ / क्विंटल",
    priceHistoryTitle:
      "सरासरी मंडी दर इतिहास (₹ / क्विंटल) – पुणे विभाग",
    infoNote:
      "थेट दर आजच्या व्यवहारांवर आधारित आहेत. इतिहासातील दर सरासरी मासिक बाजारभाव दर्शवतात.",
    alertTitle: "मंडी सूचना",
    alertDesc:
      "आज पुणे मंडीत सोयाबीनची आवक २०% ने वाढली आहे. संध्याकाळपर्यंत दरात थोडी घसरण अपेक्षित आहे.",
    setAlert: "दर सूचना सेट करा",
    alertsActive: "सूचना सुरू आहेत",
    avgPrice: "सरासरी दर",
    maxPrice: "कमाल दर",
    topSources: "मुख्य पुरवठा क्षेत्रे",
    logistics: "मंडी वाहतूक",
    truck: "ट्रक उपलब्धता",
    storage: "साठवण क्षमता",
    high: "जास्त",
    full: "८५% भरलेले",
    loginToSetAlerts: "दर सूचना सेट करण्यासाठी कृपया लॉगिन करा.",
  },
  hi: {
    marketTitle: "बाजार जानकारी",
    location: "पुणे एपीएमसी मंडी, महाराष्ट्र",
    livePrices: "लाइव मंडी भाव",
    unit: "₹ / क्विंटल",
    priceHistoryTitle:
      "औसत मंडी मूल्य इतिहास (₹ / क्विंटल) – पुणे क्षेत्र",
    infoNote:
      "लाइव कीमतें आज के लेन-देन पर आधारित हैं। ऐतिहासिक कीमतें औसत मासिक मंडी दर दिखाती हैं।",
    alertTitle: "मंडी अलर्ट",
    alertDesc:
      "आज पुणे मंडी में सोयाबीन की आवक 20% बढ़ी है। शाम तक कीमतों में हल्का सुधार संभव है।",
    setAlert: "मूल्य अलर्ट सेट करें",
    alertsActive: "अलर्ट सक्रिय",
    avgPrice: "औसत मूल्य",
    maxPrice: "अधिकतम मूल्य",
    topSources: "मुख्य आपूर्ति क्षेत्र",
    logistics: "मंडी लॉजिस्टिक्स",
    truck: "ट्रक उपलब्धता",
    storage: "भंडारण क्षमता",
    high: "अधिक",
    full: "85% भरा हुआ",
    loginToSetAlerts: "मूल्य अलर्ट सेट करने के लिए कृपया लॉगिन करें।",
  },
};

/* ---------------- DATA ---------------- */

const historicalData = [
  { name: "Jan", corn: 1950, wheat: 2100 },
  { name: "Feb", corn: 1980, wheat: 2150 },
  { name: "Mar", corn: 2020, wheat: 2200 },
  { name: "Apr", corn: 2050, wheat: 2250 },
  { name: "May", corn: 2090, wheat: 2275 },
  { name: "Jun", corn: 2110, wheat: 2300 },
];

const initialPrices: MarketPrice[] = [
  { crop: "Maize (Corn)", price: 2090, change: 15, trend: "up" },
  { crop: "Wheat", price: 2275, change: -5, trend: "down" },
  { crop: "Paddy (Rice)", price: 2183, change: 0, trend: "stable" },
  { crop: "Soybeans", price: 4600, change: 45, trend: "up" },
];

/* ---------------- COMPONENT ---------------- */

interface MarketPageProps {
  language: Language;
}

const MarketPage: React.FC<MarketPageProps> = ({ language }) => {
  const t = marketText[language];

  const [currentPrices, setCurrentPrices] =
    useState<MarketPrice[]>(initialPrices);
  const [alertActive, setAlertActive] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrices((prev) =>
        prev.map((p) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const change = p.change + delta;
          return {
            ...p,
            price: p.price + delta,
            change,
            trend: change > 0 ? "up" : change < 0 ? "down" : "stable",
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSetAlert = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      alert(t.loginToSetAlerts);
      return;
    }

    setAlertActive(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-24 right-4 z-50">
          <div className="bg-emerald-900 text-white px-6 py-4 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-bold">{t.alertsActive}</span>
            <button onClick={() => setShowToast(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t.marketTitle}</h1>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
            <MapPin className="h-4 w-4 mr-1" />
            {t.location}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Prices */}
        <div className="bg-white p-6 rounded-3xl border">
          <h3 className="font-bold mb-4 flex justify-between">
            {t.livePrices}
            <span className="text-xs text-slate-500">{t.unit}</span>
          </h3>

          {currentPrices.map((p) => (
            <div key={p.crop} className="flex justify-between py-2">
              <span>{p.crop}</span>
              <div className="flex items-center gap-3">
                <span className="font-bold">
                  ₹{p.price.toLocaleString("en-IN")}
                </span>
                {p.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                {p.trend === "down" && (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                {p.trend === "stable" && <Minus className="h-4 w-4" />}
              </div>
            </div>
          ))}

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4"> {t.infoNote}</p>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 h-[400px]">
          <h3 className="font-bold mb-6">{t.priceHistoryTitle}</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `₹${value} / क्विंटल`,
                  name === "corn" ? t.avgPrice : t.maxPrice,
                ]}
              />
              <Area dataKey="corn" stroke="#059669" fillOpacity={0.1} />
              <Area dataKey="wheat" stroke="#0ea5e9" fillOpacity={0.05} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
