import { useState, useEffect, useRef, useCallback } from 'react';

const ListingSliderMobile = ({images}) => {
  const [slideCount, setSlideCount] = useState(0);
  const slider = useRef(null);
  const startX = useRef(0);
  const movedX = useRef(0);
  const currentSlide = useRef(0);

  // handle start slide
  const handleStartSlide = useCallback(e => {
    startX.current = e.touches[0].clientX;
    movedX.current = 0;
  }, []);

  // handle move slide
  const handleMoveSlide = useCallback(e => {
    const sliderWidth = slider.current.getBoundingClientRect().width;
    const moveX = e.touches[0].clientX;
    movedX.current = startX.current - moveX;
    slider.current.classList.remove('transition-transform');

    // check for next
    if (movedX.current > 0 && (images.length - 1) > currentSlide.current) {
      slider.current.style.transform = `translateX(${(-sliderWidth * currentSlide.current) - movedX.current}px)`;
    }
    
    // check for prev
    if (movedX.current < 0 && currentSlide.current > 0) {
      slider.current.style.transform = `translateX(${(-sliderWidth * currentSlide.current) - movedX.current}px)`;
    }
  }, [images]);

  // handle end slide
  const handleEndSlide = useCallback(() => {
    const sliderWidth = slider.current.getBoundingClientRect().width;
    slider.current.classList.add('transition-transform');
    if (Math.abs(movedX.current) > (sliderWidth / 2) && movedX.current > 0 && (images.length - 1) > currentSlide.current) {
      currentSlide.current += 1;
      setSlideCount(currentSlide.current * sliderWidth);
    } else if (Math.abs(movedX.current) > (sliderWidth / 2) && movedX.current < 0 && currentSlide.current > 0) {
      currentSlide.current -= 1;
      setSlideCount(currentSlide.current * sliderWidth);
    } else {
      slider.current.style.transform = `translateX(${-sliderWidth * currentSlide.current}px)`;
    }
  }, [images])

  const handleSlideWidth = useCallback(() => {
    const sliderWidth = slider.current.getBoundingClientRect().width;
    setSlideCount(currentSlide.current * sliderWidth);
  }, []);

  useEffect(() => {
    const sliderEl = slider.current;

    sliderEl.addEventListener('touchstart', handleStartSlide);
    sliderEl.addEventListener('touchmove', handleMoveSlide);
    sliderEl.addEventListener('touchend', handleEndSlide);

    window.addEventListener('resize', handleSlideWidth);

    return () => {
      sliderEl.removeEventListener('touchstart', handleStartSlide);
      sliderEl.removeEventListener('touchmove', handleMoveSlide);
      sliderEl.removeEventListener('touchend', handleEndSlide);

      window.removeEventListener('resize', handleSlideWidth);
    }
  }, [handleStartSlide, handleMoveSlide, handleEndSlide, handleSlideWidth]);

  return (
    <div className="relative -mx-5 overflow-x-hidden">
      <div style={{transform: `translateX(-${slideCount}px)`}} className="flex h-[65vw] transition-transform" ref={slider}>
        {images.map((image, index) => {
          return (
            <button key={index} type="button" className="relative h-full flex-[0_0_100%]">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          )
        })}
      </div>
      <div className="absolute bottom-3 right-3 text-[11px] text-white font-medium p-[3px_10px_2px_10px] bg-[rgba(34,34,34,0.66)] rounded">
        {currentSlide.current + 1} / {images.length}
      </div>
    </div>
  )
}

export default ListingSliderMobile;

// ovo bi jedino moglo da se uradi da se kreira komponenta slider, pa prilikom pozivanja iste da imamo neki settings object koji ce da regulise sve to odnosno na osnovu tih property-a da on tamo postavi i funkcionalnost kao i jsx elemente