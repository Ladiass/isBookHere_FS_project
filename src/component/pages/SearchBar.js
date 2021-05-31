import React from 'react';
import {Link} from "react-router-dom";

export const SearchBar = () =>{
    return (
        <>
            <form action="/search/booksname" method="get" className="flex w-2/3vw border-2 border-black outline-none rounded-full">
                <input type="text" name="search" className=" rounded-full focus:outline-none px-4 py-2 h-12 w-9/12 rounded-r-none overflow-ellipsis text-lg " placeholder="Books Name"/>
                <label className="text-xl px-4 py-2 h-12 bg-red-400 rounded-full rounded-l-none w-3/12 flex justify-center items-center cursor-pointer" htmlFor="searchBar">
                    <input type="submit" value="Search" id="searchBar" className="bg-transparent outline-none cursor-pointer px-2" />
                    <label htmlFor="searchBar" className="cursor-pointer"><i class="fas fa-search"></i></label> 
                </label>
            </form>
        </>
    )
}

export const SearchBarHeader = () =>{
    return (
        <>
            <header className="container mx-auto">
                    <div className="logo py-4 flex justify-between items-center">
                        <Link to="/" className="flex text-3xl font-bold text-center items-center">
                            <i className="fab fa-pushed mr-2"></i>
                            IsBookHere?
                        </Link>
                        <form method="get" className="flex w-1/3vw">
                            
                            <input type="text" name="search" id="searchbar" className="rounded-full rounded-r-none py-1 px-4 outline-none focus:border-black border-2 w-3/4"/>
                            
                            <label htmlFor="searchbtn" className="cursor-pointer py-1 px-3 flex justify-center items-center border-2 rounded-full rounded-l-none w-1/4 gap-x-1" >
                                <input type="submit" value="Search" id="searchbtn" className="bg-transparent cursor-pointer outline-none block"/>
                                <i className="fas fa-search"></i>
                            </label>
                        </form>
                    </div>
            </header>
        </>
    )
}