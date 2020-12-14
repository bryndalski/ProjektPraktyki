import SweetAlert from 'sweetalert2'
import axios from 'axios'

//TODO add axios 
const editAlert = async (row, data, setData, editTrigger, seteditTrigger, sheet) => {
    console.log(row)
    const Toast = SweetAlert.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 500,
    })
    let Columns = Object.keys(row)
    let htmlContent = ''
    for (let i = 0; i < Columns.length; i++) {
        if (Columns[i] !== 'id')
            htmlContent += `<div class="form-group m-3 d-flex  flex-row">  <label class="d-inline-block mr-auto w-50  col-form-label"  for=${Columns[i]}>${Columns[i]}</label><Input class="newRowInput w-50 ml-autow form-control" type="text" id="${i}" value="${row[Columns[i]]}" name="${Columns[i]}" /></div>`
    }
    SweetAlert.fire({
        showCancelButton: true,
        title: `Edit Record ${row.id}`,
        html: htmlContent,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Columns = Columns.pop()
            let object = {}
            let valueToCollect = document.querySelectorAll('.newRowInput')
            for (let i = 0; i < valueToCollect.length; i++) {
                object[valueToCollect[i].name] = valueToCollect[i].value
            }
            console.log(object);
            //end of data collecting 
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/editRow",
                Headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                data: {
                    ...object,
                    sheet: sheet,
                }
            }).catch((err) => {
                SweetAlert.fire({
                    title: "Error",
                    text: "unexpected error occurred while editing your data \n Please try one more time",
                    icon: 'error',
                })
            }).then((res) => {
                try {
                    if (res.data.success) {
                        data[(row.id - 1)] = {
                            ...object,
                            id: row.id
                        };
                        try {
                            new Promise(async () => {
                                await Toast.fire({
                                    icon: 'success',
                                    title: 'Record has been edited      '
                                })
                                await setData(data)
                                await seteditTrigger((editTrigger + 1))
                            })
                        } catch (err) {
                            SweetAlert.fire(
                                'Sorry!',
                                'Your record has not been edited.',
                                'error'
                            )
                        }
                    } else
                        SweetAlert.fire(
                            'Sorry!',
                            'Your record has not been edited.',
                            'error'
                        )
                } catch (err) {
                    SweetAlert.fire(
                        'Sorry!',
                        'Your recordcould not be edited. \n Please check your network connection and try agin ',
                        'error'
                    )
                }

            })
            //only after svr response

        }
    })
}
export default editAlert