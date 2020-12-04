import { React, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";


function SheetsComponent(props) {
    const [sheets, setsheets] = useState(null)
    const sheetsGetter = () => {
        axios({
            method: "get",
            url: "http://localhost:5000/sheets",
        })
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <div>
            <h1>SheetsComponent</h1>
            <button onClick={sheetsGetter}>pobierz arkusze</button>
        </div>

    )
}

export default SheetsComponent;
