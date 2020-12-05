import { React, useState } from 'react';
import Modal from "react-modal";

import 'bootstrap/dist/css/bootstrap.min.css'; //css
import "../styles/home.css";//css
//modals
import SettingsComponent from './settings';
import FilterComponent from './filters';
import SearchComponent from './search';
import SheetsComponent from './sheets';
import DownloadComponent from './download';
import UploadComponent from './upload';
// import FilterComponent from './filters';


const APP = () => {
    const [HomeModalStatus, ChangeHomeModalStatus] = useState(false);           //status for home
    const [SettingsModalStatus, ChangeSettingsModalStatus] = useState(false);   //status for settings
    const [SearchModalStatus, ChangeSearchModalStatus] = useState(false);       //status for search
    const [FilterModalStatus, ChangeFilterModalStatus] = useState(false);       //status for filter
    const [SheetModalStatus, ChangeSheetModalStatus] = useState(false);         //status for sheets
    const [ImportModalStatus, ChangeImportModalStatus] = useState(false);       //status for upload
    const [ExportModalStatus, ChangeExportModalStatus] = useState(false);       //status for download
    //closing modals

    Modal.setAppElement('body');

    return (
        <div className="App">
            <div className='navigatorSide bg-dark d-flex flex-column  '>
                <i title="Home" onClick={() => ChangeHomeModalStatus(true)} className="fa fa-home "></i>
                <i title="Settings" onClick={() => ChangeSettingsModalStatus(true)} className="fa fa-cogs"></i>
                <div className="separator"></div>
                <i title="Search" onClick={() => ChangeSearchModalStatus(true)} className="fa fa-search"></i>
                <i title="Filters" onClick={() => ChangeFilterModalStatus(true)} className="fa fa-filter"></i>
                <div className="separator"></div>
                <i title="Sheets" onClick={() => ChangeSheetModalStatus(true)} className="fa fa-file-excel-o"></i>
                <i title="Upload Sheet " onClick={() => ChangeImportModalStatus(true)} className="fa fa-upload"></i>
                <i title="Download sheet" onClick={() => ChangeExportModalStatus(true)} className="fa fa-download"></i>
                <div className="separator"></div>
                <i title="Save changes" onClick={() => ChangeExportModalStatus(true)} className="fa fa-chevron-circle-down"></i>
                <i title="Chanel" onClick={() => ChangeExportModalStatus(true)} className="fa fa-ban"></i>


            </div>
            {/* <Modal isOpen={ChangeHomeModalStatus}>
                <FilterComponent />
                <button onClick={() => ChangeFilterModalStatus(false)}>  OFF  </button>
            </Modal> */}
            <SheetsComponent />
            <Modal isOpen={SettingsModalStatus}>
                <SettingsComponent />
                <button onClick={() => ChangeSettingsModalStatus(false)}>   </button>
            </Modal>
            <Modal isOpen={SearchModalStatus}>
                <SearchComponent />
                <button onClick={() => ChangeSearchModalStatus(false)}>  OFF  </button>
            </Modal>
            <Modal isOpen={FilterModalStatus}>
                <FilterComponent />
                <button onClick={() => ChangeFilterModalStatus(false)}>  OFF  </button>
            </Modal>
            //sheet component
            <Modal portalClassName='modalClass' isOpen={SheetModalStatus}>
                <SheetsComponent close={ChangeSheetModalStatus} />
            </Modal>
            <Modal isOpen={ImportModalStatus}>
                < UploadComponent />
                <button onClick={() => ChangeImportModalStatus(false)}>  OFF  </button>
            </Modal>
            <Modal isOpen={ExportModalStatus}>
                <DownloadComponent />
                <button onClick={() => ChangeExportModalStatus(false)}>  OFF  </button>
            </Modal>
        </div>

    )
}

export default APP;