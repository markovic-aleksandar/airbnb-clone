import { Link } from 'react-router-dom';
import useDeviceSize from '../../hooks/useDeviceSize';
import HeaderMobile from './HeaderMobile';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';
import { Logo } from '../../constants';

const Header = ({maxWidth}) => {
  const mobileDevice = useDeviceSize();

  if (mobileDevice) {
    return <HeaderMobile />
  }

  return (
    <header className="flex items-center h-[80px] px-5 md:px-10 xl:px-20 border-b border-b-[rgba(0,0,0,0.08)]">
      <div style={{maxWidth: maxWidth}} className="flex items-center justify-between w-full mx-auto">
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