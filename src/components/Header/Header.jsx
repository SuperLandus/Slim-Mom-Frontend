import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import UserInfo from '../UserInfo/UserInfo';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full border-b border-gray-200 px-4 py-12 md:px-6 relative z-50 bg-transparent">
      {/* ÜST SATIR */}
      <div className="flex justify-between items-center">
        {/* Sol: Logo + Menü */}
        <div className="flex items-center">
          <Logo />

          {/* Dikey çizgi */}
          <div className="hidden lg:block h-10 border-2 border-gray-300 mx-6"></div>

          {/* Desktop için menü linkleri */}

          <nav className="hidden lg:flex space-x-6 items-center">
            {isLoggedIn ? (
              <NavLink
                to="/diary"
                className={({ isActive }) =>
                  isActive
                    ? 'uppercase text-black font-bold'
                    : 'uppercase text-gray-400 font-bold hover:text-black transition'
                }
              >
                Diary
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'uppercase text-black font-bold'
                    : 'uppercase text-gray-400 font-bold hover:text-black transition'
                }
              >
                Login
              </NavLink>
            )}
            {isLoggedIn ? (
              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  isActive
                    ? 'uppercase text-black font-bold'
                    : 'uppercase text-gray-400 font-bold hover:text-black transition'
                }
              >
                Calculator
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? 'uppercase text-black font-bold'
                    : 'uppercase text-gray-400 font-bold hover:text-black transition'
                }
              >
                Register
              </NavLink>
            )}
          </nav>
        </div>

        {/* Sağ: User info ve hamburger */}
        <div className="flex items-center space-x-4">
          {/* Tablet ve üstü için UserInfo */}
          <div className="hidden md:flex">
            <UserInfo />
          </div>

          {/* Sadece mobil ve tablet için hamburger */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? (
                <HiX className="w-6 h-6 text-gray-700" />
              ) : (
                <HiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile için alt satırda user info */}
      <div className="md:hidden mt-2 px-4">
        <UserInfo />
      </div>
      {/* Mobil & Tablet için TAM ekran menü */}
      {isLoggedIn
        ? isMenuOpen && (
            <div className="fixed inset-0 bg-[#264061] flex flex-col items-center justify-center space-y-8 text-white text-2xl z-40">
              <NavLink
                to="/diary"
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-400 uppercase font-bold text-2xl tracking-wide'
                    : 'text-white uppercase font-bold text-2xl tracking-wide hover:opacity-90'
                }
                onClick={toggleMenu}
              >
                Diary
              </NavLink>
              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  isActive
                    ? 'text-white uppercase font-bold text-2xl tracking-wide'
                    : 'text-gray-400 uppercase font-bold text-2xl tracking-wide hover:opacity-90'
                }
                onClick={toggleMenu}
              >
                Calculator
              </NavLink>

              {/* Menü kapatma butonu */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-white"
              >
                <HiX className="w-8 h-8" />
              </button>
            </div>
          )
        : isMenuOpen && (
            <div className="fixed inset-0 bg-[#264061] flex flex-col items-center justify-center space-y-8 text-white text-2xl z-40">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-400 uppercase font-bold text-2xl tracking-wide'
                    : 'text-white uppercase font-bold text-2xl tracking-wide hover:opacity-90'
                }
                onClick={toggleMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? 'text-white uppercase font-bold text-2xl tracking-wide'
                    : 'text-gray-400 uppercase font-bold text-2xl tracking-wide hover:opacity-90'
                }
                onClick={toggleMenu}
              >
                Register
              </NavLink>

              {/* Menü kapatma butonu */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-white"
              >
                <HiX className="w-8 h-8" />
              </button>
            </div>
          )}
    </header>
  );
};

export default Header;

////
