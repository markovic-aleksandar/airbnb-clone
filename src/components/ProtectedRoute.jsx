import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_SIGNIN_MODAL } from '../redux/slices/authSlice';

const ProtectedRoute = () => {
  const {currentUser} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) dispatch(TOGGLE_SIGNIN_MODAL(true));
  }, [currentUser, dispatch]);

  if (!currentUser) {
    return <Navigate to="/" replace />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute;