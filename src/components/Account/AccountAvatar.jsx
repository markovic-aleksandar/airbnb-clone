import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useValidate from '../../hooks/useValidate';
import { updateAccount, updateAccountAvatar } from '../../redux/features/auth/authActions';
import MiniLoader from '../MiniLoader';
import { UserAvatar, InputErrorIcon } from '../../constants/icons';
import { BsFillCameraFill } from 'react-icons/bs';
import { IoIosRemoveCircle } from 'react-icons/io';


const AccountAvatar = () => {
  const {currentUser} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const {data: avatarData, handleDataValue, validateData} = useValidate({
    avatar: {value: null, error: false}
  });
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [waitingProccess, setWaitingProccess] = useState(false);

  const handleChangeAvatar = e => {
    setIsInitialRender(false);
    handleDataValue(e);
  }

  const handleRemoveAvatar = () => {
    setWaitingProccess(true);
    updateAccount({avatar: null}, currentUser, dispatch, setWaitingProccess);
  }

  useEffect(() => {
    if (!isInitialRender) {
      validateData(() => {
        setWaitingProccess(true);
        updateAccountAvatar(avatarData, currentUser, dispatch, setWaitingProccess);
      });
      setIsInitialRender(true);
    }
  }, [validateData, avatarData, isInitialRender, currentUser, dispatch]);

  return (
    <>
      <div className="relative mb-9">
        {currentUser.avatar ? (
          <img src={currentUser.avatar} alt="user avatar" className="w-24 h-24 mx-auto rounded-full object-cover" />
        ) : (
          <span className="block w-24 h-24 mx-auto">
            <UserAvatar w={96} h={96} />
          </span>
        )}
        { !currentUser.avatar ? (
          <div className="absolute bottom-[-20px] left-[50%] translate-x-[-50%] w-[65px] h-9 px-[10px] leading-9 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] rounded-2xl">
            {waitingProccess ? (
              <MiniLoader />
            ) : (
              <span className="flex items-center font-medium pointer-events-none">
                <BsFillCameraFill className="mr-[5px]" />
                Add
              </span>
            )}
            <input 
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              name="avatar"
              onChange={handleChangeAvatar}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer file:hidden"
            />
          </div>
        ) : (
          <div className="absolute bottom-[-20px] left-[50%] translate-x-[-50%] w-[95px] h-9 px-[10px] leading-9 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] rounded-2xl">
            {waitingProccess ? (
              <div className="loader-holder">
                <span className="loader"></span>
              </div>
            ) : (
              <span 
                className="flex items-center font-medium cursor-pointer"
                onClick={handleRemoveAvatar}  
              >
                <IoIosRemoveCircle className="mr-[5px]" />
                Remove
              </span>
            )}
          </div>
        ) }
      </div>
      {avatarData.avatar.error && <p className="input-error justify-center mb-2">
        <InputErrorIcon />
        {avatarData.avatar.error}
      </p>}
      <h3 className="text-xl text-center">{currentUser.name}</h3>
    </>
  )
}

export default AccountAvatar;