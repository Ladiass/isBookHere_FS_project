import React ,{useState , useEffect}from 'react'

function Alert() {
    const [isAlert , SetAlert] = useState(false)
    
    // let status = ["success","warning","alert","Danger"];
    let alert = sessionStorage.getItem("status")  ;
    let alertContent = sessionStorage.getItem("alertContent");
    
    let mainStyle = "absolute left-1/2 top-0 transform -translate-x-1/2 mt-5 text-center container border-2 py-3 rounded-md  cursor-pointer"
    let successStyle = "bg-green-400 border-green-600  hover:bg-green-500 hover:border-green-700";

    function addStyle (main , add) {
        return main + " " + add
    }

    useEffect(()=>{
        // if(alert !== null && alertContent !== null){
        //     SetAlert(true)
        // }else{
        //     SetAlert(false)
        // }
        if(sessionStorage.getItem("status") != null && sessionStorage.getItem("alertContent")){
            SetAlert(true)
        }else{
            SetAlert(false)
        }
    },[])

    setTimeout(() => {
        removeAlert();
    }, 6000);

    function removeAlert(){
        try{
            SetAlert(false);
            sessionStorage.removeItem("status")
            sessionStorage.removeItem("alertContent")
        }catch(err){}
    }
    return (
        <>
        {isAlert ? 
        <div className={addStyle(mainStyle,successStyle)} onClick={removeAlert}>
            <p className="text-lg text-bold">{alert} : {alertContent}</p>
        </div> :
        ""
        }
        </>
    )
}

export default Alert
