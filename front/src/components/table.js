import { React, useState, useEffect } from 'react';
import ReactAsyncTable from 'react-async-table';
import axios from 'axios'




const Table = () => {
    //hooks for table
    const [loading, setLoading] = useState(true)

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
            isLoading={loading}
            keyField="id"
            columns={columns}
            currentPage={0}
            itemsPerPage={0}
            tableHeaderClass='tableHeader'
            tableClass='tableBody'
            totalItems={dataFromSvr.length}

            options={{
                // searchBox: true,
                // multipleSelect: true,
                // actionsColumn: true,
                // pagination: true
            }}
            translations={{
                searchPlaceholder: 'Search...',
                addButton: 'Add',
                deleteButton: 'Delete',
                listViewTitle: "List View",
                gridViewTitle: "Grid View",
                sortTitle: 'Sort',
                actionsColumnTitle: 'Actions',
                editAction: 'Edit',
                deleteAction: 'Delete',
                noDataText: 'No data found',
                requestFailedText: 'API request failed',
                paginationFirst: 'First',
                paginationLast: 'Last'
            }}
        />
    )
}
export default Table;