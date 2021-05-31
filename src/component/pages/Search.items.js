import React from 'react';
import {SearchBarHeader} from "./SearchBar";
import {ItemsShow1 as Items} from "./itemsShow";
import imgBook from "../../image/book.jpg"


function SearchItems(porps) {
    // eslint-disable-next-line
    let searchName = porps.match.params.Books;
    
    return (
        <>
            <SearchBarHeader></SearchBarHeader>
            <main className="">
                <section className="container mx-auto my-4">
                    <Items 
                        Links="products1" 
                        imgUrl={imgBook} 
                        productsName="test"
                        details="asdfasdfadsfasdhfksajhdfkasjhfksadjhfsakdjfhsakljfhasldfjahsdflkasdf"
                        place="KL"
                        author="John Doe"
                        buyerCount="50"
                        commentCount="5"
                    >
                    </Items>
                    
                </section>
            </main>
        </>
    )
}

export default SearchItems
