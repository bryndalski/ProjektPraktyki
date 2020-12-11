import { React, useState } from 'react';
import Modal from "react-modal";


import 'bootstrap/dist/css/bootstrap.min.css'; //css
import "../styles/home.css";//css
//other 
import Table from './table'
//modals
import FilterComponent from './filters';
import SheetsComponent from './sheets';
import SearchInput from './search';

import { uploadAlert } from './upload';
import { addRecord } from './addRecord'
import { Tab } from 'bootstrap';
//TEST

// addRecord(Columns)

const APP = () => {
    //modals hooks
    const [Columns, setColumns] = useState([])
    const [SearchModalStatus, ChangeSearchModalStatus] = useState('');       //status for search
    const [FilterModalStatus, ChangeFilterModalStatus] = useState(false);       //status for filter

    //closing modals
    //------------------------------DATA HOOKS------------------------------
    const [Sheet, setSheet] = useState('TG')

    Modal.setAppElement('body');

    return (
        <div className="wholePage d-flex flex-column" >
            <nav className="navbar navigatorSide navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse toogleBar" id="navbarTogglerDemo01">
                    <SheetsComponent sheetValue={Sheet} sheet={setSheet} />
                    <SearchInput changeSearch={ChangeSearchModalStatus} />
                    <div className="navbar-nav ml-auto mt-2 mt-lg-0 miniNav">
                        <i title="Filters" onClick={() => ChangeFilterModalStatus(true)} className="fa fa-filter"></i>
                        <i title="Add Record" onClick={() => { addRecord({ Columns }) }} className="fa fa-plus"></i>
                        <i title="Upload Sheet " onClick={() => uploadAlert()} className="fa fa-upload"></i>
                        <i title="Download sheet" onClick={() => uploadAlert()} className="fa fa-download"></i>
                    </div>

                </div>
            </nav>

            <div className="tableContainer flex-grow-1">
                <Table className="table"
                    sheetToImport={Sheet} columnNames={setColumns} search={SearchModalStatus} />
            </div>

        </div >

    )
}

export default APP;