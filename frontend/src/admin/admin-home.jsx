import Sidebar from './Sidebar/Sidebar';
import React   from 'react';
import { Routes, Route } from 'react-router-dom';
import './admin-home.css';


// import AddminNavbar from './admin_navbar/AdminNavbar';
import Add    from './Add/Add';
import List   from './List/List';
import Orders from './Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHome = () => {
  const url = 'http://localhost:4000';

  return (
    <div className="admin-home">
      <ToastContainer />
      {/* <AddminNavbar /> */}
      <Sidebar />
      <div className="routes-container">
        <Routes>
          <Route path="add"    element={<Add    url={url} />} />
          <Route path="list"   element={<List   url={url} />} />
          <Route path="orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHome;
