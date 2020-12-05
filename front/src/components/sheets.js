import { React, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.min.css";


function SheetsComponent({ show, close }) {
    const [sheets, setSheets] = useState([])
    const sheetsGetter = async () => {
        axios({
            method: "get",
            url: "http://localhost:5000/sheets",
        })
            .then((res) => {
                setSheets(res.data)
                console.log(sheets)
            })
    }


    // sheetsGetter()
    return (
        <div className="container-md d-flex justify-content-center flex-column ">
            <h1 className="text-center">Select Working Sheet </h1>
            <Select
                onMenuOpen={sheetsGetter}
                isSearchable={true}
                options={sheets}
                name="sheetName"
                defaultOptions={true}
                className="m-3"
            />
            <div className="d-flex flex-end justify-content-end">
                <button className="btn-success m-1 btn-lg btn ">Submit</button>
                <button className="btn-danger m-1 btn-lg btn mr-3 " onClick={() => { close(false) }}>  OFF  </button>
            </div>


        </div>
    )
}

export default SheetsComponent;
