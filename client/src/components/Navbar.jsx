import React from "react";
import ThemeController from "./ThemeController";

const Navbar = () => {
	return (
		<div className="navbar bg-base-100 border-b-1 shadow-black  fixed top-0">
			<div className="flex-1">
				<a className="btn btn-ghost text-2xl font-bold heading">DEVPE</a>
			</div>
			<div className=" pr-3">
				<ThemeController />
			</div>
		</div>
	);
};

export default Navbar;
