import { React, useState, useEffect, useContext } from 'react';
import ReactAsyncTable from 'react-async-table';
import axios from 'axios'
import SweetAlert from 'sweetalert2';
import editAlert from './editRecord'
import deleteRecord from './deleteRecord'
import { UserContext } from './auth/userContext'



const Table = (props) => {
    //hooks for table
    const { user, Setuser } = useContext(UserContext) //contexr

    const [loading, setLoading] = useState(true)
    //for data
    const [dataFromSvr, setData] = useState([])
    const [columns, setcolumns] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [editTrigger, seteditTrigger] = useState(0)
    //network
    const dataFetch = async () => {
        setLoading(true)
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
                        console.log(res.data)
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
    const filtring = () => {
        if (props.search === '') {
            setFilteredItems(dataFromSvr)
        } else {
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
        }
    }
    // other
    useEffect(() => {
        console.log("import")
        dataFetch()
        filtring()
        console.log(dataFromSvr)
    }, [props.sheetToImport])

    useEffect(() => {
        console.log("edycja");
        filtring()
    }, [editTrigger])

    useEffect(() => {
        console.log("filtorwannie");
        console.log(filteredItems)
        filtring()
    }, [dataFromSvr])

    useEffect(() => {
        console.log("odświeżanie ");
        filtring()
    }, [props.search])
    return (
        < ReactAsyncTable
            loader={loadingMessage}
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
                expandable: false,
                actionsColumn: (user.permissions !== 'guest') ? true : false,
                pagination: false
            }
            }
            translations={{
                editAction: 'Edit',
                deleteAction: 'Delete',
            }} z
            onColumnClick={(e) => {
                console.log(e)
            }}

            onEdit={(e) => {
                console.log(e)
                console.log(dataFromSvr[e])
                editAlert(dataFromSvr[(e - 1)], dataFromSvr, setData, editTrigger, seteditTrigger, props.sheetToImport)
            }
            }

            onDelete={(e) => {
                deleteRecord((e - 1), dataFromSvr, setData, editTrigger, seteditTrigger, props.sheetToImport)
            }}
        />
    )
}
export default Table;
