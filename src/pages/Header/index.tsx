import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="h-16 bg-gray-50 flex my-0 shadow sticky absolute top-0 z-40">
      <NavLink
        to="/"
        className="flex my-auto  ml-7 text-2xl  border-none p-7 mt-2 bg-green-300 "
      >
        <i className="fas fa-vihara"></i>
        <p className="pl-2 font-semibold">buddyrestrant</p>
      </NavLink>
    </div>
  );
}
