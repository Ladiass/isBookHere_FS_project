import React,{useState} from 'react';

function PageNotFound() {
    const [timer,setTimer]=useState(7);
    setInterval(() => {
        // eslint-disable-next-line 
        (timer <= 0) ? location.href ="/" : setTimer(timer-1);
    }, 1000);
    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="font-bold text-9xl">
                    404!
                </div>
                <p>I'm sorry , page is gone. {timer}s after will send u back to <a href="/" className="text-blue-500 underline">Home Page .</a></p>
            </div>
        </>
    )
}

export default PageNotFound
