import { SkeletonDemo } from "./SkeletonDemo"
import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/card"
import {
  CarouselItem,
} from "@/components/ui/carousel"
import CarouselSize from "./CarouselSize"
import SharProps from '@/components/components/Hooks/SharProps'
import { useContext } from "react"
export default function Hourly(){
const {t} = useTranslation()
const {weatherProp} = useContext(SharProps)
const {weather_status,temperature,Humidity,time} = weatherProp.more.hourly

}