import { Link } from 'react-router-dom';

const Wishlists = () => {
  return (
    <main>
      <section className="w-full max-w-[1200px] px-5 md:px-10 xl:px-20 py-16 mx-auto">
        <h1 className="mb-4">Wishlists</h1>
        <div className="py-10 border-y border-y-[#dddddd]">
          <h3>Create your first wishlists</h3>
          <p className="text-base m-[4px_0_12px_0]">As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
          <Link to="/" className="inline-block text-sm font-medium px-6 py-3 border border-[#222222] rounded-lg">
            Start searching
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Wishlists;