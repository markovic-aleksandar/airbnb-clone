import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const {currentUser} = useSelector(store => store.auth);

  if (!currentUser) {
    return <Navigate to="/?isSignIn" replace />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute;