export default function Spinner(){
    return(
        <div style={{justifyContent: "center", textAlign: "center"}}>
            <div className="spinner-border text-success" role="status" style={{width: 70, height: 70}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}