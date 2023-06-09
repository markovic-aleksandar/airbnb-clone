import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { checkUserAuth, openSignInModal } from './redux/features/auth/authActions';
import { Header, MobileBar, SignUp, SignIn } from './components';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {currentUserLoading, signUpModal, signInModal} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserAuth(dispatch, navigate);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (location.search.includes('isSignIn')) {
      openSignInModal(dispatch)
    }
  }, [location.search, dispatch]);

  if (currentUserLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <Header />
      <Outlet />
      <MobileBar />
      <ToastContainer position="bottom-center" theme="light" />
      {signUpModal && <SignUp />}
      {signInModal && <SignIn />}
    </>
  )
}

export default App;