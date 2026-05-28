import SharProps from "@/components/components/Hooks/SharProps"
import { useContext } from "react"
import WeatherIcon from "./Weathersvg"
//import { useTranslation } from 'react-i18next';
import {getTime} from '@/function'
export default function Header(){
let {day,month,year} = getTime()
let {weatherProp,Coordinates} = useContext(SharProps)
let IconComponets = weatherProp.temperature ?weatherProp.temperature.emoji:``
let color = weatherProp.temperature?weatherProp.temperature.color:``
return(<div className="flex justify-between  w-full  p-10 outline-8 h-1/2 rounded-2xl m-2  items-center">
<WeatherIcon code={weatherProp.weather_status.code} ></WeatherIcon>
<div className="w-full flex flex-col text-white  text-end p-4 ">
        {/*CITY NAME */}
        <h1 className="text-xl lg:text-5xl lg:mb-20 font-medium items-start">{Coordinates.city}</h1>
        {/*WEATHER TEMP */}
        <div className="items-center    flex w-3/5 lg:w-1/2 self-end"  dir="rtl">
                {IconComponets?<IconComponets className={`w-full  h-15 ${color}`} ></IconComponets>:``}
                <span className={`text-[15px] lg:text-2xl ${color}`}>ºC</span>
                <span className={`text-4xl lg:text-7xl w-1/2 ${color}`}>
                {weatherProp.temperature?weatherProp.temperature.value.split("º")[0] :``}</span>
        </div>
        {/*DATE */}
        <h1 className="lg:text-lg items-end lg:mt-10 lg:mr-4 font-medium">{day}-{month}-{year}</h1>
</div>
</div>)
}

