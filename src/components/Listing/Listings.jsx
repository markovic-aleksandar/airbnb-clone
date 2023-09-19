import Listing from './Listing';

const Listings = ({listings}) => {
  return (
    <section className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-[1450px] mx-auto">
      {listings.map(listing => {
        return <Listing key={listing.id} {...listing} />
      })}
    </section>
  )
}

export default Listings;