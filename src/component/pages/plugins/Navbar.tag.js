import React from 'react';
import {Link}from "react-router-dom";
import {SearchBarHeader} from "../SearchBar";

function Navbar() {
    let liClasses = "text-white hover:bg-gray-600 py-3 px-6 shadow-inner transition-colors duration-75 ";
    return (
        <>
        <SearchBarHeader />
        <div className="bg-gray-800 ">
            <div className="container mx-auto">
                <ul className="flex flex-wrap gap-x-1">
                    <Link to="/tags/all" className={liClasses}>All</Link>
                    <Link to="/tags/all" className={liClasses}>Love</Link>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Navbar
