import SelectBar from "@/components/components/header_components/selectBar"
import SearchBar from "@/components/components/header_components/searchBar"
import {LocateFixed  } from "lucide-react";
import SharProps from "@/components/components/Hooks/SharProps"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { fetchLocal } from "@/function";

export function Header() {
  const {t} = useTranslation()
  const {setWetherProp,setShowAlert,setCoordinates} = useContext(SharProps)
  return (
    <div className="w-full p-2 items-center ">
            <div className={`text-white flex items-center w-full justify-between  p-2`}>
                <h1 className="    cursor-pointer duration-1000 transition-all">{t('language_label')}</h1>
                <h1 className="    cursor-pointer duration-1000 transition-all">{t('select_language')}</h1>
                <h1 className="    cursor-pointer duration-1000 transition-all">{t('theme')}</h1>
            </div>
            <div className="text-white flex w-full justify-between lg:items-center">
                
                    <SelectBar></SelectBar>
                    <SearchBar></SearchBar>
                    <LocateFixed 
                    onClick={()=>{
                      fetchLocal(setShowAlert,setCoordinates,setWetherProp)
                      }}
                    className="mx-10 lg:mx-10 mt-4 duration-500 transition-all hover:scale-250 cursor-pointer scale-200 "></LocateFixed>
            </div>

    </div>
  )
}