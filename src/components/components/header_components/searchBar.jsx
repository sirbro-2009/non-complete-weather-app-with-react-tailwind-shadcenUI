import {
  Command,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import SharProps from "@/components/components/Hooks/SharProps"
import { useContext } from "react"
import {getWeatherApi} from '@/function'
import { useTranslation } from "react-i18next"
export default function SearchBar(){
let {res,setRes,setWetherProp,setCoordinates} = useContext(SharProps)
let {t} = useTranslation()
return(
<Command className={`w-1/2 lg:w-1/8 mx-2 text-white bg-black outline-2 rounded-2xl`}>
    <Field orientation="horizontal">
      <Input type="search"  placeholder={t('search_placeholder')} autoFocus
  className={`text-white text-center  rounded-lg text-2xl m-2`}
onInput={(e)=>{
if(e.target.value.trim()){
fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${e.target.value}&count=5&language=en&format=json&language=${localStorage.getItem("i18nextLng")||`en`}`)
.then(
e=>{return e.json()}).then((e)=>{if(e.results){setRes(e)}})
}
else{
  setRes({results:[{
name:"No city! try search",
id:null
}]})
}
}} />
    </Field>
<CommandGroup>
<CommandList className={"max-h-17 overflow-scroll scroll-smooth "}>
{
res?.results?.map((e,i)=>{  
    return (<CommandItem key={i}
    onSelect={()=>{
if(e.latitude){
    setCoordinates(
{
country:e.country,
region:e.admin1,
city:e.name,
latitude:e.latitude,
longitude:e.longitude
})  
getWeatherApi({latitude:e.latitude,longitude:e.longitude},setWetherProp)

}

}}
className={`cursor-pointer
whitespace-nowrap
my-2 transition-all text-center duration-1000 bg-black text-white `}>{e.name}{e.country?'-':``}{e.country}</CommandItem>)})}
                            </CommandList>
                            </CommandGroup>
                    </Command>
)
}
