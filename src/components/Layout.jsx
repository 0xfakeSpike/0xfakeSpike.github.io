import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="logo">
              Spike
            </Link>
            <div className="nav-links">
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
              >
                首页
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Spike. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

