import { React, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import "bootstrap/dist/css/bootstrap.min.css";


function SheetsComponent({ sheet, close, sheetValue }) {
    const [SheetInSelect, setSheetInSelect] = useState('')
    const [sheets, setSheets] = useState([])
    const sheetsGetter = async () => {
        axios({
            method: "get",
            url: "http://localhost:5000/sheets",
        })
            .then((res) => {
                setSheets(res.data)
            })
    }
    return (
        <div className="container-md d-flex justify-content-center flex-column ">
            <h1 className="text-center">Select Working Sheet </h1>
            <Select
                defaultInputValue={sheetValue}
                // value={sheetValue}
                onMenuOpen={sheetsGetter}
                isSearchable={true}
                options={sheets}
                name="sheetName"
                defaultOptions={true}
                className="m-3"
                onChange={e => { setSheetInSelect(e.value) }}
            />
            <div className="d-flex flex-end justify-content-end">
                <button className="btn-success m-1 btn-lg btn " onClick={() => {
                    close(false)
                    sheet(SheetInSelect)
                }}>Submit</button>
                <button className="btn-danger m-1 btn-lg btn mr-3 " onClick={() => { close(false) }}>  CANCEL   </button>
            </div>


        </div>
    )
}

export default SheetsComponent;
