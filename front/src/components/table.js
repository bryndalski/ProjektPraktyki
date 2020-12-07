import { React, useState } from 'react';
import MTable from 'material-table'
import axios from 'axios'
import { red } from '@material-ui/core/colors';




const Table = () => {
    const [data, setData] = useState([])
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
                new Promise((resolve) => {
                    dataFetch()
                    resolve({
                        data: data,
                        page: data.length - 1,
                        totalCount: data.length,
                    })
                })
            }
            // data={data}
            columns={columns}
        ></MTable>
    )
}
export default Table;