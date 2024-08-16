import { useState, useEffect } from 'react';
import { getListings } from '../functions/listingsFunctions';
import { Loader, Header, Listings } from '../components';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  useEffect(() => {
    getListings('beach', setListings, setListingsLoading);
  }, []);

  if (listingsLoading) {
    return <Loader />
  }

  // if list is empty

  return (
    <>
      <Header maxWidth={1450} />
      <main className="py-6 px-5 md:px-10 xl:px-20">
        <Listings listings={listings} />
      </main>
    </>
  )
}

export default Home;