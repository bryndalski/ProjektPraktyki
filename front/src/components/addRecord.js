import "bootstrap/dist/css/bootstrap.min.css";
// import React, { Input } from 'react'
import SweetAlert from 'sweetalert2';
import axios from 'axios'

export const addRecord = async ({ Columns }) => {
    let htmlContent = ''
    for (let i = 0; i < Columns.length; i++) {
        if (Columns[i] !== 'id')
            htmlContent += '   <div class="form-group m-3 d-flex  flex-row">  <label class="col-sm-2 col-form-label text-wrap" for="' + Columns[i] + '">' + Columns[i] + '</label>' + '<Input class="newRowInput form-control" type="text" id="' + i + '" name="' + Columns[i] + '" /></div>'
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
                axios({
                    method: "POST",
                    url: "http://localhost:5000/newLine",
                    data: {
                        ...object
                    }
                }).catch((err) => {
                    return SweetAlert.fire({
                        title: "Oops",
                        text: "unexpected error occurred while reading your data \n Please try one more time",
                        icon: 'error',
                    })
                }).then((res) => {
                    if (res.data != undefined) {
                        SweetAlert.fire({
                            title: "Success",
                            text: "Successfully added X record ",
                            icon: 'success',
                        })
                    }
                })
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