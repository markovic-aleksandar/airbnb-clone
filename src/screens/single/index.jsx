import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import useDeviceSize from '../../hooks/useDeviceSize';
import { getSingleListing } from '../../functions/listingsFunctions';
import { Loader, Header } from '../../components';
import ListingMobile from './ListingMobile';
import ListingDesktop from './ListingDesktop';
import ListingImagesModal from './ListingImagesModal';
import ListingSliderModal from './ListingSliderModal';

export const SingleListingContext = createContext();

const SingleListing = () => {
  const [listing, setListing] = useState(null);
  const [listingImagesModal, setListingImagesModal] = useState(false);
  const [listingSliderModal, setListingSliderModal] = useState(false);
  const [waitingProcess, setWaitingProcess] = useState(true);
  const {id} = useParams();
  const mobileDevice = useDeviceSize();

  // handle to open modal
  const handleOpenModal = modalType => {
    modalType === 'images' ? setListingImagesModal(true) : setListingSliderModal(true);
  }

  // handle to close modal
  const handleCloseModal = (modal, modalType) => {
    modal.current.classList.add('fade-out');
    setTimeout(() => modalType === 'images' ? setListingImagesModal(false) : setListingSliderModal(false), 450);
  }
  
  useEffect(() => {
    getSingleListing(id, setListing, setWaitingProcess);
  }, [id]);

  if (waitingProcess) {
    return <Loader />
  }

  return (
    <SingleListingContext.Provider value={{
      listing,
      listingImagesModal,
      listingSliderModal,
      handleOpenModal,
      handleCloseModal
    }}>
      {!mobileDevice && <Header maxWidth={1120} />}
      <main className="pt-0 pb-6 px-5 md:pt-6 md:px-10 xl:px-20">
        <div className="relative w-full max-w-[1120px] mx-auto">
          {mobileDevice ? (
            <ListingMobile />
          ) : (
            <ListingDesktop />
          )}
        </div>
      </main>
      {listingImagesModal && <ListingImagesModal />}
      {listingSliderModal && <ListingSliderModal />}
    </SingleListingContext.Provider>
  )
}

export default SingleListing;