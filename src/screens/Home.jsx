import { useState, useEffect } from 'react';
import { getListings } from '../functions/listingsFunctions';
import { Loader, Listings } from '../components';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  useEffect(() => {
    getListings('design', setListings, setListingsLoading);
  }, []);

  if (listingsLoading) {
    return <Loader />
  }

  // if list is empty

  return (
    <main>
      <Listings listings={listings} />
    </main>
  )
}

export default Home;