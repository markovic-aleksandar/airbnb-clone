import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getSingleListing } from '../redux/features/listing/lisitngActions';
import { Loader } from '../components';

const SingleListing = () => {
  const {id} = useParams();
  // const {singleListingLoading, singleListing} = useSelector(store => store.listing);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   getSingleListing(id, dispatch);
  // }, [id, dispatch]);

  // if (singleListingLoading) {
  //   return <Loader />
  // }

  // console.log(singleListing);

  return (
    <h2>Single Lisitng</h2>
  )
}

export default SingleListing;