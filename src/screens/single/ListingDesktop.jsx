import { useContext } from 'react';
import { SingleListingContext } from '.';
import { ListingHeader, ListingTitle, ListingImagesDesktop, ListingMain } from '../../components';

const ListingDesktop = () => {
  const {listing, handleOpenModal} = useContext(SingleListingContext);

  return (
    <>
      <header className="flex justify-between">
        <ListingTitle title={listing.title} location={listing.location} />
        <ListingHeader />
      </header>
      <ListingImagesDesktop images={listing.images} handleOpenModal={handleOpenModal} />
      <ListingMain />
    </>
  )
}

export default ListingDesktop;