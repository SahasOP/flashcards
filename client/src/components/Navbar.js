import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#9290C3] shadow-lg p-4">
      <ul className="flex space-x-4 list-none m-0 p-0">
        <li>
          <Link
            to="/"
            className="text-[#FFE5E5] hover:text-[#535C91]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="text-[#FFE5E5] hover:text-[#535C91]"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
