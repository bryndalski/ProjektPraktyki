import { React, useState, useEffect } from 'react';
import MTable from 'material-table'
import ReactAsyncTable from 'react-async-table';
import axios from 'axios'




const Table = () => {
    const [dataFromSvr, setData] = useState([])
    const [columns, setcolumns] = useState([])
    // Podobnie do metod componentDidMount i componentDidUpdate:

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
                // 'title': columns[i],
                // 'field': columns[i]
                'dataField': columns[i],
                'text': columns[i]
            })
        }

        setcolumns(newColumns)
    }
    useEffect(() => {
        dataFetch()
        return () => {
            console.log("cleaned up");
        };
    }, []);

    return (
     
        < ReactAsyncTable
            onLoad={dataFetch}
            items={dataFromSvr}
            keyField="id"
            columns={columns}
            query={''}
            currentPage={1}
            itemsPerPage={10}
            totalItems={dataFromSvr.length}
        />
    )
}
export default Table;