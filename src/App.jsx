import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkUserAuth } from './functions/authFunctions';
import { Loader, MobileBar, SignUp, SignIn } from './components';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {currentUserLoading, signUpModal, signInModal, currentUser} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {    
    checkUserAuth(dispatch);
  }, [dispatch]);

  if (currentUserLoading) {
    return <Loader />
  }
  
  return (
    <>
      <Outlet />
      <MobileBar />
      {signUpModal && !currentUser && <SignUp />}
      {signInModal && !currentUser && <SignIn />}
      <ToastContainer position="bottom-center" theme="light" />
    </>
  )
}

export default App;