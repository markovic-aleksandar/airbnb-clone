import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';
import { Logo } from '../../constants';

const Header = () => {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleWindowResize = e => {
      const windowWidth = e.currentTarget.innerWidth;
      if (windowWidth < 768 && !mobileScreen) {
        setMobileScreen(true);
      } else if (windowWidth >= 768 && mobileScreen) {
        setMobileScreen(false);
      }
    }

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [mobileScreen]);

  if (mobileScreen) {
    return <HeaderMobile />
  }

  return (
    <header className="flex items-center h-[80px] border-b border-b-[rgba(0,0,0,0.08)]">
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