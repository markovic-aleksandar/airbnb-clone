import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDeviceSize from '../../hooks/useDeviceSize';
import { getSingleListing } from '../../functions/listingsFunctions';
import { ListingModalProvider } from '../../contexts/listingModalContext';
import { Loader } from '../../components';
import SingleListingDesktop from './SingleListingDesktop';
import SingleListingMobile from './SingleListingMobile';

const SingleListing = () => {
  const [listing, setListing] = useState(null);
  const [waitingProcess, setWaitingProcess] = useState(true);
  const {id} = useParams();
  const mobileDevice = useDeviceSize();
  
  useEffect(() => {
    getSingleListing(id, setListing, setWaitingProcess);
  }, [id]);

  if (waitingProcess) {
    return <Loader />
  }

  return (
    <ListingModalProvider>
      {mobileDevice ? (
        <SingleListingMobile />
      ) : (
        <SingleListingDesktop listing={listing} />
      )}
    </ListingModalProvider>
  )
}

export default SingleListing;