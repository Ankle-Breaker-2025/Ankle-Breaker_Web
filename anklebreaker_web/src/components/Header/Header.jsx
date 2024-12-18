import './styles/Header.css';

function Header() {
  const isHomePage = location.pathname === '/';

  return (
    <div className={`header ${isHomePage ? 'home-header' : 'default-header'}`}>

    </div>
  )
}

export default Header;