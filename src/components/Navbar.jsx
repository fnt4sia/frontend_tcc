import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import arrowButton from '../../assets/arrowbutton.png';
import isAuthenticated from '../service/Auth';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about-us' },
    { name: 'Event', path: '/event' },
    { name: 'Blog', path: '/blog' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 md:px-12 xl:px-32 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 md:h-10" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 xl:gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-base md:text-lg font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#84281B]'
                    : 'text-gray-600 hover:text-[#84281B]'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Register Button (Desktop) */}
        {!isAuthenticated() && (
          <div className="hidden md:flex">
            <Link
              to="/register"
              className="flex items-center gap-2 xl:gap-4 bg-[#84281B] text-white px-4 xl:px-5 py-2 xl:py-3 rounded-full font-medium shadow hover:bg-[#a03a2a] transition-colors duration-200"
            >
              <p className="text-sm xl:text-base">Register Now</p>
              <img src={arrowButton} alt="Arrow Icon" className="h-4 xl:h-5" />
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-[#84281B]'
                      : 'text-gray-600 hover:text-[#84281B]'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {!isAuthenticated() && (
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center gap-2 bg-[#84281B] text-white px-4 py-2 rounded-full font-medium shadow hover:bg-[#a03a2a] transition-colors duration-200"
            >
              <p className="text-sm">Register Now</p>
              <img src={arrowButton} alt="Arrow Icon" className="h-4" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
