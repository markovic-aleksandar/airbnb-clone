import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleListing } from '../functions/listingsFunctions';
// import { getSingleListing } from '../redux/features/listing/lisitngActions';
import { Loader } from '../components';

const SingleListing = () => {
  const [listing, setListing] = useState(null);
  const [waitingProcess, setWaitingProcess] = useState(true);
  const {id} = useParams();
  
  useEffect(() => {
    getSingleListing(id, setListing, setWaitingProcess);
  }, [id]);

  if (waitingProcess) {
    return <Loader />
  }

  console.log(listing);

  return (
    <h2>Single Lisitng</h2>
  )
}

export default SingleListing;