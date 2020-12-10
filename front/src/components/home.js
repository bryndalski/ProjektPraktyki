import { React, useState } from 'react';
import Modal from "react-modal";


import 'bootstrap/dist/css/bootstrap.min.css'; //css
import "../styles/home.css";//css
//other 
import Table from './table'
//modals
import FilterComponent from './filters';
import SearchComponent from './search';
import SheetsComponent from './sheets';
import { uploadAlert } from './upload';
import { addRecord } from './addRecord'
//TEST

// addRecord(Columns)

const APP = () => {
    //modals hooks
    const [Columns, setColumns] = useState([])
    const [SearchModalStatus, ChangeSearchModalStatus] = useState(false);       //status for search
    const [FilterModalStatus, ChangeFilterModalStatus] = useState(false);       //status for filter
    //closing modals
    //------------------------------DATA HOOKS------------------------------
    const [Sheet, setSheet] = useState('TG')

    Modal.setAppElement('body');

    return (
        <div >
            <div className='navigatorSide   bg-dark d-flex flex-row  align-baseline justify-content-between'>
                <SheetsComponent sheetValue={Sheet} sheet={setSheet} />
                <div className="m-2">
                    <i title="Search" onClick={() => ChangeSearchModalStatus(true)} className="fa fa-search"></i>
                    <i title="Filters" onClick={() => ChangeFilterModalStatus(true)} className="fa fa-filter"></i>
                    <i title="Add Record" onClick={() => { addRecord({ Columns }) }} className="fa fa-plus"></i>
                    <i title="Upload Sheet " onClick={() => uploadAlert()} className="fa fa-upload"></i>
                    <i title="Download sheet" onClick={() => uploadAlert()} className="fa fa-download"></i>
                    {/* <i title="Download sheet" onClick={() => sweet_alert()} className="fa fa-download"></i> */}

                </div>
            </div>



            <div className="tableContainer">
                <Table className="table"
                    sheetToImport={Sheet} columnNames={setColumns} />
            </div>






            {/* modals */}

            {/* <SettingsComponent visibleStatus={ExportModalStatus} visibility={ChangeExportModalStatus} /> */}
            {/* 
            <button onClick={() => ChangeSettingsModalStatus(false)}>   </button>
            <Modal isOpen={SearchModalStatus}>
                <SearchComponent />
                <button onClick={() => ChangeSearchModalStatus(false)}>  OFF  </button>
            </Modal>
            <Modal isOpen={FilterModalStatus}>
                <FilterComponent />
                <button onClick={() => ChangeFilterModalStatus(false)}>  OFF  </button>
            </Modal> */}

            {/* <Modal isOpen={ExportModalStatus}>
                <DownloadComponent />
                <button onClick={() => ChangeExportModalStatus(false)}>  OFF  </button>
            </Modal> */}
        </div >

    )
}

export default APP;