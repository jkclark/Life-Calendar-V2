import type { Calendar } from "@life-calendar/common";
import React from "react";

interface NavbarProps {
  currentCalendar: Calendar | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentCalendar }) => {
  return (
    <div className="navbar bg-base-100 pb-0 select-none">
      <div className="navbar-start">
        <div className="px-4 py-3 text-xl font-semibold">
          {currentCalendar ? currentCalendar.name : "Life Calendar"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
