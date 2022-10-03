import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import MovieElement from "./MovieElement"
import CastElement from "./CastElement"

const ContentList = ({ title, type, content }) => {
  const prevRef = useRef()
  const nextRef = useRef()

  return (
    <div className="mb-8">
      <h4 className="mx-8 lg:mx-16 mb-4 text-3xl font-bold">
        {type === "cast" ? "Cast" : title}
      </h4>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        className="px-8 lg:px-16 pt-4 -mt-4 pb-4 -mb-4"
        breakpoints={{
          768: {
            spaceBetween: 16,
            slidesPerView: 4,
            navigation: { prevEl: prevRef.current, nextEl: nextRef.current }
          },
          1024: { spaceBetween: 24, slidesPerView: 6 }
        }}
      >
        {content.map((element) => (
          <SwiperSlide key={element.id}>
            {type === "movies" ? (
              <MovieElement movie={element} />
            ) : (
              <CastElement person={element} />
            )}
          </SwiperSlide>
        ))}
        <div
          ref={prevRef}
          className="swiper-button-prev hidden lg:flex top-0 after:content-[''] w-16 h-full opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <HiChevronLeft className="text-indigo-500 text-5xl" />
        </div>
        <div
          ref={nextRef}
          className="swiper-button-next hidden lg:flex top-0 after:content-[''] w-16 h-full opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <HiChevronRight className="text-indigo-500 text-5xl" />
        </div>
      </Swiper>
    </div>
  )
}

export default ContentList
