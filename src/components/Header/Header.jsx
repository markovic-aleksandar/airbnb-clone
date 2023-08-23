import { Link } from 'react-router-dom';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';
import { Logo } from '../../constants/icons';

const Header = () => {
  return (
    <header className="hidden md:flex items-center h-[80px] border-b border-b-[rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between w-full max-w-[1450px] px-5 md:px-10 xl:px-20 mx-auto">
        <Link to="/">
          <Logo />
        </Link>
        <HeaderSearch />
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="text-sm tracking-wide font-medium px-[14px] py-[6px] h-[42px] rounded-full hover:bg-[#f7f7f7]"  
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