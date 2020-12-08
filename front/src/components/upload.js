import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
function UploadComponent({ close }) {

    return (
        <div className="container-md d-flex justify-content-center flex-column ">
            <h1>Upload file</h1>
            <span>Your file needs to be saved as XLSX</span>
            <input type="file" className="form-control" />
            <button className="btn-success m-1 btn-lg btn " onClick={() => {
                close(false)
            }}>UPLOAD</button>
            <button className="btn-danger m-1 btn-lg btn mr-3 " onClick={() => { close(false) }}>  CANCEL   </button>

        </div>
    )
}

export default UploadComponent;
