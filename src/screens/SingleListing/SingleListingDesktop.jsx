import { useContext } from 'react';
import { 
  Header, 
  ListingTitle, 
  ListingImagesDesktop, 
  ListingImagesModal,
  ListingSliderModal
} from '../../components';
import { ListingModalContext } from '../../contexts/listingModalContext';
import { FiShare, FiHeart } from 'react-icons/fi';

const SingleListingDesktop = ({listing}) => {
  const {title, location, images} = listing;
  const {listingImagesModal, listingSliderModal, handleOpenModal, handleCloseModal} = useContext(ListingModalContext);

  return (
    <>
      <Header maxWidth={1120} />
      <main className="py-6 px-5 md:px-10 xl:px-20">
        <div className="w-full max-w-[1120px] mx-auto">
          <section className="flex items-end justify-between">
            <ListingTitle title={title} location={location} />
            <div className="relative flex items-center gap-x-5 top-2">
              <button className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-[#f7f7f7]">
                <FiShare />
                <span className="font-medium underline">Share</span>
              </button>
              <button className="flex items-center gap-x-2 p-2 rounded-lg hover:bg-[#f7f7f7]">
                <FiHeart />
                <span className="font-medium underline">Save</span>
              </button>
            </div>
          </section>
          <ListingImagesDesktop images={images} handleOpenModal={handleOpenModal} />
        </div>
      </main>
      {listingImagesModal && <ListingImagesModal images={images} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} />}
      {listingSliderModal && <ListingSliderModal images={images} handleCloseModal={handleCloseModal} />}
    </>
  )
}

export default SingleListingDesktop;