import { COLORS, FilterIcon } from '../../constants';
import { BiSearch } from 'react-icons/bi';

const HeaderMobile = () => {
  return (
    <header className="pt-4 px-5">
      <div className="flex items-center justify-between pl-4 p-[10px] shadow-[0_3px_10px_rgba(0,0,0,0.1)] rounded-full border-[0.5px] border-[rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-x-4">
          <BiSearch size={20} color={COLORS.darkClr} />
          <div>
            <h5 className="text-sm">Anywhere</h5>
            <p style={{color: COLORS.bodyClr}} className="flex items-center gap-x-1 text-xs font-normal">
              Any week
              <span>•</span>
              Add guests
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center w-[36px] h-[36px] border border-[#ddd] rounded-full">
          <FilterIcon />
        </button>
      </div>
    </header>
  )
}

export default HeaderMobile;