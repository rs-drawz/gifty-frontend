import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import ProductDetail from './components/Product/ProductDetail';
import ProductSearch from './components/Product/ProductSearch';
import Login from '../src/components/User/Login';
import Register from './components/User/Register';
import store from './store'
import { useEffect, useState } from 'react';
import { loaduser } from './actions/userActions';
import Profile from './components/User/Profile';
import ProtectRoute from './components/route/ProductsRoute';
import UpdateProfile from './components/User/UpdateProfile';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [stripe,setStripe]=useState("");
  useEffect(() => {
    store.dispatch(loaduser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripe(data.stripeApiKey);
    }
    getStripeApiKey()
  },[])
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className='container container-fluid'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login/rs" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myprofile" element={<ProtectRoute><Profile /> </ProtectRoute>} />
              <Route path="/myprofile/update" element={<ProtectRoute><UpdateProfile /></ProtectRoute>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<ProtectRoute><Shipping /></ProtectRoute>} />
              <Route path="/order/confirm" element={<ProtectRoute><ConfirmOrder /></ProtectRoute>} />
              {stripe &&
              <Route path="/payment" element={<ProtectRoute><Elements stripe={loadStripe(stripe)}><Payment /></Elements></ProtectRoute>} />}



            </Routes>
          </div>
          <ToastContainer theme='dark' />

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;