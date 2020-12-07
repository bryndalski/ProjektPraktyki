import { React, useState } from 'react';
import MTable from 'material-table'
import axios from 'axios'




const Table = () => {
    const [dataFromSvr, setData] = useState([])
    const [columns, setcolumns] = useState([])


    const dataFetch = async () => {
        axios({
            method: "get",
            url: "http://localhost:5000/temporary",
        })
            .then((res) => {
                setData(res.data)
                columnMaker(res.data)
                return res.data
            })
    }

    const columnMaker = async (data2) => {
        let newColumns = []
        console.log(data2)
        let columns = Object.keys(data2[0])
        console.log(columns)
        for (let i = 0; i < columns.length; i++) {
            newColumns.push({
                'title': columns[i],
                'field': columns[i]
            })
        }

        setcolumns(newColumns)
    }


    return (
        <MTable
            data={query =>
                new Promise((resolve, reject) => {
                    axios({
                        method: "get",
                        url: "http://localhost:5000/temporary",
                    })
                        .then((res) => {
                            setData(res.data)
                            columnMaker(res.data)
                            console.log(res.data)
                            resolve({
                                data: res.data,
                                page: res.data.page - 1,
                                totalCount: res.data.length,
                                emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                            })
                        })
                })
            }
            columns={columns}
            options={{
                exportButton: true
            }}
        />
    )
}
export default Table;