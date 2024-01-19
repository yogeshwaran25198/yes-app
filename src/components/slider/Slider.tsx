import React from 'react';
import './Slider.scss';
// import { slider_img_1 } from '../../utilities/Images';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {sliderImages} from '../../utilities/Images';

function SliderC() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  return (
    
    <div className='hero-slider'>
     <div className='hero-slider-item'>
     <Slider className='slider' {...settings}>
        {/* <img src={sliderImages[0]} alt="" /> */}
        {/* <img src={sliderImages[1]} alt="" /> */}
        {/* <img src={sliderImages[2]} alt="" /> */}

        {
          sliderImages.map((a:string,b)=>{
            return(
              <img key={b} src={a} alt="" />
            )
           
          })
        }
     </Slider>
      </div>
    </div>
  )
}

export default SliderC


