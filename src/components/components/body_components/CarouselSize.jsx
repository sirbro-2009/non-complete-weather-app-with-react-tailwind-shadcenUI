import {
Carousel,
CarouselContent,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel"
import { useTranslation } from 'react-i18next';
export default function CarouselSize({children }) {
const { i18n } = useTranslation();
const isRtl = i18n.language === 'ar';
return (
    <Carousel
        opts={{
        align: "start",
        direction: isRtl ? "rtl" : "ltr",
        }}
        dir={isRtl ? "rtl" : "ltr"}
        className="w-[80%] lg:w-[90%]  rounded-xl  self-center">
        <CarouselContent className='w-full ' >
            {children}
        </CarouselContent >
        <CarouselPrevious className={'p-4'}/>
        <CarouselNext className={'p-4'}/>
    </Carousel>
)
}
