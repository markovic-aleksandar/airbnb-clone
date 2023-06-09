import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';
import { Logo } from '../../constants/icons';


const Header = () => {
  return (
    <header className="hidden md:flex items-center h-[80px]">
      <div className="flex items-center justify-between w-full max-w-[1750px] px-5 md:px-10 xl:px-20 mx-auto">
        <Logo />
        <HeaderSearch />
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="text-xs tracking-wide font-medium px-[14px] py-[6px] h-[42px] rounded-full hover:bg-[#f7f7f7]"  
          >
            Airbnb your home
          </button>
          <HeaderUser />
        </div>
      </div>
    </header>
  )
}

export default Header;