import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleNonSerializablValue } from '../utils';

// get specific listings
export const getListings = async (category, setListings, setListingsLoading) => {
  try {
    setListingsLoading(true);
    // create query to select listings which categories contains current category
    const listingsCollectionRef = collection(db, 'listings');
    const listingsQ = query(listingsCollectionRef, where('categories', 'array-contains', category), orderBy('createdAt', 'desc'));
    let listings = await getDocs(listingsQ);

    listings = listings.docs.map(listing => handleNonSerializablValue({...listing.data(), id: listing.id}));
    
    setListings(listings);
  }
  catch(err) {
    console.log(err);
  }
  finally {
    setListingsLoading(false);
  }
}

// get single listing
export const getSingleListing = async (id, setListing, setWaitingProcess) => {
  try {
    setWaitingProcess(true);
    // create listing ref
    const listingRef = doc(db, 'listings', id);
    // get listing from firestore
    const listingSnap = await getDoc(listingRef);
    if (listingSnap.exists()) {
      const currentListing = handleNonSerializablValue({...listingSnap.data(), id: listingSnap.id});
      setListing(currentListing);
    }
  }
  catch(err) {
    // create toast message
    console.log(err);
  }
  finally {
    setWaitingProcess(false);
  }
}