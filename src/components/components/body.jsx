
import State from './body_components/State'
import SharProps from "./Hooks/SharProps"
import { useContext } from "react"
import { useTranslation } from 'react-i18next';
import Header from "./body_components/Content";
export function TheBody(){

let {weatherProp,Coordinates} = useContext(SharProps)
let {t} = useTranslation()

return (
<div className={`w-full h-1/5 backdrop-blur-3xl bg-[#0B0F19] lg:w-1/2 lg:self-center  `}>
<h1 className={`text-4xl font-normal   text-white  text-center `}>{t('title') }</h1>
<div className="w-full flex flex-col  p-4"> 
<Header></Header>
<h1 className={`text-2xl font-normal   text-white  text-center my-2 `}>{t("Additional_Info") }</h1>
<State obj={weatherProp}></State>
</div>
</div>
)
}
