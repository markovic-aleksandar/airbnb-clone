import { useRef } from 'react';
import Masonry from 'react-responsive-masonry';
import { FiChevronLeft, FiShare, FiHeart } from 'react-icons/fi';
import ButtonImage from '../ButtonImage';

const ListingImagesModal = ({images, handleOpenModal, handleCloseModal}) => {
  const modal = useRef(null);

  return (
    <div ref={modal} className="fixed top-0 left-0 w-full h-full bg-white flex flex-col fade-in">
      <header className="flex items-center justify-between flex-[0_0_60px] px-6">
        <button 
          className="w-8 h-8 flex items-center justify-center hover:bg-[#f7f7f7] rounded-full"
          onClick={() => handleCloseModal(modal, 'images')}  
        >
          <FiChevronLeft size={22} />
        </button>
        <div className="relative flex items-center gap-x-3">
          <button className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-[#f7f7f7]">
            <FiShare />
            <span className="font-medium underline">Share</span>
          </button>
          <button className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-[#f7f7f7]">
            <FiHeart />
            <span className="font-medium underline">Save</span>
          </button>
        </div>
      </header>

      <div className="pt-6 pb-14 overflow-y-auto">
        <Masonry columnsCount={2} gutter="10px" className="w-full md:max-w-[80%] lg:max-w-[60%] xl:max-w-[720px] mx-auto flex flex-wrap gap-3">
          {images.map((image, index) => {
            return <ButtonImage key={index} imgURL={image} handleAction={() => handleOpenModal('slider')} />
          })}
        </Masonry>
      </div>
    </div>
  )
}

export default ListingImagesModal;