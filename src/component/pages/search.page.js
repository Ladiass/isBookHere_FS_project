import React from 'react';
import {Link} from "react-router-dom";
import {SearchBar as Bar} from "./SearchBar";

function Search() {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div >
                    <div className="logo py-6 flex justify-center items-center">
                        <Link to="/" className="flex text-6xl font-bold text-center ">
                            <i className="fab fa-pushed mr-2"></i>
                            IsBookHere?
                        </Link>
                    </div>

                    <Bar></Bar>

                </div>
            </div>
        </>
    )
}

export default Search
