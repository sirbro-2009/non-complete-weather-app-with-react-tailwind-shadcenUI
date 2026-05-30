const weatherIcons = {
  0: "Clear day",
  1: "Partly cloudy-day",
  2: "Cloudy",
  3: "Overcast",
  61: "Rain",
  71: "Snow",
  80: "Thunderstorms rain",
}
import { 
  Thermometer, 
  ArrowUp, 
  ArrowDown, 
  Wind, 
  Sunrise, 
  Sunset, 
  CloudSun, 
  Droplets, 
  Eye ,
Sparkles,
Sun,
CloudRain
} from "lucide-react";

function getTime(){
let date = new Date(Date.now())
let day = date.getDate()
let month = date.getMonth()+1
let year = date.getFullYear()
let hour = date.getHours()
setInterval(() => {
date = new Date(Date.now())
day = date.getDate()
month = date.getMonth()+1
year = date.getFullYear()
hour = date.getHours()
}, 1000);
return {
  day:day,
  month:month,
  year:year,
  theHour:hour
}
}
let showAlertFunction = (setShowAlert)=>{
setShowAlert(true)
setInterval(() => {
setShowAlert(false)
}, 10000);

}

function fetchLocal(setShowAlert,setCoordinates,setWetherProp){
                      try{
                          navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                        if(result.state === 'denied'){
                                setShowAlert(true)
                                setTimeout(() => {
                                setShowAlert(false)
                                }, 5000)}
                        else{
                            
                          navigator.geolocation.getCurrentPosition((pos)=>{
                          fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.c1726c6a2a12b42ad99a440efb52627d&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=${localStorage.getItem("i18nextLng")||'en'}`)
                          .then(
                          e=>{return e.json()}).then((e)=>{
                            const object = {
                              country:e.address.country,
                              region:e.address.state,
                              city:e.address.city,
                              latitude:e.lat,
                              longitude:e.lon
                            }
                            setCoordinates(object)
                            localStorage.setItem("localCity",JSON.stringify(object))
                            return object
                          }).then((e)=>{
                            getWeatherApi(e,setWetherProp)})})}})
                          }
                      catch{
                          setShowAlert(true)
                          setTimeout(() => {
                          setShowAlert(false)
                          }, 5000);
                        }
}
function getState(key){
    return weatherIcons[key]
}
function getStateColor(key){
  if (key === 0)   return "text-orange-500"
  if (key === 1)  return "text-yellow-500/50"
  if (key === 2)  return "text-gray-500"
  if (key === 3)  return "text-gray-500/50"
  if (key === 61)  return "text-blue-500"
  if (key === 71)  return "text-cyan-500"
  if (key === 61)  return "text-gray-500"
  return "text-black"
}
function getTempColor(temp) {
  if (temp < 0)   return "text-blue-300"
  if (temp < 10)  return "text-blue-500"
  if (temp < 25)  return "text-green-500"
  if (temp < 35)  return "text-yellow-500"
  if (temp < 40)  return "text-orange-500"
  return "text-red-600"
}
function getHumidityColor(h) {
  if (h < 20) return "text-red-400"
  if (h < 40) return "text-orange-400"
  if (h < 60) return "text-green-500"
  if (h < 80) return "text-blue-400"
  return "text-blue-600"
}

function getWindColor(w) {
  if (w < 10) return "text-green-400"
  if (w < 30) return "text-yellow-400"
  if (w < 60) return "text-orange-400"
  if (w < 90) return "text-red-400"
  return "text-red-600"
}

function getVisibilityColor(v) {
  const km = v / 1000
  if (km < 1)  return "text-red-500"
  if (km < 5)  return "text-orange-400"
  if (km < 10) return "text-yellow-400"
  if (km < 30) return "text-green-400"
  return "text-blue-400"
}
const getOWMIcon = (code) => {
  if (code === 0) return "01d"    
  if (code <= 2)  return "02d"   
  if (code === 3) return "04d"   
  if (code <= 48) return "50d"   
  if (code <= 67) return "10d"    
  if (code <= 77) return "13d"    
  if (code <= 82) return "09d"   
  return "11d"                        
}
function isDay(e,sunrise,sunset){
const hour = parseInt(e.split("T")[1].split(":")[0])
const min = parseInt(e.split("T")[1].split(":")[1])
const sunriseHour = parseInt(sunrise.split(":")[0])
const sunriseMin = parseInt(sunrise.split(":")[1])
const sunsetHour = parseInt(sunset.split(":")[0])
const sunsetMin = parseInt(sunset.split(":")[1])
if((hour >sunriseHour  && hour <sunsetHour)||
(hour === sunriseHour && min>sunriseMin)||
(hour === sunsetHour && min<sunsetMin)
){
return true
}

else{
return false
}
}
function editTime(time){
  return time <10?time===0?12:`0${time}`:time
}
function amPm(e){

const hour = parseInt(e.split("T")[1].split(":")[0])
const min = e.split("T")[1].split(":")[1]
return {
  hour:`${hour>12?`${editTime(hour-12)}`:hour>=10?hour+"":`${editTime(hour)}`}`,
  min:min,
  type:hour>=12?"PM":"AM",
  full_hour:`${hour>12?`${editTime(hour-12)}`:hour>=10?hour+"":`${editTime(hour)}`}`+`:${min}`
}
}
function getWeatherApi(e,setWetherProp){

const currentHour = new Date().getHours()
const {latitude,longitude} = e
const link = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,visibility,weather_code,precipitation_probability,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=1`
fetch(link,{
method: 'GET',
cache: 'no-store',
}).then(
(e)=>{
  return e.json()
}).then((data)=>{
const object = {
temperature :{
emoji:Thermometer,
value:parseInt(data.current_weather.temperature)+" ºC",
color:getTempColor(parseInt(data.current_weather.temperature))
},
max_temp:{
emoji:ArrowUp,
value:parseInt(data.daily.temperature_2m_max[0])+" ºC",
color:getTempColor(parseInt(data.daily.temperature_2m_max[0]))
},
min_temp :{
emoji:ArrowDown,
value:parseInt(data.daily.temperature_2m_min[0])+" ºC",
color:getTempColor(parseInt(data.daily.temperature_2m_min[0]))
},
wind_speed :{
emoji:Wind,
value:parseInt(data.current_weather.windspeed)+ " km/h",
color:getWindColor(parseInt(data.current_weather.windspeed))
} ,
sunrise:{
emoji:Sunrise,
color:'text-orange-500',
value:data.daily.sunrise[0].split("T")[1]
},
sunset:{
emoji:Sunset,
color:"text-yellow-700",
value:data.daily.sunset[0].split("T")[1]
},
weather_status:{
emoji:CloudSun,
value:getState(data.current_weather.weathercode),
code:data.current_weather.weathercode,
color:getStateColor(data.current_weather.weathercode)
},
Humidity:{
emoji:Droplets,
value:data.hourly.relative_humidity_2m[currentHour] + " %",
color:getHumidityColor(data.hourly.relative_humidity_2m[currentHour])
},
  precipitation_probability: {
    emoji: CloudRain, 
    value: data.hourly.precipitation_probability[currentHour] + " %",
    color: "text-sky-400"
  },
visibility:{
emoji:Eye,
value:`${data.hourly.visibility[currentHour]/1000} Km`,
color:getVisibilityColor(data.hourly.visibility[currentHour])
},
apparent_temperature: {
    emoji: Sparkles, 
    value: parseInt(data.hourly.temperature_2m[currentHour]) + " ºC", 
    color: getTempColor(parseInt(data.hourly.temperature_2m[currentHour]))
  },
  uv_index: {
    emoji: Sun, 
    value: parseFloat(data.daily.uv_index_max[0]).toFixed(1),
    color: "text-amber-500"
  },
more:{
is_Day:data.current_weather.is_day === 1?true:false,
hourly:{
/*temp */
temperature:data.hourly.temperature_2m.map(e=>{return {
value:parseInt(e)+" ºC",
color:getTempColor(parseInt(e))
}}),
/*houres */
time:data.hourly.time.map(e=>{
  return {
    hour:e.split("T")[1],
    isDay:isDay(e,data.daily.sunrise[0].split("T")[1],data.daily.sunset[0].split("T")[1]),
    am_pm:amPm(e),
    is_now_time:getTime().theHour === parseInt(e.split("T")[1].split(":")[0])
  }
}),
/*weather state */
weather_status:data.hourly.weather_code.map((e)=>{
  return {
    value:getState(e),
    code:e,
    color:getStateColor(e)
  }
}),
/*r-h */
Humidity:data.hourly.relative_humidity_2m.map((e)=>{
return {
value:e + " %",
color:getHumidityColor(e)
}
})
}
}
}
console.log(object.more.hourly)
setWetherProp(object)
}).catch(()=>{
setWetherProp({
weather_status:{
value:'',
error:true
},
})
})
}
export  {showAlertFunction,getHumidityColor,getVisibilityColor,getTempColor,getWindColor,getOWMIcon,getState,getStateColor,getWeatherApi,fetchLocal,getTime}