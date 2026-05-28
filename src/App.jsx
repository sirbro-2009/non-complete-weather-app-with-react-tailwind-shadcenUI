import './App.css'
import { Header } from './components/components/header'
import { TheBody } from './components/components/body'
import { useState,useEffect } from 'react'
import SharProps from './components/components/Hooks/SharProps'
import {getWeatherApi} from './function'
import { useTranslation } from 'react-i18next'
    if(localStorage.getItem("i18nextLng") && localStorage.getItem("i18nextLng") === "ar"){
      document.dir = 'rtl'
    }
import AlertDestructive from './components/components/body_components/Alert'
let object 
try{
object = JSON.parse(localStorage.getItem("localCity"))
}
catch{
object = {}
}
function App() {
let {t} = useTranslation()
let [showAlert,setShowAlert] = useState(false)
let [weatherProp,setWetherProp] = useState({
weather_status:{
value:''
},
})
let [Coordinates,setCoordinates] = useState(object)
let [res,setRes] = useState({results:[{
name:t("no_city"),
id:null
}]})

{/*Fetch APIS */}
useEffect(()=>{
if(!localStorage.getItem('localCity')){
 fetch(`https://free.freeipapi.com/api/json`).then(e=>{return e.json()}).then((e)=>{
let obgj = {
country:e.countryName,
region:e.regionName,
city:e.cityName,
latitude:e.latitude,
longitude:e.longitude
}
  setCoordinates(obgj)
return obgj
}).then(e=>{
{/*wether API*/}
getWeatherApi(e,setWetherProp)
})
 
}
},[])
useEffect(()=>{
{/*CoordinatesAPI */}
if(localStorage.getItem("localCity") !== undefined){
fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.c1726c6a2a12b42ad99a440efb52627d&lat=${Coordinates.latitude}&lon=${Coordinates.longitude}&format=json&accept-language=${localStorage.getItem("i18nextLng")||'en'}`).then((e)=>{
return e.json()
}).then(e=>{
let obj = {
  latitude:e.lat,
  longitude:e.lon,
}
getWeatherApi(obj,setWetherProp)
})
}

},[Coordinates.latitude,Coordinates.longitude])

return (
<>
<SharProps.Provider value={{weatherProp,setWetherProp,Coordinates,setCoordinates,res,setRes,setShowAlert}}>
    <div className={`bg-[#0B0F19] w-full  h-screen flex flex-col font-['Rubik']`}>
      <Header></Header>
    {showAlert?<AlertDestructive></AlertDestructive>:``}
      <TheBody></TheBody>
    </div>

</SharProps.Provider>
</>
  )
}

export default App
