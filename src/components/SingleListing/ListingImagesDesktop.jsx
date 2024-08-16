import ButtonImage from '../ButtonImage';
import { DotsSquareIcons } from '../../constants';

const ListingImagesDesktop = ({images, handleOpenModal}) => {
  return (
    <section style={{height: 'calc(60vh - 64px)'}} className="relative grid grid-cols-2 auto-rows-fr gap-x-2 mt-6 rounded-xl overflow-hidden ">
      <ButtonImage imgURL={images[0]} handleAction={() => handleOpenModal('images')} />
      <article className="grid grid-cols-2 auto-rows-fr gap-2">
        {images.slice(1, 5).map((image, index) => (
          <ButtonImage key={index} imgURL={image} handleAction={() => handleOpenModal('images')} />
        ))}
      </article>
      <button 
        className="absolute bottom-5 right-5 flex items-center gap-x-2 font-medium bg-white py-[7px] px-[15px] border border-[#222] rounded-lg"
        onClick={() => handleOpenModal('images')}
      >
        <DotsSquareIcons   />
        Show all photos
      </button>
    </section>
  )
}

export default ListingImagesDesktop;