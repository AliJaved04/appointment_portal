import React from "react";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    };

    return (
        <nav className="navbar">
            <div className="logo" style={{ marginLeft: "30px" }}>CCript</div>
            <button className="logout-button" onClick={handleLogout}>
                <BsBoxArrowRight size={20} />
            </button>
        </nav>
    );
};

export default Navbar;
