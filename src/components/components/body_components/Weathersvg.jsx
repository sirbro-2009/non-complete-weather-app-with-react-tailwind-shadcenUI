// استيراد الأيقونات الرسمية الموحدة الحجم هندسياً
import { Sun, Cloud,CloudSun, CloudRain, Snowflake, CloudLightning, HelpCircle } from 'lucide-react';
export default function WeatherIcon({ code }) {
  const iconClasses = "w-full h-full   text-white transition-all duration-1000  filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)] stroke-[1.5]";

  switch (code) {
    case 0: 
      return <Sun className={iconClasses} />;

    case 1: 
      return <CloudSun className={iconClasses}></CloudSun>

    case 2: 
    case 3: 
      return <Cloud className={iconClasses} />;

    case 61: 
      return <CloudRain className={iconClasses} />;

    case 71: 
      return <Snowflake className={iconClasses} />;

    case 80: 
      return <CloudLightning className={iconClasses} />;

    default: 
      return <HelpCircle className="w-1/2 h-1/2 text-white    stroke-[1.5]" />;
  }
}