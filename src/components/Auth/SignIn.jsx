import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TOGGLE_SIGNIN_MODAL } from '../../redux/slices/authSlice';
import { signInUser } from '../../functions/authFunctions';
import useValidate from '../../hooks/useValidate';
import Modal from '../Modal';
import MiniLoader from '../MiniLoader';
import { COLORS, InputErrorIcon } from '../../constants';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const {data: inputData, handleDataValue, validateData} = useValidate({
    email: {value: '', error: false},
    password: {value: '', error: false}
  });
  const [waitingProccess, setWaitingProccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(TOGGLE_SIGNIN_MODAL(false));
    if (window.location.search === '?isSignIn') navigate('/');
  }

  const handleSignInUser = () => {
    validateData(() => {
      signInUser(inputData, dispatch, navigate, setWaitingProccess);
    });
  }
  
  return (
    <Modal title="Sign In" closeModal={closeModal}>
      <form className="pt-6" noValidate>
        <h2 className="mb-5">Welcome to Airbnb</h2>
        <div className="form-group">
          <div className="form-control">
            <input 
              type="text"
              name="email" 
              value={inputData.email.value}  
              required
              onChange={handleDataValue}
            />
            <span className="input-placeholder">Email</span>
          </div>
          {inputData.email.error && (
            <p className="input-error">
              <InputErrorIcon />
              {inputData.email.error}
            </p>
          )}
        </div>
        <div className="form-group">
          <div className="form-control">
            <input 
              type="password" 
              name="password"
              value={inputData.password.value}
              required 
              onChange={handleDataValue}  
            />
            <span className="input-placeholder">Password</span>
          </div>
          {inputData.password.error && (
            <p className="input-error">
              <InputErrorIcon />
              {inputData.password.error}
            </p>
          )}
        </div>

        {!waitingProccess ? (
          <button 
            type="button"
            className="w-full h-12 text-center bg-buttonGradient text-white font-medium rounded-lg"
            onClick={handleSignInUser}
          >
            Continue</button>
        ) : (
          <button 
            type="button"
            className="relative w-full h-12 text-center bg-buttonGradient text-white font-medium rounded-lg pointer-events-none"
          >
            <MiniLoader color="#fff" />
          </button>
          )}
      </form>
          
      <div className="flex items-center gap-5 my-5">
        <span className="flex-1 border-t border-[#ddd]"></span>
        <span className="text-xs">or</span>
        <span className="flex-1 border-t border-[#ddd]"></span>
      </div>

      <div>
        <button 
          type="button"
          style={{borderColor: COLORS.darkClr}}
          className="relative w-full py-3 font-medium border rounded-lg"  
        >
          <FcGoogle className="absolute top-[50%] left-4 translate-y-[-50%] text-[22px]" />
          Continue with Google
        </button>
      </div>
    </Modal>
  )
}

export default SignIn;