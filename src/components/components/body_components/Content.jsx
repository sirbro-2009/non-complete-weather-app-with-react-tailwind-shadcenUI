import SharProps from "@/components/components/Hooks/SharProps"
import { useContext } from "react"
import WeatherIcon from "./Weathersvg"
//import { useTranslation } from 'react-i18next';
import {getTime} from '@/function'
import {MapPin, Calendar} from 'lucide-react'
export default function Header(){
const {day,month,year} = getTime()
const {weatherProp,Coordinates} = useContext(SharProps)
const IconComponets = weatherProp.temperature ?weatherProp.temperature.emoji:``
const color = weatherProp.temperature?weatherProp.temperature.color:``
return(<div className="flex justify-between  w-full  p-10  h-1/2 rounded-2xl m-2  items-center">
<WeatherIcon code={weatherProp.weather_status.code} is_Day={weatherProp.more?weatherProp.more.is_Day:false} ></WeatherIcon>
<div className="w-full flex flex-col text-white  text-end p-4 ">
        {/*CITY NAME */}
        <h1 className="text-lg  inline-flex lg:text-5xl w-full items-center  justify-end  lg:mb-20 font-medium " >
        {Coordinates?Coordinates.city:``}
        <MapPin className="w-5 h-5 mt-3" strokeWidth={2.5}></MapPin>
        </h1>
        {/*WEATHER TEMP */}
        <div className="items-center  justify-end  flex w-3/5 lg:w-2/5 self-end"  dir="rtl">
                {IconComponets?<IconComponets className={`w-full  h-15 ${color}`} ></IconComponets>:``}
                <span className={`text-[15px] lg:text-2xl ${color}`}>ºC</span>
                <span className={`text-4xl lg:text-7xl  ${color}`}>{weatherProp.temperature?weatherProp.temperature.value.split("º")[0] :``}</span>
        </div>
        {/*DATE */}
        
        <h1 className="lg:text-2xl justify-end p-2 flex lg:mt-10 w-11/12 lg:w-1/2 font-medium self-end" >
        {day}-{month}-{year} <Calendar className=" lg:h-5 lg:mt-1 " strokeWidth={2.5}></Calendar></h1>
</div>
</div>)
}

