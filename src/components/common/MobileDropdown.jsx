import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MobileDropdown = ({ link }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-normal flex justify-center items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-lg"
      >
        {link.label}
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Items */}
      <ul
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        {link.children.map((child, i) => (
          <li key={i}>
            <NavLink
              to={child.path}
              onClick={() => setOpen(false)}
              className="text-sm font-normal block px-4 py-2 hover:bg-gray-100 rounded-lg"
            >
              {child.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileDropdown;