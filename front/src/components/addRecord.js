import "bootstrap/dist/css/bootstrap.min.css";
// import React, { Input } from 'react'
import SweetAlert from 'sweetalert2';
import axios from 'axios'

export const addRecord = async ({ Columns }) => {
    let htmlContent = ''
    for (let i = 0; i < Columns.length; i++) {
        if (Columns[i] !== 'id')
            htmlContent += '<label for="' + Columns[i] + '">' + Columns[i] + '</label></br >' + '<Input class="newRowInput" type="text" id="' + i + '" name="' + Columns[i] + '" /></br>'
    }

    await SweetAlert.fire({
        title: "Add record",
        html: htmlContent,
        customClass: "formRecord",
        preConfirm: () => {
            try {
                Columns = Columns.pop()
                let object = {}
                let valueToCollect = document.querySelectorAll('.newRowInput')
                for (let i = 0; i < valueToCollect.length; i++) {
                    object[valueToCollect[i].name] = valueToCollect[i].value
                }
                // axios({
                //     method: "POST",
                //     url: "http://localhost:5000/newLine",
                //     data: {
                //         ...object
                //     }
                // })
            }
            catch (err) {
                return SweetAlert.fire({
                    title: "Oops",
                    text: "unexpected error occurred while reading your data \n Please try one more time",
                    icon: 'error',
                })
            }
        }
    })
}