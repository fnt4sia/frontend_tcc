import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import AboutUs from './pages/AboutUs';
import Event from './pages/Event';
import DetailEvent from './pages/DetailEvent';
import DetailBlog from './pages/DetailBlog';

import './index.css';

const Layout = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register'];
  const shouldHideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/event" element={<Event />} />
          <Route path="/detail-event/:id" element={<DetailEvent />} />
          <Route path="/detail-blog/:id" element={<DetailBlog />} />
        </Routes>
      </main>
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
