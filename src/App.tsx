import './scss/main.scss'
import React from 'react';
// import logo from './logo.svg';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import 'swiper/css';
import './App.css';
import { ScheduleTable } from './Table_Schedule';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import { Badge } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <header >

      </header>
      <main>   <ScheduleTable />
        {/* <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          <SwiperSlide><Badge>B1</Badge></SwiperSlide>
          ...
        </Swiper> */}

      </main>
    </div>
  );
}

export default App;
