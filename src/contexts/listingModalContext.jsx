import { useState, createContext } from 'react';

const ListingModalContext = createContext();

const ListingModalProvider = ({children}) => {
  const [listingImagesModal, setListingImagesModal] = useState(false);
  const [listingSliderModal, setListingSliderModal] = useState(false);

  // handle to open modal
  const handleOpenModal = modalType => {
    modalType === 'images' ? setListingImagesModal(true) : setListingSliderModal(true);
  }

  // handle to close modal
  const handleCloseModal = (modal, modalType) => {
    modal.current.classList.add('fade-out');
    setTimeout(() => modalType === 'images' ? setListingImagesModal(false) : setListingSliderModal(false), 450);
  }

  return (
    <ListingModalContext.Provider value={{
      listingImagesModal,
      listingSliderModal,
      handleOpenModal,
      handleCloseModal
    }}>
      {children}
    </ListingModalContext.Provider>
  )
}

export { ListingModalContext, ListingModalProvider };