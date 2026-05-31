import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

import { useTranslation } from 'react-i18next';
if(!localStorage.getItem("i18nextLng")){
  localStorage.setItem("i18nextLng","en")
}
export default function SelectBar(){
  const {t,  i18n } = useTranslation();

  const handleLanguageChange = (e) => {

    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    
    document.dir = selectedLang === 'ar' ? 'rtl' : 'ltr';
  }
    return (<><NativeSelect className={`h-1/2 self-center`}onChange={handleLanguageChange} value={i18n.language}> 
                                <NativeSelectOption  disabled>{t('select-l')}</NativeSelectOption>
                                <NativeSelectOption value="ar">العربية </NativeSelectOption>
                                <NativeSelectOption value="en">English</NativeSelectOption>
                    </NativeSelect></>)
}