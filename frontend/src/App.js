
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummeryApi from './common';
import { setUserDetails } from './store/userSlice';
import { AppContextProvider } from './context'; 
import './App.css';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummeryApi.current_user.url, {
        method: SummeryApi.current_user.method,
        credentials: 'include'
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        dispatch(setUserDetails(null)); // Reset user state if failed
      }
    } catch (error) {
      dispatch(setUserDetails(null)); // Reset user state on error
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummeryApi.addToCartProductCount.url, {
        method: SummeryApi.addToCartProductCount.method,
        credentials: 'include'
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        setCartProductCount(dataApi.data.count);
      } else {
        setCartProductCount(0);
      }
    } catch (error) {
      setCartProductCount(0);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <AppContextProvider value={{ fetchUserDetails, 
    cartProductCount,
     fetchUserAddToCart }}>
      <ToastContainer 
      position='top-center'
      />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
    </AppContextProvider>
  );
}

export default App;
