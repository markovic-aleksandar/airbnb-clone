import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ProtectedRoute } from './components';
import { 
  HomeScreen, 
  SingleListingScreen,
  Account,
  Trips,
  Wishlists
} from './screens';

// import style
import './index.css';

// import toast css
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreen />} />
      <Route path="listing/:id" element={<SingleListingScreen />} />
      <Route path="account" element={<ProtectedRoute />}>
        <Route path="" index={true} element={<Account />} />
        <Route path="trips" element={<Trips />} />
        <Route path="wishlists" element={<Wishlists />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
