import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkUserAuth } from './functions/authFunctions';
import { TOGGLE_SIGNIN_MODAL } from './redux/slices/authSlice';
import { Loader, Header, MobileBar, SignUp, SignIn } from './components';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {currentUserLoading, signUpModal, signInModal, currentUser} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {    
    checkUserAuth(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (location.search.includes('isSignIn') && !currentUser) {
      dispatch(TOGGLE_SIGNIN_MODAL(true));
    }
  }, [location.search, dispatch, currentUser]);

  if (currentUserLoading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <Outlet />
      <MobileBar />
      <ToastContainer position="bottom-center" theme="light" />
      {signUpModal && !currentUser && <SignUp />}
      {signInModal && !currentUser && <SignIn />}
    </>
  )
}

export default App;