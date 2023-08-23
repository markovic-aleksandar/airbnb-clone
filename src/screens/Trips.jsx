import { Link } from 'react-router-dom';

const Trips = () => {
  return (
    <main>
      <section className="w-full max-w-[1200px] px-5 md:px-10 xl:px-20 py-16 mx-auto">
        <h1 className="text-[32px] mb-4">Trips</h1>
        <div className="py-10 border-y border-y-[#dddddd]">
          <h3 className="text-lg">No trips booked...yet!</h3>
          <p className="text-base m-[4px_0_12px_0]">Time to dust off your bags and start planning your next adventure</p>
          <Link to="/" className="inline-block text-sm font-medium px-6 py-3 border border-[#222222] rounded-lg">
            Start searching
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Trips;