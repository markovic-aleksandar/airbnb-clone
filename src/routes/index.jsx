import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from '../App';
import { 
  HomeScreen, 
  SingleListingScreen,
  Account,
  Trips,
  Wishlists
} from '../screens';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreen />} />
      <Route path="listing/:id" element={<SingleListingScreen />} />
      <Route path="account" element={<ProtectedRoute />}>
        <Route path="" element={<Account />} />
        <Route path="trips" element={<Trips />} />
        <Route path="wishlists" element={<Wishlists />} />
      </Route>
    </Route>
  )
);

export default router;