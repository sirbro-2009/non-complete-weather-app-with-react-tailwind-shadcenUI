import { SkeletonDemo } from "./SkeletonDemo"
import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function CarouselSize({children }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%] lg:w-[90%]  outline-8 rounded-xl   self-center "
    >
      <CarouselContent className='w-full '>
      {children}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export  default function State({obj}){
let {t} = useTranslation()



  let allDivs = Object.keys(obj).map((e,i)=>{
  let value = e === 'weather_status' ? t(obj[e].value.replaceAll(" ","_").toLowerCase()) : obj[e].value
  if(obj.weather_status.value === ''){
    return(
    <CarouselItem  key={i}><SkeletonDemo key={i}></SkeletonDemo></CarouselItem>
    )
  }
  if(value !== 'weather_status.' && e !== 'more'){
  let IconComponets = obj[e].emoji ?obj[e].emoji:``
  let title = e === 'weather_status'?'weather':e
  return (<CarouselItem className={'basis-1/2 pl-1 lg:basis-1/3'} key={i}>
  <Card className={`text-center rounded-xl backdrop-blur-md  outline-  m-2 p-2  duration-1000 
  transition-all hover:shadow-xl cursor-pointer  bg-[#0B0F19]
  `}  key={i} >
  {IconComponets?<IconComponets className={`self-center w-full h-10 ${obj[e].color || 'text-white '}`}/>:``}
  <h1 className={` text-lg text-white`}>{
  t(title)
  }</h1>
  <h2 className={`text-lg ${obj[e].color||`text-black`} font-bold`}>{e=== 'weather_status'?value === 'weather_status.'?``:value:obj[e].value}</h2>
  </Card>
  </CarouselItem>)
  }
  else if(obj['weather_status'].error){
  return(<div className={`text-center rounded-xl bg-white/50 backdrop-blur-md m-2 p-2 w-90 lg:w-130`} key={()=>{Date.now()}}>
  <h1 className="text-3xl">:(</h1>
  <h1 className={`font-bold text-lg text-black`}>{
  t('error_title')
  }</h1>
  <h2 className={`text-lg text-red-500 font-bold`}>{t('error')}</h2>
  </div>)
  }

})

/*

*/

return (<CarouselSize className="">{allDivs}</CarouselSize>)
}