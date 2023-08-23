import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../functions/authFunctions';
import { TOGGLE_SIGNUP_MODAL, TOGGLE_SIGNIN_MODAL } from '../../redux/slices/authSlice';
import { UserAvatar } from '../../constants';
import { HiBars3 } from 'react-icons/hi2';

const HeaderUser = () => {
  const {currentUser} = useSelector(store => store.auth);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleDropdownMenu = () => {
    setDropdownMenu(!dropdownMenu);
  }

  useEffect(() => {

    // hide dropdown menu
    const hideDropdown = e => {
      const element = e.target;
      if (element.id !== 'dropdown-menu' && !element.closest('[data-target="dropdown-menu"]')) {
        setDropdownMenu(false);
      }
    }

    window.addEventListener('click', hideDropdown);

    // return window.removeEventListener('click', hideDropdown);
      
  }, [dropdownMenu]);

  return (
    <div className="relative">
      <button
        type="button"
        data-target="dropdown-menu"
        className="flex items-center gap-[11px] h-[42px] p-[0_5px_0_10px] border-[1px] border-[#ddd] rounded-full"
        onClick={handleToggleDropdownMenu}
      >
        <HiBars3 className="w-[17px] h-[17px]" />
        {!currentUser || !currentUser.avatar ? (
          <UserAvatar w={30} h={30} /> 
        ) : (
          <img src={currentUser.avatar} alt="user avatar" className="w-[30px] h-[30px] object-cover rounded-full" />
        )}
      </button>

      <ul className={`${dropdownMenu ? 'block' : 'hidden'} absolute top-14 right-0 bg-white w-60 rounded-xl py-3 shadow-[0_2px_16px_rgba(0,0,0,0.12)]`}>
        {!currentUser ? (
          <>
            <li 
              className="w-full px-4 py-[10px] cursor-pointer hover:bg-[#f7f7f7]"
              onClick={() => dispatch(TOGGLE_SIGNUP_MODAL(true))}  
            >Sign Up</li>
            <li 
              className="w-full px-4 py-[10px] cursor-pointer hover:bg-[#f7f7f7]"
              onClick={() => dispatch(TOGGLE_SIGNIN_MODAL(true))}  
            >Sign In</li>
          </>
        ) : (
          <>
            <li>
              <Link 
                to="/account/trips"
                className="w-full block font-medium px-4 py-[10px] cursor-pointer hover:bg-[#f7f7f7]"  
              >Trips</Link>
            </li>
            <li className="pb-1 border-b border-b-[#ebebeb]">
              <Link 
                to="/account/wishlists"
                className="w-full block font-medium px-4 py-[10px] cursor-pointer hover:bg-[#f7f7f7]"  
              >Wishlists</Link>
            </li>
            <li className="pt-1">
              <Link 
                to="/airbnb-your-home"
                className="w-full block px-4 py-[10px] cursor-pointer hover:bg-[#f7f7f7]"  
              >Airbnb your home</Link>
            </li>
            <li className="pb-1 border-b border-b-[#ebebeb]">
              <Link 
                to="/account"
                className="w-full block px-4 py-[10px] cursor-pointer hover:bg-[#f7f7f7]"  
              >Account</Link>
            </li>
            <li
              className="w-full px-4 py-[10px] mt-1 cursor-pointer hover:bg-[#f7f7f7]"
              onClick={() => signOutUser(dispatch, navigate)}
            >Log out</li>
          </>
        )}
      </ul>
    </div>
  )
}

export default HeaderUser;