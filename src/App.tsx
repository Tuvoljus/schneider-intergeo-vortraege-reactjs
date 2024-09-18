import React from 'react';
import logo from './logo.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header >
       
      </header>
      <main>
      <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          // @ts-ignore
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          ...
        </Swiper>
      </main>
    </div>
  );
}

export default App;
