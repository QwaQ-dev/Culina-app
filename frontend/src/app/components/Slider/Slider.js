"use client"
// import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Montserrat } from "next/font/google";

export default function Slider(){
    return(
          <Swiper 
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        // autoplay={{
        //   delay: 6000,
        // }}
        className="font-montserrat md:flex hidden my-10 "
        navigation={true}
        // modules={[Autoplay]}
      >
        <SwiperSlide>
          <div className="bg-nedoorange flex flex-row justify-between mx-10 h-52 lg:mx-36 lg:my-10 rounded-2xl lg:h-80 2xl:h-full 2xl:mx-52">
            <div className="flex flex-col justify-between text-center items-center w-1/2">
              <div></div>
              <div className="flex justify-between flex-col w-full text-wrap p-10 lg:px-10">
                <p className="text-center text-xl lg:text-4xl text-wrap">We can help you with your choice!</p>
              </div>
              <div className="text-start w-full py-4 px-10">
                <p className="text-start">Culina Inc.</p>
              </div>
            </div>
            <div className="p-6 lg:p-12 w-1/3 flex items-center justify-center">
              <img
                src="illustr/first-slide.png"
                className="w-full max-w-[100px] lg:max-w-[200px] 2xl:max-w-[400px] max-h-full object-contain"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-nedoorange flex flex-row justify-between mx-10 h-52 lg:mx-36 lg:my-10 rounded-2xl lg:h-80 2xl:h-full 2xl:mx-52">
              <div className="p-6 lg:p-12 w-1/3"><img src="illustr/second-slide.png" className=" lg:w-96 " alt="" /></div>
              <div className="flex flex-col justify-between text-center items-center w-1/2">
                <div></div>
                <div className="flex justify-between flex-col w-full text-wrap lg:px-10">
                  <p className="text-center text-xl p-4 lg:text-3xl text-wrap">"If you want to become a great chef, you have to work with great chefs. And that’s exactly what I did."</p>
                </div>
                <div className="text-start w-full py-4 px-10">
                  <p className="text-end">Gordon Ramsay</p>
                </div>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-nedoorange flex flex-row justify-between mx-10 h-52 lg:mx-36 lg:my-10  rounded-2xl lg:h-80 2xl:h-full 2xl:mx-52">
              <div className="flex flex-col justify-between text-center items-center w-1/2">
                <div></div>
                <div className="flex justify-between flex-col w-full text-wrap lg:px-10">
                  <p className="text-center text-xl lg:text-4xl text-wrap">“Life is a small kitchen 
                  in which we prepare dishes called happiness.”</p>
                </div>
                <div className="text-start w-full py-4 px-10 lg:px-10">
                  <p className="text-start">Paul Bocuse</p>
                </div>
              </div>
              <div className="p-6 lg:p-12 w-1/3"><img src="illustr/third-slide.png" className="w-40 lg:w-60 " alt="" /></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-nedoorange flex flex-row justify-between mx-10 h-52 lg:mx-36 lg:my-10  rounded-2xl lg:h-80 2xl:h-full 2xl:mx-52">
              <div className="p-12 w-1/3"><img src="illustr/fourth-slide.png" className="w-40 lg:w-72 " alt="" /></div>
              <div className="flex flex-col justify-between text-center items-center w-1/2">
                <div></div>
                <div className="flex justify-between flex-col w-full text-wrap px-4 py-6 lg:px-10">
                  <p className="text-center lg:text-2xl 2xl:text-4xl text-wrap">“To eat well, I always disagree with critics who say that all restaurants should be fine dining. You can get a Michelin star if you serve the best hamburger in the world.”</p>
                </div>
                <div className="text-start w-full py-2 lg:py-4 px-10">
                  <p className="text-end">David Chang</p>
                </div>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-nedoorange flex flex-row justify-between mx-10 h-52 lg:mx-36 lg:my-10 rounded-2xl lg:h-80 2xl:h-full 2xl:mx-52">
              <div className="flex flex-col justify-between text-center items-center w-1/2">
                <div></div>
                <div className="flex justify-between flex-col w-full text-wrap px-10">
                  <p className="text-center lg:text-3xl text-wrap">“Play to each element’s strengths: use Salt to enhance, Fat to carry, and Acid to balance flavor.”</p>
                </div>
                <div className="text-start w-full py-4 px-10">
                  <p className="text-start">Samin Nosrat</p>
                </div>
              </div>
              <div className="p-6 lg:p-12 w-1/3"><img src="illustr/fifth-slide.png" className="w-36 lg:w-52 " alt="" /></div>
            </div>
        </SwiperSlide>
      </Swiper> 
)


}