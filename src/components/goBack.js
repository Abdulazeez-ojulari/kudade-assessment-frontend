
 export default function GoBack(){

    function goback(){
        window.history.back()
    }

    return(
            <ul className="goback_header_pages">
                <div onClick={goback}>{"<"}</div>
                <li onClick={goback}>
                    back
                </li>
            </ul>
    )
}