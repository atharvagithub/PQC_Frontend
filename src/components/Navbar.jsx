import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">PQC</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/main">App</Link>
        <Link to="/blockchain">Blockchain</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
