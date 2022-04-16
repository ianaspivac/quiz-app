import React, { useState, useEffect } from 'react';
import "../ui/UI.css";
import { Link } from "react-router-dom";

function Header(props) {
	const handleLogout = () => {
		localStorage.removeItem("userId")
	};
  return (
		<div className="Header">
			<div className="header-container">
			<div><Link to="/">Quizy</Link></div>
			<nav>
				<ul>
					<li>
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</div>
		</div>
  );
}

export default Header;