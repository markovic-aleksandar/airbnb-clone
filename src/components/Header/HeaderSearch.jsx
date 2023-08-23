import { BiSearch } from 'react-icons/bi';

const HeaderSearch = () => {
  return (
    <div className="flex h-12 items-center pr-2 shadow-specbox border-[1px] border-[#ddd] rounded-full">
      <button 
        type="button"
        className="text-sm font-medium pl-5 pr-3 border-r-[1px] border-[#ddd]"  
      >Anywhere</button>
      <button 
        type="button"
        className="text-sm font-medium px-3 border-r-[1px] border-[#ddd]"  
      >Any week</button>
      <button 
        type="button"
        className="text-sm px-3 text-[#717171]"
      >Add guests</button>
      <button 
        type="button"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ff385c]"  
      >
        <BiSearch className="text-white" />
      </button>
    </div>
  )
}

export default HeaderSearch;