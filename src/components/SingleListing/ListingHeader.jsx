import { FiChevronLeft, FiShare, FiHeart } from 'react-icons/fi';


const ListingHeader = ({mobileDevice}) => {
  return (
    <div className="absolute top-3 left-0 w-full flex items-center md:items-end justify-between md:justify-end md:relative md:top-auto md:left-auto z-[1]">
      {mobileDevice && (
        <button type="button" className="flex items-center gap-x-2 p-2 bg-white shadow-smallCircle rounded-full transition-transform hover:scale-[1.04]">
          <FiChevronLeft fontSize={18}/>
        </button>
      )}
      <div className="relative flex items-center gap-x-3 md:gap-x-5 md:top-2">
        <button className="flex items-center gap-x-2 p-2 bg-white shadow-smallCircle md:shadow-none rounded-full md:rounded-lg md:hover:bg-[#f7f7f7] transition-transform scale-100 hover:scale-[1.04] md:hover:scale-100">
          <FiShare fontSize={18} />
          {!mobileDevice && <span className="font-medium underline">Share</span>}
        </button>
        <button className="flex items-center gap-x-2 p-2 bg-white shadow-smallCircle md:shadow-none rounded-full md:rounded-lg md:hover:bg-[#f7f7f7] transition-transform scale-100 hover:scale-[1.04] md:hover:scale-100">
          <FiHeart fontSize={18} />
          {!mobileDevice && <span className="font-medium underline">Save</span>}
        </button>
      </div>
    </div>
  )
}

export default ListingHeader;