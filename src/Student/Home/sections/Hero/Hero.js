import { useState, useEffect } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./Slide";
import { getItems } from "../../../../Shared/services/requests";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Hero = () => {
  const [data, setData] = useState([]);
  SwiperCore.use([Autoplay]);

  useEffect(() => {
    getItems("scholarship").then((resp) =>
      setData(resp.data.filter((item) => item.status === 1))
    );
  }, []);

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: true }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <Slide data={data} slideNo={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
