import { Link } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="logo">
              Homepage
            </Link>
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

