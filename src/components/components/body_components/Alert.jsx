import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useTranslation } from "react-i18next"
export default function AlertDestructive() {
const {t} = useTranslation()
    return (
<div className="w-full flex justify-center p-4 fixed inset-0 z-50 items-center bg-black/50"> 
    <Alert variant="destructive" className="max-w-md text-center w-full  border border-red-500/20 text-red-500 rounded-xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <AlertCircleIcon className="h-5 w-5 text-red-500 text-3xl" />
      <div className="ml-3 text-center">
      <AlertTitle className={"font-bold text-red-500 mb-1 text-3xl "}>{t('alert')}</AlertTitle>
      <AlertDescription className={'text-gray-400 text-xl leading-relaxed'}>
        {t('alert_des')}
      </AlertDescription>        
      </div>

    </Alert>
    </div>
  )
}
