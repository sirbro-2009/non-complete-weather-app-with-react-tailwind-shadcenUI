import SelectBar from "./header_components/selectBar"
import SearchBar from "./header_components/searchBar"
import { MapPin } from "lucide-react";
import SharProps from "./Hooks/SharProps"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { fetchLocal } from "@/function";

export function Header() {
  let {t} = useTranslation()
  let {setWetherProp,setShowAlert,setCoordinates} = useContext(SharProps)
  return (
    <div className="w-full p-2 items-center ">
            <div className={`text-white flex items-center w-full justify-between p-2`}>
                <h1 className="  lg:text-xl  cursor-pointer duration-1000 transition-all hover:text-white/40">{t('language_label')}</h1>
                <h1 className="  lg:text-xl  cursor-pointer duration-1000 transition-all hover:text-white/40">{t('select_language')}</h1>
                <h1 className="  lg:text-xl  cursor-pointer duration-1000 transition-all hover:text-white/40">{t('theme')}</h1>
            </div>
            <div className="text-white flex w-full justify-between align-middle">
                
                    <SelectBar></SelectBar>
                    <SearchBar></SearchBar>
                    <MapPin 
                    onClick={()=>{
                      fetchLocal(setShowAlert,setCoordinates,setWetherProp)
                      }}
                    className="mx-10 lg:mx-10 mt-4 duration-500 transition-all hover:scale-250 cursor-pointer scale-200 "></MapPin>
            </div>

    </div>
  )
}