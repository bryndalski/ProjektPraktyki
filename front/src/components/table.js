import { React, useState, useEffect } from 'react';
import ReactAsyncTable from 'react-async-table';
import axios from 'axios'
import SweetAlert from 'sweetalert2';




const Table = ({ sheetToImport, columnNames }) => {
    //hooks for table
    const [SelectedSheet, setSelectedSheet] = useState(null)
    const [loading, setLoading] = useState(true)
    //for data
    const [dataFromSvr, setData] = useState([])
    const [columns, setcolumns] = useState([])

    //network
    const dataFetch = async () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/fetchColumn",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                sheet: sheetToImport,
            }
        }).catch((err) => {
            return SweetAlert.fire({
                title: "Ooops",
                text: "unexpected error occurred while loading your table \n please check your network connection ",
                icon: 'error',

            })
        })
            .then((res) => {
                if (res.data !== undefined) {
                    setData(res.data)
                    columnMaker(res.data)
                    setLoading(false)

                }
            })
    }
    const columnMaker = async (data2) => {
        let newColumns = []
        let columns = Object.keys(data2[0])
        console.log(columns)
        columnNames(columns)

        for (let i = 0; i < columns.length; i++) {
            newColumns.push({
                'dataField': columns[i],
                'text': columns[i]
            })
        }
        setcolumns(newColumns)
    }
    const loadingMessage = () => {
        return (
            <div className="spinner-border " role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    // other
    useEffect(() => {
        if (SelectedSheet !== sheetToImport) {
            setSelectedSheet(sheetToImport)
            dataFetch()
            setSelectedSheet(sheetToImport)
        }
    })
    return (
        < ReactAsyncTable
            loader={loadingMessage}
            onLoad={dataFetch}
            items={dataFromSvr}
            isLoading={loading}
            keyField="id"
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
                // actionsColumn: true,
                pagination: false
            }}
            // translations={{
            //     actionsColumnTitle: 'Actions',
            //     editAction: 'Edit',
            //     deleteAction: 'Delete',
            // }}
            onColumnClick={(e) => {
                console.log(e)
            }}
            onEdit={(e) => {
                console.log(e)
            }}

        />
    )
}
export default Table;
