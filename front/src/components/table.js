import { React, useState, useEffect } from 'react';
import ReactAsyncTable from 'react-async-table';
import axios from 'axios'




const Table = ({ sheetToImport }) => {
    //hooks for table
    const [SelectedSheet, setSelectedSheet] = useState(sheetToImport)
    const [loading, setLoading] = useState(true)
    console.log(sheetToImport)
    //for data
    const [dataFromSvr, setData] = useState([])
    const [columns, setcolumns] = useState([])

    //network
    const dataFetch = async () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/fetchColumn",
            data: {
                sheet: sheetToImport,
            }
        })
            .then((res) => {
                setData(res.data)
                columnMaker(res.data)
                setLoading(false)
            })
    }
    const columnMaker = async (data2) => {
        let newColumns = []
        console.log(data2)
        let columns = Object.keys(data2[0])
        console.log(columns)
        for (let i = 0; i < columns.length; i++) {
            newColumns.push({
                'dataField': columns[i],
                'text': columns[i]
            })
        }

        setcolumns(newColumns)
    }

    // other
    useEffect(() => {
        if (SelectedSheet !== sheetToImport) {
            setSelectedSheet(sheetToImport)
            dataFetch()
        }
    })

    useEffect(() => {
        dataFetch()
        return () => { };
    }, []);



    return (
        < ReactAsyncTable
            onLoad={dataFetch}
            items={dataFromSvr}
            isLoading={loading}
            // keyField="id"
            // activeTabID=""
            columns={columns}
            currentPage={0}
            itemsPerPage={0}
            tableHeaderClass='tableHeader'
            tableClass='tableBody'
            totalItems={dataFromSvr.length}
            options={{
                searchBox: false,
                insertButton: false,
                // multipleSelect: true,
                expandable: false,
                actionsColumn: true,
                pagination: false
            }}
            translations={{
                actionsColumnTitle: 'Actions',
                editAction: 'Edit',
                deleteAction: 'Delete',

            }}
        />
    )
}
export default Table;
