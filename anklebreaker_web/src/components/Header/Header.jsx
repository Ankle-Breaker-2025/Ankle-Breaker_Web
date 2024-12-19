import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(location.pathname === '/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location.pathname]);

  return (
    <div className={`header ${isHomePage ? '' : 'default-header'}`}>
      <div className="logo">
        <img src="/AnkleBreaker.svg" alt="anklebreaker logo"/>
        <NavLink to="/" end className="ankleBreaker">ANKLE BREAKER</NavLink>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>☰</button>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>About</NavLink>
        <NavLink to="/team" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Team</NavLink>
        <NavLink to="/training" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Training</NavLink>
        <NavLink to="/store" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Store</NavLink>
      </nav>
    </div>
  )
}

export default Header;