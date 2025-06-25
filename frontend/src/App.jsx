import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar     from './components/Navbar/Navbar';
import Footer     from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

import Home       from './pages/Home/Home';
import Cart       from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify     from './pages/Verify/Verify';
import MyOrders   from './pages/MyOrders/MyOrders';

import AdminHome  from './admin/admin-home';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // catch /admin-home and any sub-route like /admin-home/add, /admin-home/list, etc.
  const isAdminRoute = location.pathname.startsWith('/admin-home');

  

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        {/* only show site navbar when NOT in admin */}
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}

        <Routes>
          <Route path='/'               element={<Home />} />
          <Route path='/cart'           element={<Cart />} />
          <Route path='/order'          element={<PlaceOrder />} />
          <Route path='/verify'         element={<Verify />} />
          <Route path='/myorders'       element={<MyOrders />} />

          {/* admin-home and all its child routes */}
          <Route path='/admin-home/*'   element={<AdminHome />} />
        </Routes>
      </div>

      {/* only show site footer when NOT in admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
