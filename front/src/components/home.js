import { React, useState } from 'react';
import Modal from "react-modal";

import 'bootstrap/dist/css/bootstrap.min.css'; //css
import "../styles/home.css";//css
//modals
import FilterComponent from './filters';
const HomePage = () => {
    const [FilterModalStatus, ChangeFilterModalStatus] = useState(false);


    return (
        <div className="App">
            <div className='navigatorSide bg-dark d-flex flex-column  '>
                <i className="fa fa-home "></i>
                <i className="fa fa-cog"></i>
                <i onClick={() => ChangeFilterModalStatus(true)} className="fa fa-search"></i>
                <i className="fa fa-filter"></i>
                <i className="fa fa-file"></i>
                <i className="fa fa-upload"></i>
            </div>
            <Modal isOpen={FilterModalStatus}>
                <FilterComponent />
                <button onClick={() => ChangeFilterModalStatus(false)}>  OFF  </button>
            </Modal>
        </div>

    )
}

export default HomePage;