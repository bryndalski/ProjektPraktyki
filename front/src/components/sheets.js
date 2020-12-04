import { React, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.min.css";


function SheetsComponent(props) {
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
        <div className="container-md">
            <h1>Select </h1>
            <Select
                onMenuOpen={sheetsGetter}
                isSearchable={true}
                options={sheets}
                name="sheetName"
                defaultOptions={true}
            />
            <button className="btn-success">Submit</button>
            {/* <h1>{sheets}</h1> */}

        </div>

    )
}

export default SheetsComponent;
