import { useEffect, useState, useRef } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { FiShare, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ListingSliderModal = ({images, handleCloseModal}) => {
  const [slideCount, setSlideCount] = useState(0);
  const [isAnimate, setIsAnimate] = useState(false);
  const slideModal = useRef(null);
  const slideContent = useRef(null);

  // handle change slide with animation
  const handleChangeSlide = type => {
    if (isAnimate) return;
    setIsAnimate(true);
    slideContent.current.classList.add('opacity-image-in');
    let slideTimeout;
    slideTimeout = setTimeout(() => {
      setSlideCount(prevValue => {
        if (type === 'prev' && prevValue > 0) {
          return prevValue - 1;
        } else if (type === 'next' && prevValue < images.length -1) {
          return prevValue + 1;
        } else {
          return prevValue;
        }
      });
      setIsAnimate(false);
      clearTimeout(slideTimeout);
    }, 300);
  }

  useEffect(() => {
    if (slideModal.current) slideContent.current.classList.remove('opacity-image-in');
  }, [slideCount]);

  return (
    <div ref={slideModal} className="fixed top-0 left-0 w-full h-full bg-white fade-in">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 fade-in-content">
        <header className="flex items-center justify-between p-6 md:p-10">
          <button 
            type="button" 
            className="flex items-center gap-x-1 text-white font-normal p-[8px_16px] hover:bg-[rgb(74,74,74)] rounded-lg"
            onClick={() => handleCloseModal(slideModal, 'slider')}  
          >
            <MdOutlineClose size={18} color="white" />
            Close
          </button>
          <div className="text-white font-normal">{slideCount + 1} / {images.length}</div>
          <div className="relative flex items-center gap-x-2">
            <button className="flex items-center gap-x-2 p-2 rounded-full hover:bg-[rgb(74,74,74)]">
              <FiShare color="white" />
            </button>
            <button className="flex items-center gap-x-2 p-2 rounded-full hover:bg-[rgb(74,74,74)]">
              <FiHeart color="white" />
            </button>
          </div>
        </header>

        <div className="relative">
          <div ref={slideContent} className={`pb-6 md:pb-10 w-full md:w-[calc(100%-190px)] mx-auto h-[calc(100vh-64px)] md:h-[calc(100vh-154px)]`}>
            <img src={images[slideCount]} alt="" className="w-auto h-full max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-154px)] mx-auto" />
          </div>

          <div className="absolute top-[50%] translate-y-[calc(-50%-24px)] md:translate-y-[calc(-50%-40px)] w-full">
            {slideCount > 0 && <button 
              type="button" 
              className="absolute left-[30px] w-12 h-12 border border-white flex items-center justify-center text-white rounded-full hover:bg-[rgb(74,74,74)]"
              onClick={() => handleChangeSlide('prev')}  
            >
              <FiChevronLeft size={20} />
            </button>}

            {slideCount < images.length - 1 && <button 
              type="button" 
              className="absolute right-[30px] w-12 h-12 border border-white flex items-center justify-center text-white rounded-full hover:bg-[rgb(74,74,74)]"
              onClick={() => handleChangeSlide('next')}  
            >
              <FiChevronRight />
            </button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingSliderModal;