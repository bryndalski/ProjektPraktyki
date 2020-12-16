import { React, useState, useContext } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css'; //css
import "../styles/home.css";//css
//other 
import Table from './table'
import SheetsComponent from './sheets';
import SearchInput from './search';
import { uploadAlert } from './upload';
import { addRecord } from './addRecord'
import { UserContext } from './auth/userContext'
// addRecord(Columns)

const HomeComponent = () => {
    //modals hooks
    const [Columns, setColumns] = useState([])
    const [SearchModalStatus, ChangeSearchModalStatus] = useState('');       //status for search
    const { user, Setuser } = useContext(UserContext) //contexr
    const [Sheet, setSheet] = useState('TG')
    const userPermission = () => {
        if (user.permissions === 'moderator' || user.permissions === 'admin') {
            return (
                <div className="navbar-nav ml-auto mt-2 mt-lg-0 miniNav">
                    <i title="Add Record" onClick={() => { addRecord(Columns, Sheet) }} className="fa fa-plus"></i>
                    <i title="Upload Sheet " onClick={() => uploadAlert()} className="fa fa-upload"></i>
                    <i title="Download sheet" onClick={() => uploadAlert()} className="fa fa-download"></i>
                </div>)
        }
    }

    return (
        <UserContext.Provider value={{ user, Setuser }} >
            <div className="wholePage d-flex flex-column" >
                <nav className="navbar navigatorSide navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse toogleBar" id="navbarTogglerDemo01">
                        <SheetsComponent sheetValue={Sheet} sheet={setSheet} />
                        <SearchInput changeSearch={ChangeSearchModalStatus} />
                        {userPermission()}
                    </div>
                </nav>
                <div className="tableContainer flex-grow-1">
                    <Table className="table"
                        sheetToImport={Sheet} columnNames={setColumns} search={SearchModalStatus} />
                </div>

            </div >
        </UserContext.Provider>

    )
}

export default HomeComponent;