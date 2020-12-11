import { React, useState, useEffect } from 'react';
import ReactAsyncTable from 'react-async-table';
import axios from 'axios'
import SweetAlert from 'sweetalert2';




const Table = (props) => {
    //hooks for table
    const [SelectedSheet, setSelectedSheet] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastSearch, setlastSearch] = useState('')
    //for data
    const [dataFromSvr, setData] = useState([])
    const [columns, setcolumns] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    //network
    const dataFetch = async () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/fetchColumn",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                sheet: props.sheetToImport,
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
                    if (res.data.length !== 0) {
                        setData(res.data)
                        columnMaker(res.data)
                        setLoading(false)
                    }
                    else {
                        return SweetAlert.fire({
                            title: "Sorry",
                            text: "No data was found",
                            icon: 'error',
                        })
                    }

                }
            })
    }
    const columnMaker = async (data2) => {
        let newColumns = []
        let columns = Object.keys(data2[0])
        console.log(columns)
        props.columnNames(columns)

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
        console.log(SelectedSheet, props.sheetToImport)
        if (SelectedSheet !== props.sheetToImport) {
            setSelectedSheet(props.sheetToImport)
            dataFetch()
            setSelectedSheet(props.sheetToImport)
        }
        if (props.search === '') {
            setFilteredItems(dataFromSvr)
        } else
            if (lastSearch !== props.search) {
                let filtred = dataFromSvr.filter((obj) => {
                    var flag = false;
                    Object.values(obj).forEach((val) => {
                        if (String(val).indexOf(props.search) > -1) {
                            flag = true;
                            return;
                        }
                    });
                    if (flag)
                        return obj;
                });
                setFilteredItems(filtred)
                setlastSearch(props.search)
            }
    })
    return (
        < ReactAsyncTable
            loader={loadingMessage}
            onLoad={dataFetch}
            items={filteredItems}
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
            translations={{
                actionsColumnTitle: 'Akcje',
                editAction: 'Edit',
                deleteAction: 'Delete',
            }}z
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
