import { useDispatch } from 'react-redux';
import { TOGGLE_SIGNUP_MODAL, TOGGLE_SIGNIN_MODAL } from '../redux/slices/authSlice';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineUserCircle } from 'react-icons/hi';

const MobileBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-16 px-3 flex items-center justify-center gap-2 border-t border-t-[#ebebeb] z-10">
      <button 
        type="button"
        className="flex flex-col items-center w-16 text-[10px] font-normal cursor-pointer"
      >
        <BiSearch className="text-2xl text-[#b0b0b0]" />
        Explore
      </button>
      
      <button 
        type="button"
        className="flex flex-col items-center w-16 text-[10px] font-normal cursor-pointer"
        onClick={() => dispatch(TOGGLE_SIGNUP_MODAL(true))}
      >
        <HiOutlineUserCircle className="text-2xl text-[#b0b0b0]" />
        Sign Up
      </button>

      <button 
        type="button"
        className="flex flex-col items-center w-16 text-[10px] font-normal cursor-pointer"
        onClick={() => dispatch(TOGGLE_SIGNIN_MODAL(true))}
      >
        <HiOutlineUserCircle className="text-2xl text-[#b0b0b0]" />
        Sign In
      </button>
    </div>
  )
}

export default MobileBar;