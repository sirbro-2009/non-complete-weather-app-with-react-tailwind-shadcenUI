
import State from './body_components/State'
import SharProps from "./Hooks/SharProps"
import { useContext } from "react"
import { useTranslation } from 'react-i18next';
import Header from "./body_components/Content";
import Hourly from './body_components/Hourly';
export function TheBody(){

let {weatherProp} = useContext(SharProps)
const {t} = useTranslation()

return (
<div className={`w-full h-1/5 backdrop-blur-3xl  lg:w-1/2 lg:self-center  `}>
<h1 className={`  text-center text-white text-3xl`}>{t('title') }</h1>
<div className="w-full flex flex-col  p-4"> 
<Header></Header>
<h1 className={`  text-center my-2 text-white text-3xl`}>{t("Additional_Info") }</h1>
<State obj={weatherProp}></State>
<h1 className={`  text-center my-2 text-white text-3xl`}>{t("every_hour") }</h1>
<Hourly></Hourly>
</div>
</div>
)
}
