import { useContext } from 'react';
import { SingleListingContext } from '.';
import { ListingHeader, ListingTitle, ListingSliderMobile, ListingMain } from '../../components';

const ListingMobile = () => {
  const {listing: {title, location, images}} = useContext(SingleListingContext);

  return (
    <>
      <ListingHeader mobileDevice={true} />
      <ListingSliderMobile images={images} />
      <ListingTitle title={title} location={location} />
      <ListingMain />
    </>
  )
}

export default ListingMobile;