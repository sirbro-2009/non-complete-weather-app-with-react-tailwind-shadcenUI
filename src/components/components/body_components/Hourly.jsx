//import { SkeletonDemo } from "./SkeletonDemo"
import { 
  Thermometer, 
  Droplets, 
} from "lucide-react";
import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/card"
import WeatherIcon from "./Weathersvg"
import {CarouselItem,} from "@/components/ui/carousel"
import CarouselSize from "./CarouselSize"
import SharProps from '@/components/components/Hooks/SharProps'
import { useContext } from "react"
export default function Hourly(){
const {t} = useTranslation()
let allCarousels 
const {weatherProp} = useContext(SharProps)
try{
const {weather_status,temperature,Humidity,time} = weatherProp.more?weatherProp.more.hourly:{}
if(time && weather_status && temperature && Humidity ){
allCarousels=time.map((e,i)=>{
return (
<CarouselItem className={'basis-1/2 pl-1 lg:basis-1/3'} key={i}>
<Card className={`text-center rounded-xl backdrop-blur-md    m-2 p-2  duration-1000 transition-all hover:shadow-xl cursor-pointer  bg-[#0B0F19]`}  key={i} >
<h1 className={` text-lg text-white`}>{time[i].am_pm.hour}{time[i].am_pm.type}</h1>
{time[i].is_now_time?
<h1 className="animate-ping font-bold  text-red-500">{t('now')}</h1>:``
}
<WeatherIcon code={weather_status[i].code} is_Day={e.isDay} color={weather_status[i].color+"lg:text-xl"}></WeatherIcon>
<h2 className={`text-lg ${temperature[i].color||`text-black`} font-bold items-center  w-full flex justify-between`}>{temperature[i].value}
<Thermometer></Thermometer>
</h2>
<h2 className={`text-lg ${Humidity[i].color||`text-black`} font-bold items-center  w-full flex justify-between`}>{Humidity[i].value}
<Droplets></Droplets>
</h2>
</Card>
</CarouselItem>
)
})
}
}
catch(e){
console.log(e)
  
}
return <CarouselSize>{allCarousels}</CarouselSize>
}